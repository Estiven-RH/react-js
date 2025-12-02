// Archivo: src/api.js

import { API_BASE_URL } from "./config";

// ============================
// GET: Listar contactos
// ============================
export async function listarContactos() {
  try {
    const res = await fetch(`${API_BASE_URL}/contactos`);
    if (!res.ok) throw new Error("Error al listar contactos");
    return await res.json();
  } catch (error) {
    console.error("Error en listarContactos:", error);
    throw error;
  }
}

// ============================
// GET: Obtener contacto por ID
// ============================
export async function obtenerContactoPorId(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/contactos/${id}`);
    if (!res.ok) throw new Error("Error al obtener el contacto");
    return await res.json();
  } catch (error) {
    console.error("Error en obtenerContactoPorId:", error);
    throw error;
  }
}

// ============================
// POST: Crear contacto
// ============================
export async function crearContacto(data) {
  try {
    const res = await fetch(`${API_BASE_URL}/contactos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Error al crear contacto");
    return await res.json();
  } catch (error) {
    console.error("Error en crearContacto:", error);
    throw error;
  }
}

// ============================
// PUT: Actualizar contacto
// ============================
export async function actualizarContacto(id, data) {
  try {
    const res = await fetch(`${API_BASE_URL}/contactos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Error al actualizar contacto");
    return await res.json();
  } catch (error) {
    console.error("Error en actualizarContacto:", error);
    throw error;
  }
}

// ============================
// DELETE: Eliminar contacto
// ============================
export async function eliminarContactoPorId(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/contactos/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Error al eliminar contacto");
    return true;
  } catch (error) {
    console.error("Error en eliminarContactoPorId:", error);
    throw error;
  }
}
