import axios from 'axios';

const API = 'http://localhost:8000/api/inmuebles';

export const getInmueblesRequest = async () => 
    await axios.get(API);

export const getInmuebleRequest = async (id) => 
    await axios.get(`${API}/${id}`);

export const createInmuebleRequest = async (inmueble) => 
    await axios.post(API, inmueble);

export const updateInmuebleRequest = async (id, inmueble) => 
    await axios.put(`${API}/${id}`, inmueble);

export const deleteInmuebleRequest = async (id) => 
    await axios.delete(`${API}/${id}`);