// Archivo: src/config.js
// Configuración centralizada de la Agenda ADSO

// =============================================
// URL base del backend (JSON Server)
// Nunca incluir /contactos aquí, solo la URL base.
// =============================================
export const API_BASE_URL = "http://localhost:3001";  
// En producción Netlify usará otra URL (te la configuro después)

// =============================================
// Información general de la aplicación
// =============================================
export const APP_INFO = {
  ficha: "3223876",
  titulo: "Agenda ADSO v10",
  subtitulo:
    "Gestión de contactos conectada a una API con JSON Server, con validaciones y mejor experiencia de usuario.",
};
