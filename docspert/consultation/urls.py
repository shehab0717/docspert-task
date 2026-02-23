from django.urls import path
from .views import (
    PatientListCreateView,
    ConsultationListCreateView,
    summarize_consultation,
)

urlpatterns = [
    path("patients/", PatientListCreateView.as_view(), name="patient-list-create"),
    path(
        "consultations/",
        ConsultationListCreateView.as_view(),
        name="consultation-list-create",
    ),
    path(
        "consultations/<int:consultation_id>/summarize/",
        summarize_consultation,
        name="consultation-summarize",
    ),
]
