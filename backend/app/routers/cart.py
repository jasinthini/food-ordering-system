from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.cart import Cart
from app.models.food import Food
from app.schemas.cart import CartCreate, CartUpdate

router = APIRouter(
    prefix="/cart",
    tags=["Cart"]
)


@router.post("/")
def add_to_cart(
    cart: CartCreate,
    db: Session = Depends(get_db)
):
    food = db.query(Food).filter(
        Food.id == cart.food_id
    ).first()

    if not food:
        raise HTTPException(
            status_code=404,
            detail="Food not found"
        )

    if not food.is_available:
        raise HTTPException(
            status_code=400,
            detail="Food is currently unavailable"
        )

    existing_item = db.query(Cart).filter(
        Cart.user_id == cart.user_id,
        Cart.food_id == cart.food_id
    ).first()

    if existing_item:
        existing_item.quantity += cart.quantity

        db.commit()
        db.refresh(existing_item)

        return {
            "message": "Cart quantity updated successfully",
            "cart_id": existing_item.id,
            "quantity": existing_item.quantity
        }

    new_cart = Cart(
        user_id=cart.user_id,
        food_id=cart.food_id,
        quantity=cart.quantity
    )

    db.add(new_cart)
    db.commit()
    db.refresh(new_cart)

    return {
        "message": "Food added to cart successfully",
        "cart_id": new_cart.id,
        "quantity": new_cart.quantity
    }



@router.get("/{user_id}")
def get_cart(
    user_id: int,
    page: int = 1,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    query = db.query(Cart).filter(
        Cart.user_id == user_id
    )

    total = query.count()

    cart_items = query.offset(
        (page - 1) * limit
    ).limit(limit).all()

    return {
        "page": page,
        "limit": limit,
        "total": total,
        "cart": cart_items
    }


@router.put("/{cart_id}")
def update_cart(
    cart_id: int,
    cart_data: CartUpdate,
    db: Session = Depends(get_db)
):
    cart_item = db.query(Cart).filter(
        Cart.id == cart_id
    ).first()

    if not cart_item:
        raise HTTPException(
            status_code=404,
            detail="Cart item not found"
        )

    cart_item.quantity = cart_data.quantity

    db.commit()
    db.refresh(cart_item)

    return {
        "message": "Cart updated successfully",
        "cart_id": cart_item.id,
        "quantity": cart_item.quantity
    }


@router.delete("/{cart_id}")
def delete_cart_item(
    cart_id: int,
    db: Session = Depends(get_db)
):
    cart_item = db.query(Cart).filter(
        Cart.id == cart_id
    ).first()

    if not cart_item:
        raise HTTPException(
            status_code=404,
            detail="Cart item not found"
        )

    db.delete(cart_item)
    db.commit()

    return {
        "message": "Cart item removed successfully"
    }