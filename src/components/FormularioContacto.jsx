import { useState } from "react";

export default function FormularioContacto({
  onAgregar,
  contactoEnEdicion,
  onGuardarEdicion,
}) {
  // Estado del formulario
  const [form, setForm] = useState({
    nombre: contactoEnEdicion?.nombre || "",
    telefono: contactoEnEdicion?.telefono || "",
    correo: contactoEnEdicion?.correo || "",
    etiqueta: contactoEnEdicion?.etiqueta || "",
  });

  // Estado de errores
  const [errores, setErrores] = useState({
    nombre: "",
    telefono: "",
    correo: "",
  });

  // Estado envío
  const [enviando, setEnviando] = useState(false);

  // Mensaje éxito
  const [mensajeExito, setMensajeExito] = useState("");

  // Error API
  const [errorApi, setErrorApi] = useState("");

  // Cambio de inputs
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validaciones
  function validarFormulario() {
    const nuevosErrores = { nombre: "", telefono: "", correo: "" };

    if (!form.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    }

    if (!form.telefono.trim()) {
      nuevosErrores.telefono = "El teléfono es obligatorio.";
    } else if (form.telefono.trim().length < 7) {
      nuevosErrores.telefono = "El teléfono debe tener al menos 7 dígitos.";
    }

    if (!form.correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio.";
    } else if (!form.correo.includes("@")) {
      nuevosErrores.correo = "El correo debe contener @.";
    }

    setErrores(nuevosErrores);

    return (
      !nuevosErrores.nombre &&
      !nuevosErrores.telefono &&
      !nuevosErrores.correo
    );
  }

  // Submit
  const onSubmit = async (e) => {
    e.preventDefault();

    setErrorApi("");
    const valido = validarFormulario();
    if (!valido) return;

    try {
      setEnviando(true);

      if (contactoEnEdicion) {
        await onGuardarEdicion(contactoEnEdicion.id, form);
      } else {
        await onAgregar(form);
      }

      // Mostrar mensaje de éxito
      setMensajeExito("✓ Contacto guardado correctamente");

      // Ocultar después de 2 segundos
      setTimeout(() => setMensajeExito(""), 2000);

      // Resetear
      setForm({
        nombre: "",
        telefono: "",
        correo: "",
        etiqueta: "",
      });

      setErrores({ nombre: "", telefono: "", correo: "" });
    } catch (error) {
      setErrorApi(
        "❌ No se pudo guardar el contacto. Revisa si el servidor JSON está activo."
      );
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Mensaje de éxito */}
      {mensajeExito && (
        <p className="text-green-600 font-semibold bg-green-100 border border-green-300 rounded-xl px-4 py-2">
          {mensajeExito}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre *
          </label>
          <input
            className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
            name="nombre"
            value={form.nombre}
            onChange={onChange}
            placeholder="Ej: Camila Pérez"
          />
          {errores.nombre && (
            <p className="text-xs text-red-600 mt-1">{errores.nombre}</p>
          )}
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono *
          </label>
          <input
            className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
            name="telefono"
            value={form.telefono}
            onChange={onChange}
            placeholder="Ej: 300 123 4567"
          />
          {errores.telefono && (
            <p className="text-xs text-red-600 mt-1">{errores.telefono}</p>
          )}
        </div>
      </div>

      {/* Correo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Correo *
        </label>
        <input
          className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          name="correo"
          value={form.correo}
          onChange={onChange}
          placeholder="Ej: camila@sena.edu.co"
        />
        {errores.correo && (
          <p className="text-xs text-red-600 mt-1">{errores.correo}</p>
        )}
      </div>

      {/* Etiqueta */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Etiqueta (opcional)
        </label>
        <input
          className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          name="etiqueta"
          value={form.etiqueta}
          onChange={onChange}
          placeholder="Ej: Trabajo"
        />
      </div>

      {/* Botón */}
      <button
        type="submit"
        disabled={enviando}
        className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white px-6 py-3 rounded-xl font-semibold shadow-sm"
      >
        {enviando
          ? "Guardando..."
          : contactoEnEdicion
          ? "Guardar cambios"
          : "Agregar contacto"}
      </button>

      {/* Error API */}
      {errorApi && (
        <p className="text-sm text-red-600 font-medium mt-2">{errorApi}</p>
      )}
    </form>
  );
}
