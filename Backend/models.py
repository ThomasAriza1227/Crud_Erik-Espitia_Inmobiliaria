from pydantic import BaseModel, Field, BeforeValidator
from typing import Optional, Annotated

PyObjectId = Annotated[str, BeforeValidator(lambda v: str(v) if v is not None else v)]

class Inmueble(BaseModel):
    id: Optional[PyObjectId] = Field(default=None, alias='_id')
    direccion_propiedad: str 
    tipo_inmueble: str
    precio_arriendo: int
    disponible: bool = True

    model_config = {
        "from_attributes": True,
        "populate_by_name": True,
        "json_encoders": {object: str}
    }

class UpdateInmueble(BaseModel):
    direccion_propiedad: Optional[str] = None
    tipo_inmueble: Optional[str] = None
    precio_arriendo: Optional[int] = None
    disponible: Optional[bool] = None
    
    model_config = {
        "from_attributes": True,
        "populate_by_name": True,
        "json_encoders": {object: str}
    }