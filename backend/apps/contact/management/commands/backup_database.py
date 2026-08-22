import os
import sys
from datetime import datetime
from django.core.management import call_command
from django.core.management.base import BaseCommand
from django.conf import settings

class Command(BaseCommand):
    help = 'Safely creates a timestamped JSON backup of all production Django database models'

    def handle(self, *args, **kwargs):
        backup_dir = settings.BASE_DIR / 'backups'
        os.makedirs(backup_dir, exist_ok=True)

        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        backup_filename = f"db_backup_{timestamp}.json"
        backup_path = backup_dir / backup_filename

        self.stdout.write(self.style.NOTICE(f"Initiating database backup to: {backup_path}"))

        try:
            with open(backup_path, 'w', encoding='utf-8') as f:
                call_command(
                    'dumpdata',
                    '--natural-foreign',
                    '--natural-primary',
                    '--exclude=contenttypes',
                    '--exclude=auth.Permission',
                    '--indent=2',
                    stdout=f
                )
            self.stdout.write(self.style.SUCCESS(f"[SUCCESS] Production database backed up safely to: {backup_path}"))
        except Exception as err:
            self.stderr.write(self.style.ERROR(f"[ERROR] Failed to export database backup: {str(err)}"))
