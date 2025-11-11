import { useState, useEffect } from "react";
import "./App.css";
import ContactoCard from "./components/ContactoCard";
import FormularioContacto from "./components/FormularioContacto";

export default function App() {
  // 🧠 Cargar contactos desde localStorage al iniciar
  const [contactos, setContactos] = useState(() => {
    const guardados = localStorage.getItem("contactos");
    return guardados
      ? JSON.parse(guardados)
      : [
          {
            id: 1,
            nombre: "Carolina Pérez",
            telefono: "300 123 4567",
            correo: "carolina@sena.edu.co",
            etiqueta: "Compañera",
          },
        ];
  });

  // 💾 Guardar automáticamente los contactos cada vez que cambian
  useEffect(() => {
    localStorage.setItem("contactos", JSON.stringify(contactos));
  }, [contactos]);

  // ➕ Agregar contacto
  const agregarContacto = (nuevo) => {
    setContactos((prev) => [...prev, { id: Date.now(), ...nuevo }]);
  };

  // ❌ Eliminar contacto
  const eliminarContacto = (id) => {
    setContactos((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <main className="max-w-2xl mx-auto mt-10 p-4 relative">
      {/* Texto superior izquierdo */}
      <header className="fixed top-2 left-4">
        <h1 className="text-base text-black font-normal flex items-center gap-1">
          Tailwind Funciona 
          <span className="text-purple-500">💜</span>
        </h1>
      </header>

      {/* Título principal */}
      <h1 className="text-3xl font-bold text-purple-700 text-center mb-2">
        Agenda ADSO v4
      </h1>

      <p className="text-gray-500 text-center mb-6">
        Interfaz moderna con TailwindCSS
      </p>

      {/* Formulario */}
      <FormularioContacto onAgregar={agregarContacto} />

      {/* Lista de contactos */}
      <section className="mt-6 space-y-4">
        {contactos.map((c) => (
          <ContactoCard
            key={c.id}
            id={c.id}
            nombre={c.nombre}
            telefono={c.telefono}
            correo={c.correo}
            etiqueta={c.etiqueta}
            onEliminar={eliminarContacto}
          />
        ))}
      </section>
    </main>
  );
}
