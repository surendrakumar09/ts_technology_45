from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.utils.decorators import method_decorator

from apps.contact.models import ContactMessage, AuditLog
from apps.contact.serializers import ContactMessageSerializer, AuditLogSerializer, UserManageSerializer
from apps.contact.permissions import IsSuperAdmin, IsAuditLogViewer, IsContentManager, IsSupportManager, IsTSManagerOrAdmin, get_user_role
from apps.courses.models import Course
from apps.courses.serializers import CourseSerializer
from apps.placements.models import Placement
from apps.placements.serializers import PlacementSerializer
from apps.settings_app.models import WebsiteSetting
from apps.settings_app.serializers import WebsiteSettingSerializer

User = get_user_model()

def log_audit(request, action, object_type=None, object_id=None, description=""):
    user_str = request.user.username if (request.user and request.user.is_authenticated) else 'Anonymous'
    ip = request.META.get('REMOTE_ADDR', '')
    AuditLog.objects.create(
        user=user_str,
        action=action,
        object_type=object_type,
        object_id=str(object_id) if object_id else None,
        ip_address=ip,
        description=description
    )


class AdminCsrfView(APIView):
    permission_classes = [permissions.AllowAny]

    @method_decorator(ensure_csrf_cookie)
    def get(self, request):
        return Response({"message": "CSRF cookie initialized."})


class AdminLoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response(
                {"error": "Both username and password are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = authenticate(request, username=username, password=password)

        if user is None or not user.is_active or not (user.is_staff or user.is_superuser):
            log_audit(request, "FAILED_LOGIN", description=f"Failed login attempt for username '{username}'")
            return Response(
                {"error": "Invalid admin credentials or inactive account."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        login(request, user)
        role = get_user_role(user)
        log_audit(request, "LOGIN", description=f"Admin user '{user.username}' logged in with role '{role}'")

        return Response({
            "message": "Admin authentication successful.",
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "is_staff": user.is_staff,
                "is_superuser": user.is_superuser,
                "role": role
            }
        })


class AdminLogoutView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        if request.user and request.user.is_authenticated:
            log_audit(request, "LOGOUT", description=f"User '{request.user.username}' logged out")
        logout(request)
        return Response({"message": "Admin session logged out successfully."})


class AdminMeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        if not user or not user.is_authenticated or not (user.is_staff or user.is_superuser):
            return Response({"error": "Unauthenticated"}, status=status.HTTP_401_UNAUTHORIZED)
        
        role = get_user_role(user)
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "is_staff": user.is_staff,
            "is_superuser": user.is_superuser,
            "role": role
        })


class AdminUserViewSet(ModelViewSet):
    permission_classes = [IsSuperAdmin]
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserManageSerializer

    def perform_create(self, serializer):
        user = serializer.save()
        log_audit(self.request, "CREATE_USER", object_type="User", object_id=user.id, description=f"Created staff user '{user.username}'")

    def perform_update(self, serializer):
        target_user = self.get_object()
        req_user = self.request.user
        new_active = serializer.validated_data.get('is_active', target_user.is_active)
        new_role = serializer.validated_data.get('role_name', None)

        if target_user.id == req_user.id and new_active is False:
            raise exceptions.PermissionDenied("You cannot disable your own active administrator account.")

        active_superadmins = User.objects.filter(is_superuser=True, is_active=True)
        if target_user.is_superuser and active_superadmins.count() <= 1:
            if new_active is False:
                raise exceptions.PermissionDenied("Cannot disable the last remaining active Super Admin account.")
            if new_role and new_role not in ['TS Manager (Super Admin)', 'Super Admin']:
                raise exceptions.PermissionDenied("Cannot demote the last remaining active Super Admin account.")

        user = serializer.save()
        log_audit(self.request, "UPDATE_USER", object_type="User", object_id=user.id, description=f"Updated staff user '{user.username}'")

    def perform_destroy(self, instance):
        if instance.id == self.request.user.id:
            raise exceptions.PermissionDenied("You cannot delete your own active administrator account.")

        active_superadmins = User.objects.filter(is_superuser=True, is_active=True)
        if instance.is_superuser and active_superadmins.count() <= 1:
            raise exceptions.PermissionDenied("Cannot delete the last remaining active Super Admin account.")

        log_audit(self.request, "DELETE_USER", object_type="User", object_id=instance.id, description=f"Deleted user '{instance.username}'")
        instance.delete()


class AuditLogViewSet(ModelViewSet):
    permission_classes = [IsAuditLogViewer]
    queryset = AuditLog.objects.all().order_by('-timestamp')
    serializer_class = AuditLogSerializer
    http_method_names = ['get', 'head', 'options']


class AdminMessageViewSet(ModelViewSet):
    permission_classes = [IsSupportManager]
    queryset = ContactMessage.objects.all().order_by('-created_at')
    serializer_class = ContactMessageSerializer

    def perform_update(self, serializer):
        msg = serializer.save()
        log_audit(self.request, "UPDATE_MESSAGE_STATUS", object_type="ContactMessage", object_id=msg.id, description=f"Inquiry #{msg.id} status changed to '{msg.status}'")

    def perform_destroy(self, instance):
        log_audit(self.request, "DELETE_MESSAGE", object_type="ContactMessage", object_id=instance.id, description=f"Deleted inquiry from {instance.name}")
        instance.delete()


class AdminCourseViewSet(ModelViewSet):
    permission_classes = [IsContentManager]
    queryset = Course.objects.all().order_by('order', 'id')
    serializer_class = CourseSerializer

    def perform_create(self, serializer):
        course = serializer.save()
        log_audit(self.request, "CREATE_COURSE", object_type="Course", object_id=course.id, description=f"Created course '{course.title}'")

    def perform_update(self, serializer):
        course = serializer.save()
        log_audit(self.request, "UPDATE_COURSE", object_type="Course", object_id=course.id, description=f"Updated course '{course.title}'")

    def perform_destroy(self, instance):
        log_audit(self.request, "DELETE_COURSE", object_type="Course", object_id=instance.id, description=f"Deleted course '{instance.title}'")
        instance.delete()


class AdminPlacementViewSet(ModelViewSet):
    permission_classes = [IsContentManager]
    queryset = Placement.objects.all().order_by('-created_at')
    serializer_class = PlacementSerializer

    def perform_create(self, serializer):
        placement = serializer.save()
        log_audit(self.request, "CREATE_PLACEMENT", object_type="Placement", object_id=placement.id, description=f"Added placement record for '{placement.student_name}' @ {placement.company_name}")

    def perform_update(self, serializer):
        placement = serializer.save()
        log_audit(self.request, "UPDATE_PLACEMENT", object_type="Placement", object_id=placement.id, description=f"Updated placement record for '{placement.student_name}'")

    def perform_destroy(self, instance):
        log_audit(self.request, "DELETE_PLACEMENT", object_type="Placement", object_id=instance.id, description=f"Deleted placement record for '{instance.student_name}'")
        instance.delete()


class AdminSettingsView(APIView):
    permission_classes = [IsTSManagerOrAdmin]

    def get(self, request):
        setting, _ = WebsiteSetting.objects.get_or_create(id=1)
        serializer = WebsiteSettingSerializer(setting)
        return Response(serializer.data)

    def put(self, request):
        setting, _ = WebsiteSetting.objects.get_or_create(id=1)
        serializer = WebsiteSettingSerializer(setting, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            log_audit(request, "UPDATE_SETTINGS", object_type="WebsiteSetting", object_id=setting.id, description="Updated website settings")
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
