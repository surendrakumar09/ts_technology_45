from django.db import models

class WebsiteSetting(models.Model):
    company_name = models.CharField(max_length=100, default="TS Technology")
    tagline = models.CharField(max_length=200, default="Empowering Minds, Building Digital Solutions for a Smarter Future.")
    description = models.TextField(default="TS Technology is a premier IT Coaching Centre & Technology Solutions Provider offering industry-grade software courses, live project training, placement assistance, and custom software development in Ram Nagar, Ananthapur.")
    email = models.EmailField(default="tstechnology2000@gmail.com")
    phone = models.CharField(max_length=50, default="8008066034")
    address = models.CharField(max_length=255, default="Ram Nagar, Ananthapur")
    business_hours = models.CharField(max_length=150, default="Mon - Sat: 9:00 AM - 6:00 PM IST")
    social_linkedin = models.URLField(blank=True, default="https://linkedin.com")
    social_github = models.URLField(blank=True, default="https://github.com")
    social_instagram = models.URLField(blank=True, default="https://instagram.com")
    social_twitter = models.URLField(blank=True, default="https://twitter.com")
    logo = models.ImageField(upload_to='settings/', blank=True, null=True)
    favicon = models.ImageField(upload_to='settings/', blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Website Setting'
        verbose_name_plural = 'Website Settings'

    def __str__(self):
        return f"{self.company_name} Settings"
