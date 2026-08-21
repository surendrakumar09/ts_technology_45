from django.db import models
from django.utils.text import slugify

class Service(models.Model):
    title = models.CharField(max_length=150)
    slug = models.SlugField(max_length=180, unique=True, blank=True)
    icon = models.CharField(max_length=50, default='Code', help_text="Lucide Icon name e.g. Code, Globe, Database, Cpu")
    short_description = models.CharField(max_length=255)
    full_description = models.TextField()
    features = models.TextField(blank=True, help_text="Comma or newline separated features")
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'title']
        verbose_name = 'Service'
        verbose_name_plural = 'Services'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
