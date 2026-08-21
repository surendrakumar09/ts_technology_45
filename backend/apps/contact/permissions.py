from rest_framework import permissions

def get_user_role(user):
    if not user or not user.is_authenticated:
        return None
    if user.is_superuser:
        return 'TS Admin'
    groups = list(user.groups.values_list('name', flat=True))
    if 'TS Admin' in groups or 'Super Admin' in groups or 'tsadmin' in groups:
        return 'TS Admin'
    if 'TS Manager' in groups or 'tsmanager' in groups:
        return 'TS Manager'
    if 'Content Manager' in groups:
        return 'Content Manager'
    if 'Support Manager' in groups:
        return 'Support Manager'
    if 'Viewer' in groups:
        return 'Viewer'
    return 'Staff' if user.is_staff else None


class IsSuperAdmin(permissions.BasePermission):
    """Full access to system, staff user management, roles, and audit logs for TS Admin (Head Admin)."""
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        role = get_user_role(request.user)
        return request.user.is_superuser or role in ['TS Admin', 'Super Admin']


class IsAuditLogViewer(permissions.BasePermission):
    """Audit logs access: TS Admin (full) and Viewer (read-only). TS Managers & lower managers blocked."""
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        
        role = get_user_role(request.user)
        if role in ['TS Admin', 'Super Admin']:
            return True
        if role == 'Viewer' and request.method in permissions.SAFE_METHODS:
            return True
        
        return False


class IsContentManager(permissions.BasePermission):
    """Full CRUD on Courses, Placements, Services, Testimonials. Allowed for TS Admin, TS Manager, Content Manager."""
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        
        role = get_user_role(request.user)
        if role in ['TS Admin', 'Super Admin', 'TS Manager', 'Content Manager']:
            return True
        
        # Read-only for Viewers & Support Managers
        if request.method in permissions.SAFE_METHODS and role in ['Support Manager', 'Viewer']:
            return True
        
        return False


class IsSupportManager(permissions.BasePermission):
    """Full access to Contact Messages / Admissions inquiries. Allowed for TS Admin, TS Manager, Support Manager."""
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        
        role = get_user_role(request.user)
        if role in ['TS Admin', 'Super Admin', 'TS Manager', 'Support Manager']:
            return True
        
        # Read-only for Viewers & Content Managers
        if request.method in permissions.SAFE_METHODS and role in ['Content Manager', 'Viewer']:
            return True
        
        return False


class IsTSManagerOrAdmin(permissions.BasePermission):
    """Access to Settings & Operational Management for TS Admin and TS Manager."""
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        
        role = get_user_role(request.user)
        if role in ['TS Admin', 'Super Admin', 'TS Manager']:
            return True
        
        if request.method in permissions.SAFE_METHODS and role in ['Content Manager', 'Support Manager', 'Viewer']:
            return True

        return False


class IsViewerReadOnly(permissions.BasePermission):
    """Read-only access across all endpoints for authenticated staff/viewers."""
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        
        role = get_user_role(request.user)
        if not role:
            return False

        if role in ['TS Admin', 'Super Admin']:
            return True

        if request.method in permissions.SAFE_METHODS:
            return True

        return False
