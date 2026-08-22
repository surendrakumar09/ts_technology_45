from django.apps import AppConfig
import sys
import threading
import time

class ContactConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.contact'

    def ready(self):
        # Auto-sync live website enquiries to local db.sqlite3 in background when running local server
        if 'runserver' in sys.argv:
            def auto_sync_worker():
                time.sleep(3) # Wait for server boot
                from django.core.management import call_command
                while True:
                    try:
                        call_command('sync_production_data')
                    except Exception:
                        pass
                    time.sleep(45) # Auto-sync every 45 seconds

            thread = threading.Thread(target=auto_sync_worker, daemon=True)
            thread.start()
