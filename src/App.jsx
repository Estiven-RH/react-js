// Importamos useEffect y useState para manejar estados y efectos
import { useEffect, useState } from "react";

// Importamos los servicios que se comunican con JSON Server
import {
  listarContactos,
  crearContacto,
  eliminarContactoPorId,
  actualizarContacto,
  obtenerContactoPorId,
} from "./api";

// Importamos APP_INFO desde config.js
import { APP_INFO } from "./config";

// Componentes hijos
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

// Componente principal
function App() {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [contactoEnEdicion, setContactoEnEdicion] = useState(null);

  // Cargar contactos al iniciar
  useEffect(() => {
    const cargarContactos = async () => {
      try {
        setCargando(true);
        setError("");

        const data = await listarContactos();
        setContactos(data);
      } catch (error) {
        console.error("Error al cargar contactos:", error);
        setError(
          "No se pudieron cargar los contactos. Verifica que el servidor esté encendido e intenta de nuevo."
        );
      } finally {
        setCargando(false);
      }
    };

    cargarContactos();
  }, []);

  // Crear contacto
  const onAgregarContacto = async (nuevoContacto) => {
    try {
      setError("");
      const creado = await crearContacto(nuevoContacto);
      setContactos((prev) => [...prev, creado]);
    } catch (error) {
      console.error("Error al crear contacto:", error);
      setError(
        "No se pudo guardar el contacto. Verifica tu conexión o el estado del servidor e intenta nuevamente."
      );
      throw error;
    }
  };

  // Eliminar contacto
  const onEliminarContacto = async (id) => {
    try {
      setError("");
      await eliminarContactoPorId(id);
      setContactos((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error al eliminar contacto:", error);
      setError("No se pudo eliminar el contacto. Verifica el servidor.");
    }
  };

  // Cargar contacto para editar
  const onEditarContacto = async (id) => {
    try {
      const contacto = await obtenerContactoPorId(id);
      setContactoEnEdicion(contacto);
    } catch (error) {
      console.error("Error al obtener contacto:", error);
      setError("No se pudo cargar el contacto para editar.");
    }
  };

  // Guardar edición
  const onGuardarEdicion = async (id, datosActualizados) => {
    try {
      setError("");

      const actualizado = await actualizarContacto(id, datosActualizados);

      setContactos((prev) =>
        prev.map((c) => (c.id === id ? actualizado : c))
      );

      setContactoEnEdicion(null);
    } catch (error) {
      console.error("Error al actualizar:", error);
      setError("No se pudo actualizar el contacto.");
    }
  };

  // JSX
  return (
    <div className="min-h-screen bg-[#0f1117] text-white px-8 py-10">

      {/* HEADER */}
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl font-bold">{APP_INFO.titulo}</h1>
          <p className="text-sm opacity-70">{APP_INFO.subtitulo}</p>
        </div>

        <div className="text-right">
          <p className="text-sm opacity-70">SENA CTMA</p>
          <p className="font-semibold">Ficha {APP_INFO.ficha}</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* IZQUIERDA */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl p-10 text-[#1b1f2a] shadow-xl">

            <h1 className="text-4xl font-bold">Agenda ADSO v7</h1>
            <p className="mt-2 opacity-70">
              Gestión de contactos conectada a una API local con JSON Server, con validaciones y mejor experiencia de usuario.
            </p>

            <div className="flex items-center gap-2 mt-4">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <p className="text-sm font-medium">{contactos.length} contactos</p>
            </div>

            <div className="bg-white mt-6 p-8 rounded-2xl border border-gray-200">

              <h2 className="text-2xl font-bold mb-4">
                {contactoEnEdicion ? "Editar contacto" : "Nuevo contacto"}
              </h2>

              <FormularioContacto
                onAgregar={onAgregarContacto}
                contactoEnEdicion={contactoEnEdicion}
                onGuardarEdicion={onGuardarEdicion}
              />
            </div>

            {/* Lista contactos */}
            <div className="mt-8">
              {cargando ? (
                <p className="text-sm text-gray-600">Cargando contactos...</p>
              ) : contactos.length === 0 ? (
                <p className="text-sm text-gray-600">No hay contactos registrados.</p>
              ) : (
                <div className="space-y-4">
                  {contactos.map((c) => (
                    <ContactoCard
                      key={c.id}
                      {...c}
                      onEliminar={() => onEliminarContacto(c.id)}
                      onEditar={() => onEditarContacto(c.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* DERECHA */}
        <div className="flex flex-col gap-6">

          <div className="bg-[#9b4dff] p-8 rounded-3xl shadow-xl">
            <h2 className="text-2xl font-bold">Agenda ADSO – Dashboard</h2>
            <p className="opacity-90 mt-2">
              CRUD completo con React, JSON Server y validaciones.
            </p>

            <div className="mt-4">
              <p className="font-semibold">Contactos registrados</p>
              <p className="text-3xl font-bold">{contactos.length}</p>
            </div>
          </div>

          <div className="bg-[#f2f2f2] text-[#1b1f2a] p-7 rounded-3xl shadow-md">
            <h3 className="text-xl font-bold">Tips de código limpio</h3>
            <ul className="mt-3 space-y-1 text-sm">
              <li>• Nombra componentes según su responsabilidad.</li>
              <li>• Extrae funciones reutilizables.</li>
              <li>• Comenta la intención, no lo obvio.</li>
              <li>• Archivos pequeños y claros.</li>
            </ul>
          </div>

          <div className="bg-[#1b1f2a] p-7 rounded-3xl shadow-md">
            <h3 className="text-xl font-bold">Desarrollo Web – ReactJS</h3>
            <p className="mt-3 text-sm opacity-80">
              “Pequeños proyectos bien cuidados valen más que mil ideas sin código.”
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
