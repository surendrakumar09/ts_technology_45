from django.contrib import admin
from .models import Testimonial

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('client_name', 'company', 'position', 'rating', 'active', 'created_at')
    list_filter = ('active', 'rating', 'created_at')
    search_fields = ('client_name', 'company', 'message')
    list_editable = ('active',)
