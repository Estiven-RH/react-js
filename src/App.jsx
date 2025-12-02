import { useEffect, useState } from "react";
import {
  listarContactos,
  crearContacto,
  eliminarContactoPorId,
  actualizarContacto,
} from "./api";

import { APP_INFO } from "./config";
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

function App() {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const [busqueda, setBusqueda] = useState("");
  const [ordenAsc, setOrdenAsc] = useState(true);

  // Contacto seleccionado para editar
  const [editando, setEditando] = useState(null);

  /* ===========================
      Cargar contactos al iniciar
     =========================== */
  useEffect(() => {
    const cargar = async () => {
      try {
        setCargando(true);
        const data = await listarContactos();
        setContactos(data);
      } catch {
        setError("Error cargando contactos. Verifique JSON Server (puerto 3001).");
      } finally {
        setCargando(false);
      }
    };

    cargar();
  }, []);

  /* ===========================
      CREAR NUEVO CONTACTO
     =========================== */
  const onAgregarContacto = async (nuevo) => {
    try {
      setError("");
      const creado = await crearContacto(nuevo);
      setContactos((prev) => [...prev, creado]);
    } catch {
      setError("No se pudo guardar el contacto.");
    }
  };

  /* ===========================
      GUARDAR EDICIÓN
     =========================== */
  const onGuardarEdicion = async (dataActualizada) => {
    try {
      setError("");
      const actualizado = await actualizarContacto(editando.id, dataActualizada);

      setContactos((prev) =>
        prev.map((c) => (c.id === editando.id ? actualizado : c))
      );

      setEditando(null);
    } catch {
      setError("No se pudo actualizar el contacto.");
    }
  };

  /* ===========================
      ELIMINAR CONTACTO
     =========================== */
  const onEliminarContacto = async (id) => {
    try {
      setError("");
      await eliminarContactoPorId(id);
      setContactos((prev) => prev.filter((c) => c.id !== id));
    } catch {
      setError("No se pudo eliminar el contacto.");
    }
  };

  /* ===========================
      BUSCAR Y ORDENAR
     =========================== */
  const contactosFiltrados = contactos.filter((c) => {
    const t = busqueda.toLowerCase();
    return (
      c.nombre.toLowerCase().includes(t) ||
      c.correo.toLowerCase().includes(t) ||
      (c.etiqueta || "").toLowerCase().includes(t)
    );
  });

  const contactosOrdenados = [...contactosFiltrados].sort((a, b) => {
    const A = a.nombre.toLowerCase();
    const B = b.nombre.toLowerCase();
    if (A < B) return ordenAsc ? -1 : 1;
    if (A > B) return ordenAsc ? 1 : -1;
    return 0;
  });

  /* ===========================
      RENDER
     =========================== */
  return (
    <div className="min-h-screen bg-[#0f0f16] text-white px-4 py-6">
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-10">
        <h1 className="text-4xl font-bold">{APP_INFO.titulo}</h1>
        <p className="text-gray-300 text-sm mt-1">{APP_INFO.subtitulo}</p>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna principal */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-3 w-3 rounded-full bg-green-500"></span>
            <p className="text-sm text-gray-300">{contactos.length} contactos</p>
          </div>

          <div className="bg-white text-black rounded-3xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold mb-4">
              {editando ? "Editar contacto" : "Nuevo contacto"}
            </h2>

            <FormularioContacto
              onAgregar={onAgregarContacto}
              onActualizar={onGuardarEdicion}
              editando={editando}
              cancelarEdicion={() => setEditando(null)}
            />

            {/* Buscador */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 my-6">
              <input
                type="text"
                className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-sm"
                placeholder="Buscar contacto..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />

              <button
                className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-xl border hover:bg-gray-200"
                onClick={() => setOrdenAsc((prev) => !prev)}
              >
                {ordenAsc ? "Ordenar Z-A" : "Ordenar A-Z"}
              </button>
            </div>

            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

            {/* Lista */}
            <section className="space-y-4">
              {cargando ? (
                <p className="text-gray-500 text-sm">Cargando contactos...</p>
              ) : contactosOrdenados.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  No hay contactos que coincidan con la búsqueda.
                </p>
              ) : (
                contactosOrdenados.map((c) => (
                  <ContactoCard
                    key={c.id}
                    {...c}
                    onEliminar={() => onEliminarContacto(c.id)}
                    onEditar={() => setEditando(c)}
                  />
                ))
              )}
            </section>
          </div>
        </div>

        {/* Panel lateral */}
        <aside className="space-y-6">
          <div className="bg-purple-600 text-white rounded-3xl p-6 shadow-lg">
            <h3 className="text-xl font-bold">Agenda ADSO – Dashboard</h3>
            <p className="text-sm text-purple-100 mt-1">
              CRUD completo con React + JSON Server.
            </p>

            <p className="mt-4 text-sm font-semibold">Contactos registrados</p>
            <p className="text-4xl font-extrabold mt-1">{contactos.length}</p>
          </div>

          <div className="bg-white text-black rounded-3xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-2">Tips de código limpio</h3>
            <ul className="text-sm space-y-1">
              <li>• Componentes pequeños y claros.</li>
              <li>• Extrae funciones repetidas.</li>
              <li>• Evita lógica mezclada en el render.</li>
              <li>• Usa nombres descriptivos.</li>
            </ul>
          </div>

          <div className="bg-gray-900 rounded-3xl p-6 text-center text-xs text-gray-400">
            <p>Desarrollo Web – React</p>
            <p>SENA CTMA</p>
            <p>Ficha {APP_INFO.ficha}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default App;
