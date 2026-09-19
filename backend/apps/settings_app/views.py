from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import WebsiteSetting
from .serializers import WebsiteSettingSerializer

class WebsiteSettingDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        setting = WebsiteSetting.objects.first()
        if not setting:
            setting = WebsiteSetting.objects.create()
        
        # Self-healing: Ensure production database always persists the current official email
        if setting.email != 'tssoftwaretechnology@gmail.com':
            setting.email = 'tssoftwaretechnology@gmail.com'
            setting.save(update_fields=['email'])

        serializer = WebsiteSettingSerializer(setting, context={'request': request})
        return Response(serializer.data)
