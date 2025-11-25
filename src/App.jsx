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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Encabezado con APP_INFO */}
        <header className="mb-8">
          <p className="text-xs tracking-[0.3em] text-gray-500 uppercase">
            Desarrollo Web ReactJS Ficha {APP_INFO.ficha}
          </p>

          <h1 className="text-4xl font-extrabold text-gray-900 mt-2">
            {APP_INFO.titulo}
          </h1>

          <p className="text-sm text-gray-600 mt-1">
            {APP_INFO.subtitulo}
          </p>
        </header>

        {/* Error global */}
        {error && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        )}

        {/* Si está cargando */}
        {cargando ? (
          <p className="text-sm text-gray-500">Cargando contactos...</p>
        ) : (
          <>
            {/* Formulario */}
            <FormularioContacto
              onAgregar={onAgregarContacto}
              contactoEnEdicion={contactoEnEdicion}
              onGuardarEdicion={onGuardarEdicion}
            />

            {/* Lista de contactos */}
            <section className="space-y-4">
              {contactos.length === 0 ? (
                <p className="text-sm text-gray-500">
                  Aún no tienes contactos registrados. Agrega el primero usando el formulario superior.
                </p>
              ) : (
                contactos.map((c) => (
                  <ContactoCard
                    key={c.id}
                    {...c}
                    onEliminar={() => onEliminarContacto(c.id)}
                    onEditar={() => onEditarContacto(c.id)}
                  />
                ))
              )}
            </section>
          </>
        )}

        {/* Footer */}
        <footer className="mt-8 text-xs text-gray-400">
          <p>Desarrollo Web – ReactJS | Proyecto Agenda ADSO</p>
          <p>Instructor: Gustavo Adolfo Bolaños Dorado</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
