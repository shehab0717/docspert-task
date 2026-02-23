// Consultations page JS
let patientsMap = {};

function loadAllPatients(page = 1, acc = [], cb) {
  $.get(`${API_BASE}/patients/?page=${page}`, function (data) {
    acc = acc.concat(data.results || []);
    if (data.next) {
      const nextPage = (function () {
        const m = data.next.match(/[?&]page=(\d+)/);
        return m ? parseInt(m[1], 10) : null;
      })();
      if (nextPage) {
        loadAllPatients(nextPage, acc, cb);
        return;
      }
    }
    cb(acc);
  }).fail(function (xhr) {
    cb(acc);
  });
}

function populatePatientsSelect(allPatients) {
  patientsMap = {};
  let options = '<option value="">Select Patient</option>';
  allPatients.forEach((p) => {
    patientsMap[p.id] = p.full_name;
    options += `<option value="${p.id}">${p.full_name}</option>`;
  });
  $("#patient").html(options);
}

function renderConsultationsTable(data) {
  let html =
    '<table class="table"><thead><tr><th>ID</th><th>Patient</th><th>Symptoms</th><th>Diagnosis</th><th>AI Summary</th><th>Actions</th></tr></thead><tbody>';
  data.results.forEach((consultation) => {
    const patientName =
      patientsMap[consultation.patient] || consultation.patient;
    const summaryBtn = consultation.ai_summary
      ? `<button class="btn btn-info btn-sm" onclick="showSummary(${JSON.stringify(consultation.ai_summary)})">View Summary</button>`
      : `<button class="btn btn-warning btn-sm" onclick="generateSummary(${consultation.id})">Generate Summary</button>`;
    html += `<tr><td>${consultation.id}</td><td>${patientName}</td><td>${(consultation.symptoms || "").substring(0, 120)}</td><td>${consultation.diagnosis ? consultation.diagnosis.substring(0, 80) : ""}</td><td>${consultation.ai_summary ? "Yes" : "No"}</td><td>${summaryBtn}</td></tr>`;
  });
  html += "</tbody></table>";
  $("#consultationsList").html(html);
}

function loadConsultations(page = 1) {
  $.get(`${API_BASE}/consultations/?page=${page}`, function (data) {
    renderConsultationsTable(data);
    renderPagination("#consultationsPagination", data, loadConsultations);
  }).fail(function (xhr) {
    alert("Failed to load consultations: " + xhr.responseText);
  });
}

function generateSummary(id) {
  $.post(`${API_BASE}/consultations/${id}/summarize/`, {}, function (data) {
    loadConsultations();
  }).fail(function (xhr) {
    alert("Failed to generate summary: " + xhr.responseText);
  });
}

function showSummary(summary) {
  $("#summaryText").text(summary);
  $("#summaryModal").modal("show");
}

$(document).ready(function () {
  // load all patients for select and mapping
  loadAllPatients(1, [], function (all) {
    populatePatientsSelect(all);
    loadConsultations(1);
  });

  $("#saveConsultation").click(function () {
    const payload = {
      patient: $("#patient").val(),
      symptoms: $("#symptoms").val(),
      diagnosis: $("#diagnosis").val(),
    };
    $.ajax({
      url: `${API_BASE}/consultations/`,
      type: "POST",
      data: JSON.stringify(payload),
      contentType: "application/json",
      success: function () {
        $("#createConsultationModal").modal("hide");
        $("#createConsultationForm")[0].reset();
        loadConsultations(1);
      },
      error: function (xhr) {
        alert("Error: " + xhr.responseText);
      },
    });
  });
});
