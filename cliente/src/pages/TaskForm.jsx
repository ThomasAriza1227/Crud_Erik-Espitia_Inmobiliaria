import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {createInmuebleRequest, getInmuebleRequest, updateInmuebleRequest, deleteInmuebleRequest} from '../api/entidades';

function TaskForm() {
  const [inmueble, setInmueble] = useState({
    direccion_propiedad: '',
    tipo_inmueble: '',
    precio_arriendo: '',
    disponible: true
  });
  const [error, setError] = useState('');

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.id) {
      getInmuebleRequest(params.id)
        .then((res) => {
          setInmueble({
            direccion_propiedad: res.data.direccion_propiedad,
            tipo_inmueble: res.data.tipo_inmueble,
            precio_arriendo: res.data.precio_arriendo,
            disponible: res.data.disponible
          });
        })
        .catch((err) => console.error(err));
    }
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const dataToSend = {
      ...inmueble,
      precio_arriendo: Number(inmueble.precio_arriendo)
    };

    try {
      if (params.id) {
        await updateInmuebleRequest(params.id, dataToSend);
      } else {
        await createInmuebleRequest(dataToSend);
      }
      navigate('/');
    } catch (err) {
      if (err.response && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError('Ocurrió un error al guardar');
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm('¿Seguro que deseas eliminar este inmueble?')) {
      await deleteInmuebleRequest(params.id);
      navigate('/');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 border border-zinc-800 p-8 max-w-md w-full rounded-xl shadow-2xl"
      >
        <h2 className="text-xl font-bold text-zinc-100 mb-6">
          {params.id ? 'Editar Inmueble' : 'Crear Inmueble'}
        </h2>

        {error && (
          <div className="bg-rose-950/80 border border-rose-800 text-rose-300 p-3 rounded-lg mb-5 text-sm font-medium">
            {error}
          </div>
        )}

        <label className="block text-xs font-semibold text-zinc-400 mb-1 tracking-wider uppercase">
          Dirección de la propiedad
        </label>
        <input
          type="text"
          placeholder="Ej: Calle 10 # 4-20"
          value={inmueble.direccion_propiedad}
          onChange={(e) =>
            setInmueble({ ...inmueble, direccion_propiedad: e.target.value })
          }
          className="bg-zinc-950 text-zinc-100 p-2.5 rounded-lg w-full mb-4 border border-zinc-800 focus:outline-none focus:border-emerald-500 text-sm"
          required
        />

        <label className="block text-xs font-semibold text-zinc-400 mb-1 tracking-wider uppercase">
          Tipo de inmueble
        </label>
        <input
          type="text"
          placeholder="Ej: Apartamento, Casa, Local"
          value={inmueble.tipo_inmueble}
          onChange={(e) =>
            setInmueble({ ...inmueble, tipo_inmueble: e.target.value })
          }
          className="bg-zinc-950 text-zinc-100 p-2.5 rounded-lg w-full mb-4 border border-zinc-800 focus:outline-none focus:border-emerald-500 text-sm"
          required
        />

        <label className="block text-xs font-semibold text-zinc-400 mb-1 tracking-wider uppercase">
          Precio de arriendo
        </label>
        <input
          type="number"
          placeholder="Ej: 1200000"
          value={inmueble.precio_arriendo}
          onChange={(e) =>
            setInmueble({ ...inmueble, precio_arriendo: e.target.value })
          }
          className="bg-zinc-950 text-zinc-100 p-2.5 rounded-lg w-full mb-4 border border-zinc-800 focus:outline-none focus:border-emerald-500 text-sm"
          required
        />

        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="disponible"
            checked={inmueble.disponible}
            onChange={(e) =>
              setInmueble({ ...inmueble, disponible: e.target.checked })
            }
            className="w-4 h-4 text-emerald-500 bg-zinc-950 border-zinc-800 rounded focus:ring-emerald-500"
          />
          <label htmlFor="disponible" className="ml-2 text-sm text-zinc-300">
            Disponible para arriendo
          </label>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm py-2.5 px-4 rounded-lg w-full transition-all"
          >
            {params.id ? 'Actualizar' : 'Guardar'}
          </button>

          {params.id && (
            <button
              type="button"
              onClick={handleDelete}
              className="bg-zinc-800 hover:bg-rose-900 text-zinc-300 hover:text-white border border-zinc-700 font-medium text-sm py-2.5 px-4 rounded-lg w-full transition-all"
            >
              Eliminar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TaskForm;  