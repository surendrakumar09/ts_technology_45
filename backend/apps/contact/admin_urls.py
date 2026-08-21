from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.contact.admin_views import (
    AdminCsrfView, AdminLoginView, AdminLogoutView, AdminMeView, AdminSettingsView,
    AdminMessageViewSet, AdminCourseViewSet, AdminPlacementViewSet,
    AdminUserViewSet, AuditLogViewSet
)

router = DefaultRouter()
router.register(r'messages', AdminMessageViewSet, basename='admin-messages')
router.register(r'courses', AdminCourseViewSet, basename='admin-courses')
router.register(r'placements', AdminPlacementViewSet, basename='admin-placements')
router.register(r'users', AdminUserViewSet, basename='admin-users')
router.register(r'audit-logs', AuditLogViewSet, basename='admin-audit-logs')

urlpatterns = [
    path('csrf/', AdminCsrfView.as_view(), name='admin-csrf'),
    path('login/', AdminLoginView.as_view(), name='admin-login'),
    path('logout/', AdminLogoutView.as_view(), name='admin-logout'),
    path('me/', AdminMeView.as_view(), name='admin-me'),
    path('settings/', AdminSettingsView.as_view(), name='admin-settings'),
    path('', include(router.urls)),
]
