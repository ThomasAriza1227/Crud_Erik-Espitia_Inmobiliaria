import { useNavigate } from 'react-router-dom';
import { updateInmuebleRequest, deleteInmuebleRequest } from '../api/entidades';

function TaskCard({ inmueble, loadInmuebles }) {
  const navigate = useNavigate();
  const inmuebleId = inmueble.id || inmueble._id;

  const handleToggleDisponible = async () => {
    await updateInmuebleRequest(inmuebleId, {
      ...inmueble,
      disponible: !inmueble.disponible,
    });
    loadInmuebles();
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm('¿Deseas eliminar este inmueble?')) {
      await deleteInmuebleRequest(inmuebleId);
      loadInmuebles();
    }
  };

  return (
    <div
      onClick={() => navigate(`/inmuebles/${inmuebleId}`)}
      className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl text-white shadow-xl cursor-pointer hover:border-zinc-700 transition-all flex flex-col justify-between"
    >
      <div>
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-lg text-zinc-100 tracking-wide">
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
              <svg className="w-6 h-6 text-emerald-400 fill-current" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-rose-500 fill-current" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 101.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
        <p className="text-zinc-400 text-sm mb-1">
          Tipo: <span className="text-zinc-200 font-medium">{inmueble.tipo_inmueble}</span>
        </p>
        <p className="text-zinc-400 text-sm mb-4">
          Precio: <span className="text-emerald-400 font-bold text-base">${inmueble.precio_arriendo?.toLocaleString()}</span>
        </p>
        <span
          className={`inline-block px-3 py-1 text-xs font-semibold rounded-md border ${
            inmueble.disponible
              ? 'bg-emerald-950/60 border-emerald-800 text-emerald-400'
              : 'bg-rose-950/60 border-rose-800 text-rose-400'
          }`}
        >
          {inmueble.disponible ? 'Disponible' : 'No Disponible'}
        </span>
      </div>
      <div className="mt-5 flex justify-end">
        <button
          onClick={handleDelete}
          className="bg-zinc-800 hover:bg-rose-900 hover:text-rose-200 text-zinc-400 text-xs px-3 py-1.5 rounded-lg border border-zinc-700 transition-colors"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default TaskCard;