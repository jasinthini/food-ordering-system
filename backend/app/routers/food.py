from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.food import Food
from app.schemas.food import FoodCreate, FoodUpdate

router = APIRouter(
    prefix="/foods",
    tags=["Foods"]
)


@router.post("/")
def create_food(
    food: FoodCreate,
    db: Session = Depends(get_db)
):
    new_food = Food(
        name=food.name,
        description=food.description,
        price=food.price,
        image_url=food.image_url,
        is_available=food.is_available,
        category_id=food.category_id
    )

    db.add(new_food)
    db.commit()
    db.refresh(new_food)

    return {
        "message": "Food created successfully",
        "food_id": new_food.id
    }


@router.get("/")
def get_foods(
    search: str | None = None,
    category_id: int | None = None,
    is_available: bool | None = None,
    sort_by: str = "name",
    sort_order: str = "asc",
    page: int = 1,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    if page < 1:
        raise HTTPException(
            status_code=400,
            detail="Page must be greater than 0"
        )

    if limit < 1:
        raise HTTPException(
            status_code=400,
            detail="Limit must be greater than 0"
        )

    query = db.query(Food)

    if search:
        query = query.filter(
            Food.name.ilike(f"%{search}%")
        )

    if category_id:
        query = query.filter(
            Food.category_id == category_id
        )

    if is_available is not None:
        query = query.filter(
            Food.is_available == is_available
        )

    if sort_by == "price":
        sort_column = Food.price
    else:
        sort_column = Food.name

    if sort_order.lower() == "desc":
        query = query.order_by(
            sort_column.desc()
        )
    else:
        query = query.order_by(
            sort_column.asc()
        )

    total = query.count()

    foods = query.offset(
        (page - 1) * limit
    ).limit(limit).all()

    return {
        "page": page,
        "limit": limit,
        "total": total,
        "sort_by": sort_by,
        "sort_order": sort_order,
        "foods": foods
    }


@router.put("/{food_id}")
def update_food(
    food_id: int,
    food_data: FoodUpdate,
    db: Session = Depends(get_db)
):
    food = db.query(Food).filter(
        Food.id == food_id
    ).first()

    if not food:
        raise HTTPException(
            status_code=404,
            detail="Food not found"
        )

    if food_data.name is not None:
        food.name = food_data.name

    if food_data.description is not None:
        food.description = food_data.description

    if food_data.price is not None:
        food.price = food_data.price

    if food_data.image_url is not None:
        food.image_url = food_data.image_url

    if food_data.is_available is not None:
        food.is_available = food_data.is_available

    if food_data.category_id is not None:
        food.category_id = food_data.category_id

    db.commit()
    db.refresh(food)

    return {
        "message": "Food updated successfully",
        "food_id": food.id
    }


@router.delete("/{food_id}")
def delete_food(
    food_id: int,
    db: Session = Depends(get_db)
):
    food = db.query(Food).filter(
        Food.id == food_id
    ).first()

    if not food:
        raise HTTPException(
            status_code=404,
            detail="Food not found"
        )

    db.delete(food)
    db.commit()

    return {
        "message": "Food deleted successfully"
    }