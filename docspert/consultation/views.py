from rest_framework.generics import ListCreateAPIView
from .models import Patient, Consultation
from .serializers import PatientSerializer, ConsultationSerializer


class PatientListCreateView(ListCreateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer


class ConsultationListCreateView(ListCreateAPIView):
    serializer_class = ConsultationSerializer

    def get_queryset(self):
        queryset = Consultation.objects.all()
        patient_id = self.request.query_params.get("patient_id")
        if patient_id:
            queryset = queryset.filter(patient=patient_id)

        return queryset
