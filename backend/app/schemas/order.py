from pydantic import BaseModel, Field


class OrderCreate(BaseModel):
    user_id: int = Field(gt=0)