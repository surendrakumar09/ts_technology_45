FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=8000

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libjpeg-dev \
    zlib1g-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements and install dependencies
COPY backend/requirements.txt /app/backend/requirements.txt
RUN pip install --no-cache-dir -r /app/backend/requirements.txt

# Copy backend codebase
COPY backend /app/backend

WORKDIR /app/backend

EXPOSE 8000

CMD sh -c "python manage.py migrate --noinput && python manage.py setup_roles && python manage.py create_demo_users && gunicorn ts_backend.wsgi:application --bind 0.0.0.0:${PORT:-8000}"
