from django.urls import path
from .views import ContactCreateView, HealthCheckView

urlpatterns = [
    path('health/', HealthCheckView.as_view(), name='health-check'),
    path('contact/', ContactCreateView.as_view(), name='contact-create'),
]
