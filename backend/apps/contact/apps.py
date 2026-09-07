from django.apps import AppConfig
import sys
import threading
import time

class ContactConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.contact'

    def ready(self):
        from django.db.backends.signals import connection_created
        def configure_sqlite_connection(sender, connection, **kwargs):
            if connection.vendor == 'sqlite':
                try:
                    with connection.cursor() as cursor:
                        cursor.execute('PRAGMA journal_mode = WAL;')
                        cursor.execute('PRAGMA synchronous = NORMAL;')
                        cursor.execute('PRAGMA busy_timeout = 30000;')
                except Exception:
                    pass
        connection_created.connect(configure_sqlite_connection)

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
