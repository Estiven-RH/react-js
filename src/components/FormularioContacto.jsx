import { useEffect, useState } from "react";

export default function FormularioContacto({
  onAgregar,
  onActualizar,
  editando,
  cancelarEdicion,
}) {
  // Estado del formulario
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    etiqueta: "",
  });

  // Estado de errores
  const [errores, setErrores] = useState({
    nombre: "",
    telefono: "",
    correo: "",
  });

  // Envío
  const [enviando, setEnviando] = useState(false);

  // Mensaje de éxito
  const [mensajeExito, setMensajeExito] = useState("");

  // Error API
  const [errorApi, setErrorApi] = useState("");

  /* ================================
     Cargar datos cuando editando cambia
     ================================ */
  useEffect(() => {
    if (editando) {
      setForm({
        nombre: editando.nombre,
        telefono: editando.telefono,
        correo: editando.correo,
        etiqueta: editando.etiqueta || "",
      });
    } else {
      // Reset si se cancela edición
      setForm({
        nombre: "",
        telefono: "",
        correo: "",
        etiqueta: "",
      });
    }
  }, [editando]);

  // Manejo de inputs
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
      nuevosErrores.telefono = "Debe tener al menos 7 dígitos.";
    }

    if (!form.correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio.";
    } else if (!form.correo.includes("@")) {
      nuevosErrores.correo = "Debe contener @.";
    }

    setErrores(nuevosErrores);
    return !nuevosErrores.nombre && !nuevosErrores.telefono && !nuevosErrores.correo;
  }

  // Submit general (crear o editar)
  const onSubmit = async (e) => {
    e.preventDefault();

    setErrorApi("");
    const valido = validarFormulario();
    if (!valido) return;

    try {
      setEnviando(true);

      if (editando) {
        // Modo edición
        await onActualizar(form);
      } else {
        // Modo creación
        await onAgregar(form);
      }

      setMensajeExito("✓ Contacto guardado correctamente");

      setTimeout(() => setMensajeExito(""), 2000);

      // Reset
      setForm({
        nombre: "",
        telefono: "",
        correo: "",
        etiqueta: "",
      });

      setErrores({ nombre: "", telefono: "", correo: "" });

      if (editando) cancelarEdicion(); // salir del modo edición

    } catch (error) {
      setErrorApi("❌ No se pudo guardar. Verifique el servidor JSON.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">

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
            className="w-full rounded-xl border-gray-300 focus:ring-purple-500"
            name="nombre"
            value={form.nombre}
            onChange={onChange}
            placeholder="Ej: Camila Pérez"
          />
          {errores.nombre && <p className="text-xs text-red-600">{errores.nombre}</p>}
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono *
          </label>
          <input
            className="w-full rounded-xl border-gray-300 focus:ring-purple-500"
            name="telefono"
            value={form.telefono}
            onChange={onChange}
            placeholder="Ej: 300 123 4567"
          />
          {errores.telefono && <p className="text-xs text-red-600">{errores.telefono}</p>}
        </div>
      </div>

      {/* Correo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Correo *
        </label>
        <input
          className="w-full rounded-xl border-gray-300 focus:ring-purple-500"
          name="correo"
          value={form.correo}
          onChange={onChange}
          placeholder="Ej: camila@sena.edu.co"
        />
        {errores.correo && <p className="text-xs text-red-600">{errores.correo}</p>}
      </div>

      {/* Etiqueta */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Etiqueta (opcional)
        </label>
        <input
          className="w-full rounded-xl border-gray-300 focus:ring-purple-500"
          name="etiqueta"
          value={form.etiqueta}
          onChange={onChange}
          placeholder="Ej: Trabajo"
        />
      </div>

      {/* Botones */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={enviando}
          className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white px-6 py-3 rounded-xl font-semibold shadow-sm"
        >
          {enviando
            ? "Guardando..."
            : editando
            ? "Guardar cambios"
            : "Agregar contacto"}
        </button>

        {editando && (
          <button
            type="button"
            onClick={cancelarEdicion}
            className="px-6 py-3 rounded-xl border bg-gray-200 hover:bg-gray-300 text-sm font-semibold"
          >
            Cancelar
          </button>
        )}
      </div>

      {errorApi && <p className="text-sm text-red-600">{errorApi}</p>}
    </form>
  );
}
