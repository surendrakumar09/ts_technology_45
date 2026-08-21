from django.contrib import admin
from .models import WebsiteSetting

@admin.register(WebsiteSetting)
class WebsiteSettingAdmin(admin.ModelAdmin):
    list_display = ('company_name', 'email', 'phone', 'updated_at')

    def has_add_permission(self, request):
        if WebsiteSetting.objects.exists():
            return False
        return super().has_add_permission(request)
