// Archivo: src/config.js
// Este archivo centraliza configuraciones reutilizables de la Agenda ADSO.

// =============================================
// URL base del backend (JSON Server)
// Si cambia el puerto o la ruta, solo se modifica aquí.
// =============================================
export const API_BASE_URL = "http://localhost:3002/contactos";

// =============================================
// Información general de la aplicación
// Usada en App.jsx u otros componentes
// =============================================
export const APP_INFO = {
  // Número de ficha que se muestra en el encabezado
  ficha: "3223876",

  // Título principal de la aplicación
  titulo: "Agenda ADSO v7",

  // Subtítulo o descripción corta
  subtitulo:
    "Gestión de contactos conectada a una API local con JSON Server, con validaciones y mejor experiencia de usuario.",
};
