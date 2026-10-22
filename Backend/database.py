from motor.motor_asyncio import AsyncIOMotorClient
from models import Inmueble, UpdateInmueble
from bson import ObjectId

cliente = AsyncIOMotorClient('mongodb://localhost')
database = cliente.inmobiliariadatabase
coleccion = database.inmuebles

async def get_one_inmueble_id(id):
    inmueble = await coleccion.find_one({'_id':ObjectId(id)})
    if inmueble:
        inmueble['_id'] = str(inmueble['_id'])
    return inmueble

async def create_inmueble(inmueble):
    new_inmueble = await coleccion.insert_one(inmueble)
    created_inmueble = await coleccion.find_one({'_id':new_inmueble.inserted_id})
    if created_inmueble:
        created_inmueble['_id'] = str(created_inmueble['_id'])
    return created_inmueble

async def get_todos_inmuebles():
    inmuebles = []
    cursor = coleccion.find({})
    async for document in cursor:
        document['_id'] = str(document['_id'])
        inmuebles.append(Inmueble(**document))
    return inmuebles

async def update_inmueble(id:str, data: UpdateInmueble):
    inmueble = data.model_dump(by_alias=True, exclude_unset=True)
    inmueble.pop('id', None)
    await coleccion.update_one({'_id': ObjectId(id)}, {'$set': inmueble})
    document = await coleccion.find_one({'_id': ObjectId(id)})

    if document: 
        document['_id'] = str(document['_id'])
    return document

async def delete_inmueble(id:str):
    await coleccion.delete_one({'_id': ObjectId(id)})
    return True

async def get_inmueble_por_direccion(direccion: str):
    inmueble = await coleccion.find_one({'direccion_propiedad': direccion})
    return inmueble