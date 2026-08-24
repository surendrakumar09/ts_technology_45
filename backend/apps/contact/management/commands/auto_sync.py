import time
from django.core.management.base import BaseCommand
from django.core.management import call_command

class Command(BaseCommand):
    help = 'Automatically syncs live website enquiries into local db.sqlite3 in the background on a continuous loop'

    def add_arguments(self, parser):
        parser.add_argument('--interval', type=int, default=60, help='Interval in seconds between syncs (default: 60s)')

    def handle(self, *args, **options):
        interval = options['interval']
        self.stdout.write(self.style.SUCCESS(f"Started Auto Sync Daemon (Syncing every {interval}s into local db.sqlite3)..."))
        self.stdout.write(self.style.NOTICE("Press Ctrl+C to stop.\n"))

        try:
            while True:
                self.stdout.write(f"[{time.strftime('%H:%M:%S')}] Auto Sync checking production server...")
                try:
                    call_command('sync_production_data')
                except Exception as e:
                    self.stderr.write(f"Auto Sync warning: {e}")
                time.sleep(interval)
        except KeyboardInterrupt:
            self.stdout.write(self.style.NOTICE("\nAuto Sync Daemon stopped."))
