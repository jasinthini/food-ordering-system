from pydantic import BaseModel, Field


class CartCreate(BaseModel):
    user_id: int
    food_id: int
    quantity: int = Field(gt=0)


class CartUpdate(BaseModel):
    quantity: int = Field(gt=0)