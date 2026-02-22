from django.urls import path
from .views import PatientListCreateView, ConsultationListCreateView

urlpatterns = [
    path("patients/", PatientListCreateView.as_view(), name="patient-list-create"),
    path(
        "consultations/",
        ConsultationListCreateView.as_view(),
        name="consultation-list-create",
    ),
]
