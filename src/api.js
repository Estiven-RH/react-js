// Archivo: src/api.js
// Capa de acceso a datos de Agenda ADSO (API REST)

// Importamos la URL base desde config.js
import { API_BASE_URL } from "./config";

/* ============================
   GET: Listar todos los contactos
   ============================ */
export async function listarContactos() {
  const res = await fetch(API_BASE_URL);
  if (!res.ok) throw new Error("Error al listar contactos");
  return res.json();
}

/* ============================
   GET: Obtener un contacto por ID
   ============================ */
export async function obtenerContactoPorId(id) {
  const res = await fetch(`${API_BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Error al obtener el contacto");
  return res.json();
}

/* ============================
   POST: Crear contacto
   ============================ */
export async function crearContacto(data) {
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al crear el contacto");
  return res.json();
}

/* ============================
   PUT: Actualizar contacto por ID
   ============================ */
export async function actualizarContacto(id, data) {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al actualizar el contacto");
  return res.json();
}

/* ============================
   DELETE: Eliminar contacto por ID
   ============================ */
export async function eliminarContactoPorId(id) {
  const res = await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar el contacto");
  return true;
}
