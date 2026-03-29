const API = "/api/reservations";

const form = document.getElementById("reservationForm");
const table = document.getElementById("reservationsTable");
const message = document.getElementById("message");

let editingId = null;

function showMessage(text, success) {
  message.textContent = text;
  message.className = success ? "success" : "error";
  setTimeout(() => {
    message.textContent = "";
    message.className = "";
  }, 3000);
}

function toDatetimeLocalValue(value) {
  if (!value) return "";
  const d = new Date(value);
  const pad = (n) => String(n).padStart(2, "0");
  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const mi = pad(d.getMinutes());
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
}

async function loadReservations() {
  try {
    const res = await fetch(API);
    const json = await res.json();

    if (!res.ok || !json.ok) {
      throw new Error(json.error || "Failed to load reservations");
    }

    const reservations = json.data || [];
    table.innerHTML = "";

    for (const r of reservations) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${r.id}</td>
        <td>${r.resource_id ?? r.resourceId}</td>
        <td>${r.user_id ?? r.userId}</td>
        <td>${r.start_time ?? r.startTime}</td>
        <td>${r.end_time ?? r.endTime}</td>
        <td>${r.note || ""}</td>
        <td>${r.status || ""}</td>
        <td>
          <button type="button" onclick="editReservation(${r.id})">Edit</button>
          <button type="button" onclick="deleteReservation(${r.id})">Delete</button>
        </td>
      `;
      table.appendChild(row);
    }
  } catch (err) {
    console.error(err);
    showMessage("Error loading reservations", false);
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    resourceId: Number(document.getElementById("resourceId").value),
    userId: Number(document.getElementById("userId").value),
    startTime: new Date(document.getElementById("startTime").value).toISOString(),
    endTime: new Date(document.getElementById("endTime").value).toISOString(),
    note: document.getElementById("note").value.trim(),
    status: document.getElementById("status").value.trim() || "active"
  };

  try {
    const url = editingId ? `${API}/${editingId}` : API;
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok || json.ok === false) {
      throw new Error(json.error || "Database error");
    }

    showMessage(editingId ? "Reservation updated" : "Reservation created", true);
    form.reset();
    editingId = null;
    loadReservations();
  } catch (err) {
    console.error(err);
    showMessage(`Error saving reservation: ${err.message}`, false);
  }
});

async function editReservation(id) {
  try {
    const res = await fetch(`${API}/${id}`);
    const json = await res.json();

    if (!res.ok || !json.ok) {
      throw new Error(json.error || "Failed to load reservation");
    }

    const r = json.data;
    editingId = id;

    document.getElementById("resourceId").value = r.resource_id ?? r.resourceId ?? "";
    document.getElementById("userId").value = r.user_id ?? r.userId ?? "";
    document.getElementById("startTime").value = toDatetimeLocalValue(r.start_time ?? r.startTime);
    document.getElementById("endTime").value = toDatetimeLocalValue(r.end_time ?? r.endTime);
    document.getElementById("note").value = r.note || "";
    document.getElementById("status").value = r.status || "active";
  } catch (err) {
    console.error(err);
    showMessage("Error loading reservation", false);
  }
}

async function deleteReservation(id) {
  if (!confirm("Delete this reservation?")) return;

  try {
    const res = await fetch(`${API}/${id}`, { method: "DELETE" });

    if (!res.ok && res.status !== 204) {
      const json = await res.json().catch(() => ({}));
      throw new Error(json.error || "Delete failed");
    }

    showMessage("Reservation deleted", true);
    loadReservations();
  } catch (err) {
    console.error(err);
    showMessage("Error deleting reservation", false);
  }
}

loadReservations();