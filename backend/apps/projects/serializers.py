from rest_framework import serializers
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    tech_list = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'description', 'category',
            'technologies', 'tech_list', 'image', 'project_url',
            'github_url', 'featured', 'created_at', 'updated_at'
        ]

    def get_tech_list(self, obj):
        if obj.technologies:
            return [tech.strip() for tech in obj.technologies.split(',') if tech.strip()]
        return []
