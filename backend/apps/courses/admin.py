from django.contrib import admin
from .models import Course

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'duration', 'mode', 'featured', 'is_active', 'order')
    list_filter = ('category', 'mode', 'featured', 'is_active')
    search_fields = ('title', 'short_description', 'full_description', 'syllabus')
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ('featured', 'is_active', 'order')
    ordering = ('order', 'title')
