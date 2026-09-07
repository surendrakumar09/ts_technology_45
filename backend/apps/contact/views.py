from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.db import transaction, connection
from pathlib import Path
import logging
from .models import ContactMessage
from .serializers import ContactMessageSerializer

logger = logging.getLogger(__name__)

class HealthCheckView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        try:
            db_engine = connection.vendor
            raw_db_name = connection.settings_dict.get('NAME', 'unknown')
            db_name = str(Path(raw_db_name).name) if isinstance(raw_db_name, (str, Path)) else str(raw_db_name)
            inquiry_count = ContactMessage.objects.count()

            return Response({
                "status": "healthy",
                "database_engine": db_engine,
                "database_name": db_name,
                "total_inquiries_stored": inquiry_count,
                "message": "Production API and Database operational."
            }, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Health check failed: {str(e)}", exc_info=True)
            return Response({
                "status": "error",
                "error": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ContactCreateView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            db_engine = connection.vendor
            db_name = str(connection.settings_dict.get('NAME', 'unknown'))
            logger.info(
                f"[DB DIAGNOSTIC] Incoming enquiry. Engine: {db_engine}, Path: {db_name}, "
                f"Model: ContactMessage, Table: {ContactMessage._meta.db_table}"
            )
            try:
                with transaction.atomic():
                    contact_msg = serializer.save()

                logger.info(
                    f"[DB DIAGNOSTIC] SUCCESS: Saved ContactMessage id={contact_msg.id} ({contact_msg.email}) "
                    f"to {db_name} (table: {ContactMessage._meta.db_table})"
                )
                return Response(
                    {
                        "success": True,
                        "message": "Thank you! Your message has been received. Our team will contact you soon.",
                        "data": {
                            "id": contact_msg.id,
                            "created_at": contact_msg.created_at,
                            "database_engine": db_engine,
                            "database_path": db_name,
                            "table": ContactMessage._meta.db_table
                        }
                    },
                    status=status.HTTP_201_CREATED
                )
            except Exception as e:
                logger.error(f"[DB DIAGNOSTIC ERROR] Database error saving ContactMessage: {str(e)}", exc_info=True)
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


