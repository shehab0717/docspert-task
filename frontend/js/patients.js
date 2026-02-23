// Patients page JS

function renderPatientsTable(data) {
  let html =
    '<table class="table"><thead><tr><th>ID</th><th>Full Name</th><th>Date of Birth</th><th>Email</th><th>Created</th></tr></thead><tbody>';
  data.results.forEach((patient) => {
    html += `<tr><td>${patient.id}</td><td>${patient.full_name}</td><td>${patient.date_of_birth}</td><td>${patient.email}</td><td>${patient.created_at || ""}</td></tr>`;
  });
  html += "</tbody></table>";
  $("#patientsList").html(html);
}

function loadPatients(page = 1) {
  $.get(`${API_BASE}/patients/?page=${page}`, function (data) {
    renderPatientsTable(data);
    renderPagination("#patientsPagination", data, loadPatients);
  }).fail(function (xhr) {
    alert("Failed to load patients: " + xhr.responseText);
  });
}

$(document).ready(function () {
  loadPatients(1);

  $("#savePatient").click(function () {
    const payload = {
      full_name: $("#fullName").val(),
      date_of_birth: $("#dateOfBirth").val(),
      email: $("#email").val(),
    };
    $.ajax({
      url: `${API_BASE}/patients/`,
      type: "POST",
      data: JSON.stringify(payload),
      contentType: "application/json",
      success: function () {
        $("#createPatientModal").modal("hide");
        $("#createPatientForm")[0].reset();
        loadPatients(1);
      },
      error: function (xhr) {
        alert("Error: " + xhr.responseText);
      },
    });
  });
});
