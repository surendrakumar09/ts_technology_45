from rest_framework import viewsets, permissions, filters
from .models import Course
from .serializers import CourseSerializer

class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Course.objects.filter(is_active=True)
    serializer_class = CourseSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'short_description', 'full_description', 'category', 'syllabus']
    ordering_fields = ['order', 'featured', 'title']

    def get_queryset(self):
        queryset = super().get_queryset()
        featured_only = self.request.query_params.get('featured', None)
        category = self.request.query_params.get('category', None)

        if featured_only is not None and featured_only.lower() in ['true', '1']:
            queryset = queryset.filter(featured=True)
        if category and category.lower() != 'all':
            queryset = queryset.filter(category__iexact=category)

        return queryset
