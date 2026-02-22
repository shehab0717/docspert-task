from rest_framework.serializers import ModelSerializer
from .models import Patient, Consultation


class PatientSerializer(ModelSerializer):
    class Meta:
        model = Patient
        fields = "__all__"


class ConsultationSerializer(ModelSerializer):
    class Meta:
        model = Consultation
        fields = "__all__"
