import TaskCard from './TaskCard';

function TaskList({ inmuebles, loadInmuebles }) {
  if (inmuebles.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl text-gray-400">No hay inmuebles registrados aún.</h2>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {inmuebles.map((inmueble) => (
        <TaskCard
          key={inmueble.id}
          inmueble={inmueble}
          loadInmuebles={loadInmuebles}
        />
      ))}
    </div>
  );
}

export default TaskList;