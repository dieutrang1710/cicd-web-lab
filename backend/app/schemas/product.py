from pydantic import BaseModel, ConfigDict


class ProductResponse(BaseModel):
    id: int
    name: str
    author: str
    price: int
    icon: str

    model_config = ConfigDict(from_attributes=True)
