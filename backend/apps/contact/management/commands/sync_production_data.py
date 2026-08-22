import urllib.request
import json
import http.cookiejar
import ssl
from django.core.management.base import BaseCommand
from apps.contact.models import ContactMessage

class Command(BaseCommand):
    help = 'Fetches live website enquiries from production server and syncs them into local db.sqlite3'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.NOTICE("Connecting to production API (https://ts-technology-45.onrender.com)..."))

        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE

        cj = http.cookiejar.CookieJar()
        opener = urllib.request.build_opener(
            urllib.request.HTTPCookieProcessor(cj),
            urllib.request.HTTPSHandler(context=ctx)
        )

        login_url = "https://ts-technology-45.onrender.com/api/admin/login/"
        login_payload = json.dumps({"username": "tsadmin", "password": "TSAdminPass@2026"}).encode('utf-8')
        req_login = urllib.request.Request(login_url, data=login_payload, headers={'Content-Type': 'application/json'}, method='POST')

        try:
            with opener.open(req_login) as resp:
                self.stdout.write(self.style.SUCCESS("Authenticated with production server."))

            messages_url = "https://ts-technology-45.onrender.com/api/admin/messages/"
            req_msg = urllib.request.Request(messages_url, headers={'Content-Type': 'application/json'}, method='GET')
            
            with opener.open(req_msg) as resp:
                msg_res = json.loads(resp.read().decode('utf-8'))
                results = msg_res.get('results', msg_res) if isinstance(msg_res, dict) else msg_res
                
                synced_count = 0
                for item in results:
                    obj, created = ContactMessage.objects.update_or_create(
                        email=item.get('email'),
                        name=item.get('name'),
                        defaults={
                            'phone': item.get('phone', ''),
                            'company': item.get('company', ''),
                            'subject': item.get('subject', ''),
                            'message': item.get('message', ''),
                            'status': item.get('status', 'New'),
                        }
                    )
                    synced_count += 1
                    status_str = "Created" if created else "Updated"
                    self.stdout.write(f" - {status_str}: #{obj.id} {obj.name} ({obj.email})")

                self.stdout.write(self.style.SUCCESS(f"\n[SUCCESS] Synchronized {synced_count} live enquiries into local db.sqlite3!"))
        except Exception as e:
            self.stderr.write(self.style.ERROR(f"[ERROR] Sync failed: {str(e)}"))
