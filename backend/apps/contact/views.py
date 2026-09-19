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

                # Send email notification to institute email
                try:
                    from django.core.mail import send_mail
                    from django.conf import settings as django_settings

                    recipient = getattr(
                        django_settings,
                        'CONTACT_NOTIFICATION_EMAIL',
                        getattr(django_settings, 'DEFAULT_FROM_EMAIL', 'tssoftwaretechnology@gmail.com')
                    )
                    from_email = getattr(django_settings, 'DEFAULT_FROM_EMAIL', 'tssoftwaretechnology@gmail.com')

                    email_subject = f"[TS Technology Inquiry] {contact_msg.subject or 'New Website Enquiry'}"
                    email_body = (
                        f"New Inquiry Submitted on TS Technology Website:\n\n"
                        f"Name: {contact_msg.name}\n"
                        f"Email: {contact_msg.email}\n"
                        f"Phone: {contact_msg.phone or 'N/A'}\n"
                        f"Company/College: {contact_msg.company or 'N/A'}\n"
                        f"Subject: {contact_msg.subject}\n"
                        f"Message:\n{contact_msg.message}\n\n"
                        f"Received At: {contact_msg.created_at}\n\n"
                        f"--\n"
                        f"TS Technology Automated Notification System\n"
                        f"Official Email: {recipient}\n"
                    )

                    # Safe fallback: if SMTP backend is configured but EMAIL_HOST_PASSWORD is blank, skip gracefully
                    email_backend = getattr(django_settings, 'EMAIL_BACKEND', '')
                    email_pwd = getattr(django_settings, 'EMAIL_HOST_PASSWORD', '')
                    if 'smtp' in email_backend.lower() and not email_pwd:
                        logger.warning(
                            "[EMAIL NOTIFICATION] SMTP backend is active but EMAIL_HOST_PASSWORD is not set. "
                            "Inquiry was safely stored in database; notification email delivery skipped."
                        )
                    else:
                        send_mail(email_subject, email_body, from_email, [recipient], fail_silently=False)
                        logger.info(f"[EMAIL NOTIFICATION] Alert successfully sent to {recipient} from {from_email}.")
                except Exception as mail_err:
                    logger.warning(f"[EMAIL NOTIFICATION] Could not send email alert to {recipient}: {mail_err}")
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


