from rest_framework import serializers
from .models import Course

class CourseSerializer(serializers.ModelSerializer):
    module_list = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = [
            'id', 'title', 'slug', 'category', 'duration', 'mode',
            'short_description', 'full_description', 'syllabus',
            'module_list', 'prerequisites', 'icon', 'featured',
            'is_active', 'order'
        ]

    def get_module_list(self, obj):
        if obj.syllabus:
            return [mod.strip() for mod in obj.syllabus.replace('\n', ',').split(',') if mod.strip()]
        return []
