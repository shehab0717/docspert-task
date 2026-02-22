from django.db import models
from core.models import TimestampedModel

# Create your models here.


class Patient(TimestampedModel):
    full_name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    email = models.EmailField(unique=True)


class Consultation(TimestampedModel):
    patient = models.ForeignKey(
        "Patient",
        on_delete=models.CASCADE,
        related_name="consultations",
    )
    symptoms = models.TextField(max_length=5000)
    diagnosis = models.TextField(max_length=5000, null=True)
    ai_summary = models.TextField(max_length=10000, null=True)
