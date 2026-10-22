from fastapi import APIRouter, HTTPException
from models import Inmueble, UpdateInmueble
from database import (
    get_todos_inmuebles,
    get_one_inmueble_id,
    create_inmueble,
    update_inmueble,
    delete_inmueble,
    get_inmueble_por_direccion
)

inmueble_router = APIRouter(prefix="/api/inmuebles", tags=["Inmuebles"])

@inmueble_router.get("/")
async def obtener_inmuebles():
    inmuebles = await get_todos_inmuebles()
    return inmuebles

@inmueble_router.get("/{id}")
async def obtener_inmueble(id: str):
    inmueble = await get_one_inmueble_id(id)
    if not inmueble:
        raise HTTPException(status_code=404, detail="Inmueble no encontrado")
    return inmueble

@inmueble_router.post("/")
async def crear_inmueble(inmueble: Inmueble):
    existe = await get_inmueble_por_direccion(inmueble.direccion_propiedad)
    if existe:
        raise HTTPException(status_code=400, detail="Ya existe un inmueble con esta dirección")
    
    response = await create_inmueble(inmueble.model_dump(by_alias=True, exclude=["id"]))
    if response:
        return response
    raise HTTPException(status_code=400, detail="Error al crear el inmueble")

@inmueble_router.put("/{id}")
async def actualizar_inmueble(id: str, data: UpdateInmueble):
    response = await update_inmueble(id, data)
    if response:
        return response
    raise HTTPException(status_code=404, detail="Inmueble no encontrado")

@inmueble_router.delete("/{id}")
async def eliminar_inmueble(id: str):
    response = await delete_inmueble(id)
    if response:
        return "Inmueble eliminado exitosamente"
    raise HTTPException(status_code=404, detail="Inmueble no encontrado")