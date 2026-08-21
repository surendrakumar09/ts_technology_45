from rest_framework import serializers
from .models import Service

class ServiceSerializer(serializers.ModelSerializer):
    feature_list = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = [
            'id', 'title', 'slug', 'icon', 'short_description',
            'full_description', 'features', 'feature_list', 'is_active', 'order'
        ]

    def get_feature_list(self, obj):
        if obj.features:
            items = [f.strip() for f in obj.features.replace('\n', ',').split(',') if f.strip()]
            return items
        return []
