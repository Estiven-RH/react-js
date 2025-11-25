import { useState } from "react";

export default function FormularioContacto({ onAgregar }) {
  // Estado del formulario
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    etiqueta: "",
  });

  // Estado de errores (por campo)
  const [errores, setErrores] = useState({
    nombre: "",
    telefono: "",
    correo: "",
  });

  // Estado de envío
  const [enviando, setEnviando] = useState(false);

  // Error global de API
  const [errorApi, setErrorApi] = useState("");

  // onChange genérico
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Función de validación con .trim()
  function validarFormulario() {
    const nuevosErrores = { nombre: "", telefono: "", correo: "" };

    if (!form.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    }

    if (!form.telefono.trim()) {
      nuevosErrores.telefono = "El teléfono es obligatorio.";
    }

    if (!form.correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio.";
    } else if (!form.correo.includes("@")) {
      nuevosErrores.correo = "El correo debe contener @.";
    }

    setErrores(nuevosErrores);

    const valido =
      !nuevosErrores.nombre &&
      !nuevosErrores.telefono &&
      !nuevosErrores.correo;

    return valido;
  }

  // onSubmit async
  const onSubmit = async (e) => {
    e.preventDefault();

    setErrorApi(""); // limpiar error

    const valido = validarFormulario();
    if (!valido) return;

    try {
      setEnviando(true);

      await onAgregar(form);

      // Reiniciar formulario y errores
      setForm({ nombre: "", telefono: "", correo: "", etiqueta: "" });
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre *
          </label>
          <input
            className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
            name="nombre"
            placeholder="Ej: Camila Pérez"
            value={form.nombre}
            onChange={onChange}
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
            placeholder="Ej: 300 123 4567"
            value={form.telefono}
            onChange={onChange}
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
          placeholder="Ej: camila@sena.edu.co"
          value={form.correo}
          onChange={onChange}
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
          placeholder="Ej: Trabajo"
          value={form.etiqueta}
          onChange={onChange}
        />
      </div>

      {/* Botón */}
      <button
        type="submit"
        disabled={enviando}
        className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold shadow-sm"
      >
        {enviando ? "Guardando..." : "Agregar contacto"}
      </button>

      {/* Error de API */}
      {errorApi && (
        <p className="text-sm text-red-600 font-medium mt-2">{errorApi}</p>
      )}
    </form>
  );
}
