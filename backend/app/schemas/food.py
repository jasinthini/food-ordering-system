from pydantic import BaseModel, Field


class FoodCreate(BaseModel):
    name: str
    description: str | None = None
    price: float = Field(gt=0)
    image_url: str | None = None
    is_available: bool = True
    category_id: int


class FoodUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    price: float | None = Field(default=None, gt=0)
    image_url: str | None = None
    is_available: bool | None = None
    category_id: int | None = None