from rest_framework import serializers
from .models import WebsiteSetting

class WebsiteSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = WebsiteSetting
        fields = '__all__'
