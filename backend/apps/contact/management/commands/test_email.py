import socket
from django.core.management.base import BaseCommand
from django.conf import settings
from django.core.mail import send_mail, get_connection


class Command(BaseCommand):
    help = "Safely test and diagnose Django Email and SMTP configuration without exposing passwords."

    def add_arguments(self, parser):
        parser.add_argument(
            '--send',
            action='store_true',
            help='Attempt to send a real test email using the configured backend.',
        )
        parser.add_argument(
            '--to',
            type=str,
            default=None,
            help='Recipient email address (defaults to CONTACT_NOTIFICATION_EMAIL or DEFAULT_FROM_EMAIL).',
        )

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS("=" * 60))
        self.stdout.write(self.style.SUCCESS(" TS TECHNOLOGY — EMAIL & SMTP CONFIGURATION DIAGNOSTICS"))
        self.stdout.write(self.style.SUCCESS("=" * 60))

        # 1. Inspect Settings
        email_backend = getattr(settings, 'EMAIL_BACKEND', 'Not set')
        email_host = getattr(settings, 'EMAIL_HOST', 'Not set')
        email_port = getattr(settings, 'EMAIL_PORT', 'Not set')
        email_use_tls = getattr(settings, 'EMAIL_USE_TLS', False)
        email_use_ssl = getattr(settings, 'EMAIL_USE_SSL', False)
        email_host_user = getattr(settings, 'EMAIL_HOST_USER', 'Not set')
        email_host_password = getattr(settings, 'EMAIL_HOST_PASSWORD', '')
        default_from = getattr(settings, 'DEFAULT_FROM_EMAIL', 'Not set')
        server_email = getattr(settings, 'SERVER_EMAIL', 'Not set')
        notification_email = getattr(settings, 'CONTACT_NOTIFICATION_EMAIL', default_from)

        self.stdout.write(f"EMAIL_BACKEND:              {email_backend}")
        self.stdout.write(f"EMAIL_HOST:                 {email_host}")
        self.stdout.write(f"EMAIL_PORT:                 {email_port}")
        self.stdout.write(f"EMAIL_USE_TLS:              {email_use_tls}")
        self.stdout.write(f"EMAIL_USE_SSL:              {email_use_ssl}")
        self.stdout.write(f"EMAIL_HOST_USER:            {email_host_user}")
        
        # Mask password safely
        if email_host_password:
            self.stdout.write(f"EMAIL_HOST_PASSWORD:        [CONFIGURED: {len(email_host_password)} characters, hidden]")
        else:
            self.stdout.write(f"EMAIL_HOST_PASSWORD:        [NOT SET - empty string]")

        self.stdout.write(f"DEFAULT_FROM_EMAIL:         {default_from}")
        self.stdout.write(f"SERVER_EMAIL:               {server_email}")
        self.stdout.write(f"CONTACT_NOTIFICATION_EMAIL: {notification_email}")
        self.stdout.write("-" * 60)

        # 2. Test Socket Connectivity to SMTP server
        if email_host and email_port and 'console' not in str(email_backend).lower():
            self.stdout.write(f"Testing TCP connection to {email_host}:{email_port}...")
            try:
                sock = socket.create_connection((email_host, int(email_port)), timeout=5)
                sock.close()
                self.stdout.write(self.style.SUCCESS(f"  [OK] Successfully connected to {email_host}:{email_port}"))
            except Exception as net_err:
                self.stdout.write(self.style.ERROR(f"  [FAIL] Network connection failed: {net_err}"))
        else:
            self.stdout.write(f"Using {email_backend}. Remote socket connection check skipped.")

        # 3. Test Email Send if requested
        if options.get('send'):
            recipient = options.get('to') or notification_email
            self.stdout.write("-" * 60)
            self.stdout.write(f"Attempting to dispatch test email to: {recipient}...")

            is_smtp = 'smtp' in str(email_backend).lower()
            if is_smtp and not email_host_password:
                self.stdout.write(self.style.WARNING(
                    "\n[WARNING] EMAIL_HOST_PASSWORD is not set in your environment variables.\n"
                    "Gmail SMTP requires a 16-character Google App Password.\n"
                    "Set EMAIL_HOST_PASSWORD=your_app_password in backend/.env or your hosting dashboard.\n"
                ))
                return

            try:
                subject = "[TS Technology] SMTP Production Diagnostic Test"
                message = (
                    "This is an automated test email from TS Technology.\n\n"
                    "If you received this message, your Gmail SMTP production configuration is active, "
                    "authenticated, and delivering emails properly!\n\n"
                    f"Sender: {default_from}\n"
                    f"Recipient: {recipient}\n"
                    f"Backend: {email_backend}\n"
                )
                sent = send_mail(
                    subject=subject,
                    message=message,
                    from_email=default_from,
                    recipient_list=[recipient],
                    fail_silently=False,
                )
                if sent:
                    self.stdout.write(self.style.SUCCESS(f"\n[SUCCESS] Test email dispatched successfully to {recipient}!"))
                else:
                    self.stdout.write(self.style.WARNING("\n[NOTICE] Email send call completed (0 sent)."))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"\n[ERROR] Failed to send test email: {str(e)}"))
                if "Username and Password not accepted" in str(e) or "535" in str(e):
                    self.stdout.write(self.style.WARNING(
                        "\nTip for Gmail SMTP authentication:\n"
                        "1. Turn ON 2-Step Verification on your Google Account (tssoftwaretechnology@gmail.com)\n"
                        "2. Generate an App Password: https://myaccount.google.com/apppasswords\n"
                        "3. Use the 16-letter App Password as EMAIL_HOST_PASSWORD (do not use regular password).\n"
                    ))
        else:
            self.stdout.write("-" * 60)
            self.stdout.write("To test sending an actual email message, run:\n  python backend/manage.py test_email --send")
            self.stdout.write(self.style.SUCCESS("=" * 60))
