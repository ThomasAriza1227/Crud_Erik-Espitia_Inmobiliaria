import { useEffect, useState } from 'react';
import { getInmueblesRequest } from '../api/entidades';
import TaskList from '../components/TaskList';

function Homepage() {
  const [inmuebles, setInmuebles] = useState([]);

  const loadInmuebles = async () => {
    try {
      const res = await getInmueblesRequest();
      setInmuebles(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadInmuebles();
  }, []);

  return (
    <div className="mt-6">
      <h1 className="text-3xl font-bold text-white mb-6">Catálogo de Inmuebles</h1>
      <TaskList inmuebles={inmuebles} loadInmuebles={loadInmuebles} />
    </div>
  );
}

export default Homepage;