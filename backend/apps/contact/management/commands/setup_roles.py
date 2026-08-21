from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from apps.courses.models import Course
from apps.placements.models import Placement
from apps.projects.models import Project
from apps.services.models import Service
from apps.contact.models import ContactMessage, AuditLog
from apps.settings_app.models import WebsiteSetting

class Command(BaseCommand):
    help = 'Sets up initial Role-Based Access Control (RBAC) groups and permissions for TS Technology'

    def handle(self, *args, **kwargs):
        self.stdout.write('Setting up TS Technology RBAC Groups & Permissions...')

        # 1. Create Groups
        ts_admin, _ = Group.objects.get_or_create(name='TS Admin')
        super_admin, _ = Group.objects.get_or_create(name='Super Admin')
        ts_manager, _ = Group.objects.get_or_create(name='TS Manager')
        content_mgr, _ = Group.objects.get_or_create(name='Content Manager')
        support_mgr, _ = Group.objects.get_or_create(name='Support Manager')
        viewer, _ = Group.objects.get_or_create(name='Viewer')

        # 2. Get Content Types
        course_ct = ContentType.objects.get_for_model(Course)
        placement_ct = ContentType.objects.get_for_model(Placement)
        project_ct = ContentType.objects.get_for_model(Project)
        service_ct = ContentType.objects.get_for_model(Service)
        contact_ct = ContentType.objects.get_for_model(ContactMessage)
        setting_ct = ContentType.objects.get_for_model(WebsiteSetting)
        audit_ct = ContentType.objects.get_for_model(AuditLog)

        # 3. TS Manager Permissions (Courses, Placements, Projects, Services, Contact Messages, Settings)
        mgr_perms = Permission.objects.filter(
            content_type__in=[course_ct, placement_ct, project_ct, service_ct, contact_ct, setting_ct]
        )
        ts_manager.permissions.set(mgr_perms)

        # 4. Content Manager Permissions (Courses, Placements, Projects, Services)
        content_perms = Permission.objects.filter(
            content_type__in=[course_ct, placement_ct, project_ct, service_ct]
        )
        content_mgr.permissions.set(content_perms)

        # 5. Support Manager Permissions (Contact Messages view & change)
        support_perms = Permission.objects.filter(
            content_type=contact_ct,
            codename__in=['view_contactmessage', 'change_contactmessage', 'delete_contactmessage']
        )
        support_mgr.permissions.set(support_perms)

        # 6. Viewer Permissions (Read-only view permissions across models)
        viewer_perms = Permission.objects.filter(
            codename__startswith='view_'
        )
        viewer.permissions.set(viewer_perms)

        # 7. TS Admin & Super Admin get all permissions
        all_perms = Permission.objects.all()
        ts_admin.permissions.set(all_perms)
        super_admin.permissions.set(all_perms)

        self.stdout.write(self.style.SUCCESS('Successfully configured TS Admin, TS Manager, Content Manager, Support Manager, and Viewer groups!'))
