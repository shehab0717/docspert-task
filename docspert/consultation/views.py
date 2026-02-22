from rest_framework.generics import ListCreateAPIView
from .models import Patient, Consultation
from .serializers import PatientSerializer, ConsultationSerializer


class PatientListCreateView(ListCreateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer


class ConsultationListCreateView(ListCreateAPIView):
    queryset = Consultation.objects.all()
    serializer_class = ConsultationSerializer
