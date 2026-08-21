from django.contrib import admin
from .models import Placement

@admin.register(Placement)
class PlacementAdmin(admin.ModelAdmin):
    list_display = ('student_name', 'company_name', 'role', 'package', 'course_taken', 'featured')
    list_filter = ('company_name', 'course_taken', 'featured')
    search_fields = ('student_name', 'company_name', 'role', 'course_taken')
    list_editable = ('featured',)
