from django.db import models
from django.utils.text import slugify

class Course(models.Model):
    CATEGORY_CHOICES = [
        ('Full-Stack Development', 'Full-Stack Development'),
        ('Python & Django', 'Python & Django'),
        ('Frontend Engineering', 'Frontend Engineering'),
        ('Database & Cloud', 'Database & Cloud'),
        ('Software Testing / QA', 'Software Testing / QA'),
        ('Data Science & AI', 'Data Science & AI'),
    ]

    MODE_CHOICES = [
        ('Classroom & Online', 'Classroom & Online'),
        ('Classroom Training', 'Classroom Training'),
        ('Online Live Classes', 'Online Live Classes'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES, default='Full-Stack Development')
    duration = models.CharField(max_length=100, default='3 Months (12 Weeks)')
    mode = models.CharField(max_length=100, choices=MODE_CHOICES, default='Classroom & Online')
    short_description = models.CharField(max_length=255)
    full_description = models.TextField()
    syllabus = models.TextField(help_text="Comma or newline separated syllabus modules")
    prerequisites = models.CharField(max_length=250, default="Basic computer literacy & passion to learn programming")
    icon = models.CharField(max_length=50, default='BookOpen', help_text="Lucide icon name")
    featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-featured', 'title']
        verbose_name = 'Course'
        verbose_name_plural = 'Courses'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} ({self.category})"
