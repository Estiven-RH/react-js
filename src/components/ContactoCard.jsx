export default function ContactoCard({
  id,
  nombre,
  telefono,
  correo,
  etiqueta,
  onEliminar,
}) {
  return (
    <article className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
      <h3 className="text-lg font-semibold text-gray-900">{nombre}</h3>
      <div className="mt-2 space-y-1 text-sm text-gray-700">
        <p>📞 {telefono}</p>
        <p>✉️ {correo}</p>
        {etiqueta && (
          <span className="inline-block text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
            {etiqueta}
          </span>
        )}
      </div>
      <button
        onClick={() => onEliminar(id)}
        className="mt-3 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1.5 rounded-lg transition"
      >
        Eliminar
      </button>
    </article>
  );
}


