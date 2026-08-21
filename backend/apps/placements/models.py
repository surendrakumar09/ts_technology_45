from django.db import models

class Placement(models.Model):
    student_name = models.CharField(max_length=150)
    course_taken = models.CharField(max_length=150, help_text="e.g. Python Full-Stack Development")
    company_name = models.CharField(max_length=150, help_text="Company hired by")
    role = models.CharField(max_length=150, help_text="Designation e.g. Software Engineer, Frontend Developer")
    package = models.CharField(max_length=50, blank=True, help_text="e.g. 6.5 LPA / 8.0 LPA")
    student_image = models.ImageField(upload_to='placements/', blank=True, null=True)
    testimonial_quote = models.TextField(blank=True)
    featured = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Placement Record'
        verbose_name_plural = 'Placement Records'

    def __str__(self):
        return f"{self.student_name} - {self.company_name} ({self.role})"
