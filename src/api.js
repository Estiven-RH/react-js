const API = "http://localhost:3002/contactos";

/* ============================
   GET: Listar todos los contactos
   ============================ */
export async function listarContactos() {
  const res = await fetch(API);
  if (!res.ok) throw new Error("Error al listar contactos");
  return res.json();
}

/* ============================
   GET: Obtener un contacto por ID
   (Útil cuando abras modo edición)
   ============================ */
export async function obtenerContactoPorId(id) {
  const res = await fetch(`${API}/${id}`);
  if (!res.ok) throw new Error("Error al obtener el contacto");
  return res.json();
}

/* ============================
   POST: Crear contacto
   ============================ */
export async function crearContacto(data) {
  const res = await fetch(API, {
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
  const res = await fetch(`${API}/${id}`, {
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
  const res = await fetch(`${API}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar el contacto");
  return true;
}
