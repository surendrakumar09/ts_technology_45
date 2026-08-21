from rest_framework import serializers
from .models import Placement

class PlacementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Placement
        fields = ['id', 'student_name', 'course_taken', 'company_name', 'role', 'package', 'student_image', 'testimonial_quote', 'featured', 'created_at']
