from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group

User = get_user_model()

class Command(BaseCommand):
    help = 'Creates demo staff accounts for each RBAC role in TS Technology'

    def handle(self, *args, **kwargs):
        self.stdout.write('Creating demo accounts for each role...')

        accounts = [
            {
                'username': 'tsadmin',
                'email': 'tsadmin@tstechnology.in',
                'password': 'TSAdminPass@2026',
                'first_name': 'TS',
                'last_name': 'Head Admin',
                'role': 'TS Admin',
                'is_superuser': True,
                'is_staff': True
            },
            {
                'username': 'tsmanager',
                'email': 'tsmanager@tstechnology.in',
                'password': 'TSManagerPass@2026',
                'first_name': 'TS',
                'last_name': 'Operations Manager',
                'role': 'TS Manager',
                'is_superuser': False,
                'is_staff': True
            },
            {
                'username': 'contentmanager',
                'email': 'content@tstechnology.in',
                'password': 'ContentPass@2026',
                'first_name': 'Content',
                'last_name': 'Editor',
                'role': 'Content Manager',
                'is_superuser': False,
                'is_staff': True
            },
            {
                'username': 'supportmanager',
                'email': 'support@tstechnology.in',
                'password': 'SupportPass@2026',
                'first_name': 'Support',
                'last_name': 'Counselor',
                'role': 'Support Manager',
                'is_superuser': False,
                'is_staff': True
            },
            {
                'username': 'viewer',
                'email': 'viewer@tstechnology.in',
                'password': 'ViewerPass@2026',
                'first_name': 'Guest',
                'last_name': 'Auditor',
                'role': 'Viewer',
                'is_superuser': False,
                'is_staff': True
            }
        ]

        for acc in accounts:
            user, created = User.objects.get_or_create(username=acc['username'])
            user.email = acc['email']
            user.first_name = acc['first_name']
            user.last_name = acc['last_name']
            user.is_staff = acc['is_staff']
            user.is_superuser = acc['is_superuser']
            user.is_active = True
            user.set_password(acc['password'])
            user.save()

            user.groups.clear()
            group_name = 'TS Admin' if acc['role'] in ['TS Admin', 'Super Admin'] else acc['role']
            group, _ = Group.objects.get_or_create(name=group_name)
            user.groups.add(group)

            action = 'Created' if created else 'Updated'
            self.stdout.write(self.style.SUCCESS(f"[{action}] Role: {acc['role']} | Username: {acc['username']} | Password: {acc['password']}"))

        self.stdout.write(self.style.SUCCESS('All demo accounts configured successfully!'))
