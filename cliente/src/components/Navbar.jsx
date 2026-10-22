import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-zinc-900 border border-zinc-800 text-white px-8 py-4 flex justify-between items-center my-4 rounded-xl shadow-lg">
      <Link to="/">
        <h1 className="text-2xl font-bold tracking-wide text-zinc-100">Inmobiliaria</h1>
      </Link>
      <Link
        to="/inmuebles/new"
        className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all shadow"
      >
        + Agregar Inmueble
      </Link>
    </nav>
  );
}

export default Navbar;