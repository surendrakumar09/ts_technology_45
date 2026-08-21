import os
from pathlib import Path
from dotenv import load_dotenv

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Load environment variables from .env file if present
load_dotenv(BASE_DIR / '.env')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.getenv('DEBUG', 'True').lower() in ('true', '1', 't')

# SECURITY WARNING: keep the secret key used in production secret!
if DEBUG:
    SECRET_KEY = os.getenv('SECRET_KEY', 'django-insecure-ts-technology-development-key-2026-secure-default')
else:
    SECRET_KEY = os.getenv('SECRET_KEY')
    if not SECRET_KEY or SECRET_KEY.startswith('django-insecure'):
        raise ValueError("CRITICAL SECURITY ERROR: Production SECRET_KEY environment variable is required and must not be a default insecure key.")

if DEBUG:
    ALLOWED_HOSTS = [
        host.strip() for host in os.getenv(
            'ALLOWED_HOSTS',
            'localhost,127.0.0.1,192.168.1.7,0.0.0.0,*'
        ).split(',') if host.strip()
    ]
else:
    raw_allowed = os.getenv('ALLOWED_HOSTS', '').strip()
    if not raw_allowed:
        raise ValueError("CRITICAL SECURITY ERROR: ALLOWED_HOSTS environment variable must be explicitly defined when DEBUG=False.")
    ALLOWED_HOSTS = [host.strip() for host in raw_allowed.split(',') if host.strip() and host.strip() != '*']

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third party packages
    'rest_framework',
    'corsheaders',

    # Local apps
    'apps.courses',
    'apps.placements',
    'apps.projects',
    'apps.services',
    'apps.contact',
    'apps.settings_app',
    'apps.testimonials',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'ts_backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'ts_backend.wsgi.application'

# Database Configuration (MySQL required in production, SQLite for local dev)
if not DEBUG:
    DB_NAME = os.getenv('DB_NAME')
    DB_USER = os.getenv('DB_USER')
    DB_PASSWORD = os.getenv('DB_PASSWORD')
    DB_HOST = os.getenv('DB_HOST')
    DB_PORT = os.getenv('DB_PORT', '3306')

    if not all([DB_NAME, DB_USER, DB_PASSWORD, DB_HOST]):
        raise ValueError("CRITICAL DATABASE ERROR: Production MySQL settings (DB_NAME, DB_USER, DB_PASSWORD, DB_HOST) are required when DEBUG=False. SQLite fallback is strictly forbidden in production.")

    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': DB_NAME,
            'USER': DB_USER,
            'PASSWORD': DB_PASSWORD,
            'HOST': DB_HOST,
            'PORT': DB_PORT,
            'OPTIONS': {
                'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
                'charset': 'utf8mb4',
            },
        }
    }
else:
    DB_NAME = os.getenv('DB_NAME', '')
    if DB_NAME:
        DATABASES = {
            'default': {
                'ENGINE': 'django.db.backends.mysql',
                'NAME': DB_NAME,
                'USER': os.getenv('DB_USER', 'root'),
                'PASSWORD': os.getenv('DB_PASSWORD', ''),
                'HOST': os.getenv('DB_HOST', '127.0.0.1'),
                'PORT': os.getenv('DB_PORT', '3306'),
                'OPTIONS': {
                    'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
                    'charset': 'utf8mb4',
                },
            }
        }
    else:
        DATABASES = {
            'default': {
                'ENGINE': 'django.db.backends.sqlite3',
                'NAME': BASE_DIR / 'db.sqlite3',
            }
        }

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static & Media files
STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

MEDIA_URL = 'media/'
MEDIA_ROOT = BASE_DIR / 'media'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# REST Framework Settings
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ],
}

# CORS & CSRF Configuration
if DEBUG:
    CORS_ALLOW_ALL_ORIGINS = True
    CORS_ALLOWED_ORIGINS = [
        origin.strip() for origin in os.getenv(
            'CORS_ALLOWED_ORIGINS',
            'http://localhost:5173,http://127.0.0.1:5173,http://localhost:5174,http://127.0.0.1:5174,http://192.168.1.7:5173,http://192.168.1.7:5174,http://localhost:3000,http://127.0.0.1:3000'
        ).split(',') if origin.strip()
    ]
    CSRF_TRUSTED_ORIGINS = [
        origin.strip() for origin in os.getenv(
            'CSRF_TRUSTED_ORIGINS',
            'http://localhost:5173,http://127.0.0.1:5173,http://localhost:5174,http://127.0.0.1:5174,http://192.168.1.7:5173,http://192.168.1.7:5174,http://localhost:8000,http://127.0.0.1:8000,http://192.168.1.7:8000'
        ).split(',') if origin.strip()
    ]
else:
    CORS_ALLOW_ALL_ORIGINS = False
    raw_cors = os.getenv('CORS_ALLOWED_ORIGINS', '').strip()
    if not raw_cors:
        raise ValueError("CRITICAL SECURITY ERROR: CORS_ALLOWED_ORIGINS environment variable must be defined when DEBUG=False.")
    CORS_ALLOWED_ORIGINS = [origin.strip() for origin in raw_cors.split(',') if origin.strip()]

    raw_csrf = os.getenv('CSRF_TRUSTED_ORIGINS', '').strip()
    if not raw_csrf:
        raise ValueError("CRITICAL SECURITY ERROR: CSRF_TRUSTED_ORIGINS environment variable must be defined when DEBUG=False.")
    CSRF_TRUSTED_ORIGINS = [origin.strip() for origin in raw_csrf.split(',') if origin.strip()]

CORS_ALLOW_CREDENTIALS = True
SESSION_COOKIE_SAMESITE = 'Lax'
CSRF_COOKIE_SAMESITE = 'Lax'
CSRF_COOKIE_HTTPONLY = False

# Production Security Headers
if not DEBUG:
    SECURE_SSL_REDIRECT = os.getenv('SECURE_SSL_REDIRECT', 'True').lower() in ('true', '1', 't')
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_HSTS_SECONDS = 31536000
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
    X_FRAME_OPTIONS = 'DENY'
