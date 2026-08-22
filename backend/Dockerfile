FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=10000

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libjpeg-dev \
    zlib1g-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

COPY . /app/

EXPOSE 10000

CMD ["sh", "-c", "python manage.py migrate --noinput || true; python manage.py setup_roles || true; python manage.py create_demo_users || true; python manage.py seed_data || true; exec gunicorn ts_backend.wsgi:application --bind 0.0.0.0:${PORT:-10000}"]
