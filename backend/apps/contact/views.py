from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import ContactMessage
from .serializers import ContactMessageSerializer

class ContactCreateView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            contact_msg = serializer.save()
            return Response(
                {
                    "success": True,
                    "message": "Thank you! Your message has been received. Our team will contact you soon.",
                    "data": {
                        "id": contact_msg.id,
                        "created_at": contact_msg.created_at
                    }
                },
                status=status.HTTP_201_CREATED
            )
        return Response(
            {
                "success": False,
                "message": "Please correct the errors in the form.",
                "errors": serializer.errors
            },
            status=status.HTTP_400_BAD_REQUEST
        )
