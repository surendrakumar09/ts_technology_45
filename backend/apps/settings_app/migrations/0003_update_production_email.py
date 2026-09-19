from django.db import migrations

def update_email_to_new(apps, schema_editor):
    WebsiteSetting = apps.get_model('settings_app', 'WebsiteSetting')
    WebsiteSetting.objects.all().update(email='tssoftwaretechnology@gmail.com')

def reverse_func(apps, schema_editor):
    pass

class Migration(migrations.Migration):

    dependencies = [
        ('settings_app', '0002_alter_websitesetting_address_and_more'),
    ]

    operations = [
        migrations.RunPython(update_email_to_new, reverse_func),
    ]
