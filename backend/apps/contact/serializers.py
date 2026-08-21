from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from .models import ContactMessage, AuditLog

User = get_user_model()
ALLOWED_ROLES = ['TS Admin', 'TS Manager', 'Content Manager', 'Support Manager', 'Viewer']

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'phone', 'company', 'subject', 'message', 'status', 'created_at']
        read_only_fields = ['id', 'created_at']

    def validate_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("Full name is required.")
        return value

    def validate_email(self, value):
        if not value.strip():
            raise serializers.ValidationError("Valid email address is required.")
        return value

    def validate_message(self, value):
        if len(value.strip()) < 10:
            raise serializers.ValidationError("Message must be at least 10 characters long.")
        return value


class AuditLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuditLog
        fields = ['id', 'user', 'action', 'object_type', 'object_id', 'ip_address', 'description', 'timestamp']


class UserManageSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()
    role_name = serializers.CharField(write_only=True, required=False)
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_staff', 'is_superuser', 'is_active', 'last_login', 'date_joined', 'role', 'role_name', 'password']
        read_only_fields = ['id', 'last_login', 'date_joined', 'is_superuser']

    def get_role(self, obj):
        if obj.is_superuser:
            return "TS Admin"
        groups = obj.groups.all()
        if groups.exists():
            name = groups[0].name
            if name in ["Super Admin", "tsadmin", "TS Admin"]:
                return "TS Admin"
            return name
        return "Staff" if obj.is_staff else "Viewer"

    def validate_role_name(self, value):
        if value and value not in ALLOWED_ROLES and value != 'Super Admin':
            raise serializers.ValidationError(f"Invalid role. Allowed roles are: {', '.join(ALLOWED_ROLES)}")
        return value

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        role_name = validated_data.pop('role_name', 'Viewer')

        if not password:
            raise serializers.ValidationError({"password": "An explicit secure password is required when creating a staff user."})

        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.is_staff = True

        if role_name in ['TS Admin', 'Super Admin']:
            group, _ = Group.objects.get_or_create(name='TS Admin')
            user.groups.add(group)
            user.is_superuser = True
        else:
            group, _ = Group.objects.get_or_create(name=role_name)
            user.groups.add(group)
            user.is_superuser = False

        user.save()
        return user

    def update(self, instance, validated_data):
        role_name = validated_data.pop('role_name', None)
        password = validated_data.pop('password', None)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
            
        if password:
            instance.set_password(password)

        if role_name:
            instance.groups.clear()
            if role_name in ['TS Admin', 'Super Admin']:
                group, _ = Group.objects.get_or_create(name='TS Admin')
                instance.groups.add(group)
                instance.is_superuser = True
            else:
                group, _ = Group.objects.get_or_create(name=role_name)
                instance.groups.add(group)
                instance.is_superuser = False

        instance.save()
        return instance
