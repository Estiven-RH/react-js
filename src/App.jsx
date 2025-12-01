import { useEffect, useState } from "react";
import {
  listarContactos,
  crearContacto,
  eliminarContactoPorId,
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

  useEffect(() => {
    const cargarContactos = async () => {
      try {
        setCargando(true);
        const data = await listarContactos();
        setContactos(data);
      } catch (error) {
        setError("Error cargando contactos. Verifique el servidor.");
      } finally {
        setCargando(false);
      }
    };

    cargarContactos();
  }, []);

  const onAgregarContacto = async (nuevo) => {
    try {
      setError("");
      const creado = await crearContacto(nuevo);
      setContactos((p) => [...p, creado]);
    } catch (error) {
      setError("No se pudo guardar el contacto.");
      throw error;
    }
  };

  const onEliminarContacto = async (id) => {
    try {
      setError("");
      await eliminarContactoPorId(id);
      setContactos((p) => p.filter((c) => c.id !== id));
    } catch {
      setError("No se pudo eliminar el contacto.");
    }
  };

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

  return (
    <div className="min-h-screen bg-[#0f0f16] text-white px-4 py-6">

      {/* Título global */}
      <header className="max-w-6xl mx-auto mb-10">
        <h1 className="text-4xl font-bold">{APP_INFO.titulo}</h1>
        <p className="text-gray-300 text-sm mt-1">{APP_INFO.subtitulo}</p>
      </header>

      {/* Layout principal: 2 columnas */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Panel izquierdo (2 columnas) */}
        <div className="lg:col-span-2">

          {/* Cantidad de contactos */}
          <div className="flex items-center gap-2 mb-3">
            <span className="h-3 w-3 rounded-full bg-green-500"></span>
            <p className="text-sm text-gray-300">
              {contactos.length} contactos
            </p>
          </div>

          {/* Caja blanca grande */}
          <div className="bg-white text-black rounded-3xl p-8 shadow-xl">

            {/* FORMULARIO */}
            <h2 className="text-2xl font-bold mb-4">Nuevo contacto</h2>
            <FormularioContacto onAgregar={onAgregarContacto} />

            {/* BUSCADOR */}
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
                onClick={() => setOrdenAsc((p) => !p)}
              >
                {ordenAsc ? "Ordenar Z-A" : "Ordenar A-Z"}
              </button>
            </div>

            {/* LISTA DE CONTACTOS */}
            {error && (
              <p className="text-red-600 text-sm mb-4">{error}</p>
            )}

            <section className="space-y-4">
              {cargando ? (
                <p className="text-gray-500 text-sm">
                  Cargando contactos...
                </p>
              ) : contactosOrdenados.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  No hay contactos que coincidan con la búsqueda.
                </p>
              ) : (
                contactosOrdenados.map((c) => (
                  <ContactoCard
                    key={c.id}
                    nombre={c.nombre}
                    telefono={c.telefono}
                    correo={c.correo}
                    etiqueta={c.etiqueta}
                    onEliminar={() => onEliminarContacto(c.id)}
                  />
                ))
              )}
            </section>
          </div>
        </div>

        {/* PANEL DERECHO - DASHBOARD */}
        <aside className="space-y-6">
          <div className="bg-purple-600 text-white rounded-3xl p-6 shadow-lg">
            <h3 className="text-xl font-bold">
              Agenda ADSO – Dashboard
            </h3>
            <p className="text-sm text-purple-100 mt-1">
              CRUD completo con React, JSON Server y validaciones.
            </p>

            <p className="mt-4 text-sm font-semibold">
              Contactos registrados
            </p>
            <p className="text-4xl font-extrabold mt-1">
              {contactos.length}
            </p>
          </div>

          {/* TIPS */}
          <div className="bg-white text-black rounded-3xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-2">Tips de código limpio</h3>
            <ul className="text-sm space-y-1">
              <li>• Nombra componentes según su responsabilidad.</li>
              <li>• Extrae funciones reutilizables.</li>
              <li>• Comenta la intención, no lo obvio.</li>
              <li>• Archivos pequeños y claros.</li>
            </ul>
          </div>

          {/* Footer pequeño */}
          <div className="bg-gray-900 rounded-3xl p-6 text-center text-xs text-gray-400">
            <p>Desarrollo Web – ReactJS</p>
            <p>SENA CTMA</p>
            <p>Ficha {APP_INFO.ficha}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default App;
