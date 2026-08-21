from django.urls import path
from .views import WebsiteSettingDetailView

urlpatterns = [
    path('settings/', WebsiteSettingDetailView.as_view(), name='website-settings'),
]
