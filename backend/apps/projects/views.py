from rest_framework import viewsets, permissions, filters
from .models import Project
from .serializers import ProjectSerializer

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description', 'category', 'technologies']
    ordering_fields = ['created_at', 'featured']

    def get_queryset(self):
        queryset = super().get_queryset()
        featured_only = self.request.query_params.get('featured', None)
        category = self.request.query_params.get('category', None)

        if featured_only is not None and featured_only.lower() in ['true', '1']:
            queryset = queryset.filter(featured=True)
        if category and category.lower() != 'all':
            queryset = queryset.filter(category__iexact=category)

        return queryset
