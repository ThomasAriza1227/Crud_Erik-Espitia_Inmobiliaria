import { useNavigate } from 'react-router-dom';
import { updateInmuebleRequest, deleteInmuebleRequest } from '../api/entidades';

function TaskCard({ inmueble, loadInmuebles }) {
  const navigate = useNavigate();

  const handleToggleDisponible = async () => {
    await updateInmuebleRequest(inmueble.id, {
      ...inmueble,
      disponible: !inmueble.disponible,
    });
    loadInmuebles();
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm('¿Deseas eliminar este inmueble?')) {
      await deleteInmuebleRequest(inmueble.id);
      loadInmuebles();
    }
  };

  return (
    <div
      onClick={() => navigate(`/inmuebles/${inmueble.id}`)}
      className="bg-white border border-gray-200 p-5 rounded-lg text-gray-900 shadow-lg cursor-pointer hover:bg-slate-700 transition-all flex flex-col justify-between"
    >
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-xl text-indigo-400">
            {inmueble.direccion_propiedad}
          </h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleDisponible();
            }}
            title="Cambiar disponibilidad"
            className="p-1 rounded transition-colors"
          >
            {inmueble.disponible ? (
              <svg className="w-6 h-6 text-green-500 fill-current" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-red-500 fill-current" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
        <p className="text-gray-600 font-medium">
          Tipo: <span className="text-gray-100">{inmueble.tipo_inmueble}</span>
        </p>
        <p className="text-gray-600 font-medium">
          Precio: <span className="text-green-400 font-bold">${inmueble.precio_arriendo?.toLocaleString()}</span>
        </p>
        <span
          className={`inline-block mt-3 px-3 py-1 text-xs font-bold rounded-full ${
            inmueble.disponible
              ? 'bg-green-900 text-green-300'
              : 'bg-red-900 text-red-300'
          }`}
        >
          {inmueble.disponible ? 'Disponible' : 'No Disponible'}
        </span>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded transition-colors"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default TaskCard;