from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response
from .models import Patient, Consultation
from .serializers import PatientSerializer, ConsultationSerializer
from django.shortcuts import get_object_or_404
from .utils import AIUtils
from rest_framework.decorators import api_view


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


@api_view(["POST"])
def summarize_consultation(request, consultation_id):
    consultation = get_object_or_404(Consultation, pk=consultation_id)
    ai_utils = AIUtils()
    summary = ai_utils.summarize_symptoms_diagnosis(
        consultation.symptoms, consultation.diagnosis
    )
    serializer = ConsultationSerializer(
        instance=consultation,
        data={"ai_summary": summary},
        partial=True,
    )
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response({"error": "Unexpected error!"}, status=500)
