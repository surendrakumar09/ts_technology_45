from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.db import transaction
import logging
from .models import ContactMessage
from .serializers import ContactMessageSerializer

logger = logging.getLogger(__name__)

class ContactCreateView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            try:
                with transaction.atomic():
                    contact_msg = serializer.save()

                logger.info(f"Successfully created ContactMessage id={contact_msg.id} for {contact_msg.email}")
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
            except Exception as e:
                logger.error(f"Database error saving ContactMessage: {str(e)}", exc_info=True)
                return Response(
                    {
                        "success": False,
                        "message": "Database transaction error: Unable to save inquiry. Please try again later.",
                        "error": str(e)
                    },
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        return Response(
            {
                "success": False,
                "message": "Please correct the errors in the form.",
                "errors": serializer.errors
            },
            status=status.HTTP_400_BAD_REQUEST
        )

