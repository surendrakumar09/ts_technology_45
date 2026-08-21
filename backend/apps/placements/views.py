from rest_framework import viewsets, permissions
from .models import Placement
from .serializers import PlacementSerializer

class PlacementViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Placement.objects.all()
    serializer_class = PlacementSerializer
    permission_classes = [permissions.AllowAny]
