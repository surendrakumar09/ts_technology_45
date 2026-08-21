from django.db import models
from django.utils.text import slugify

class Project(models.Model):
    CATEGORY_CHOICES = [
        ('Web Development', 'Web Development'),
        ('Full-Stack Development', 'Full-Stack Development'),
        ('Custom Software', 'Custom Software'),
        ('E-Commerce', 'E-Commerce'),
        ('Business Automation', 'Business Automation'),
        ('UI/UX Design', 'UI/UX Design'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    description = models.TextField()
    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES, default='Full-Stack Development')
    technologies = models.CharField(max_length=300, help_text="Comma separated technologies e.g. React, Django, MySQL")
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    project_url = models.URLField(blank=True, null=True, help_text="Live project demo URL")
    github_url = models.URLField(blank=True, null=True, help_text="Source code repository URL")
    featured = models.BooleanField(default=False, help_text="Feature this project on home page hero/showcase")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-featured', '-created_at']
        verbose_name = 'Project'
        verbose_name_plural = 'Projects'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
