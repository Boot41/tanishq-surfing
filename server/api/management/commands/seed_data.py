from django.core.management.base import BaseCommand
from api.models import Organization

class Command(BaseCommand):
    help = 'Seeds the database with initial data'

    def handle(self, *args, **kwargs):
        organizations = [
            {'name': 'Google', 'description': 'Tech Giant'},
            {'name': 'Microsoft', 'description': 'Software Leader'},
            {'name': 'Amazon', 'description': 'E-commerce & Cloud'},
            {'name': 'Meta', 'description': 'Social Media Company'},
            {'name': 'Apple', 'description': 'Consumer Tech'},
        ]

        for org_data in organizations:
            Organization.objects.get_or_create(
                name=org_data['name'],
                defaults={'description': org_data['description']}
            )

        self.stdout.write(self.style.SUCCESS('Successfully seeded organizations'))