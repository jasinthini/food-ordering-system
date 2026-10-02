from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.cart import Cart
from app.models.food import Food
from app.schemas.order import OrderCreate

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)


VALID_STATUSES = [
    "Pending",
    "Confirmed",
    "Preparing",
    "Ready",
    "Delivered",
    "Cancelled"
]


@router.post("/")
def create_order(
    order: OrderCreate,
    db: Session = Depends(get_db)
):
    cart_items = db.query(Cart).filter(
        Cart.user_id == order.user_id
    ).all()

    if not cart_items:
        raise HTTPException(
            status_code=400,
            detail="Cart is empty"
        )

    total_amount = 0

    for item in cart_items:
        food = db.query(Food).filter(
            Food.id == item.food_id
        ).first()

        if not food:
            raise HTTPException(
                status_code=404,
                detail="Food not found"
            )

        if not food.is_available:
            raise HTTPException(
                status_code=400,
                detail=f"{food.name} is currently unavailable"
            )

        total_amount += food.price * item.quantity

    new_order = Order(
        user_id=order.user_id,
        total_amount=total_amount,
        status="Pending"
    )

    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    for item in cart_items:
        food = db.query(Food).filter(
            Food.id == item.food_id
        ).first()

        order_item = OrderItem(
            order_id=new_order.id,
            food_id=item.food_id,
            quantity=item.quantity,
            price=food.price
        )

        db.add(order_item)

    # Clear cart after successful order
    db.query(Cart).filter(
        Cart.user_id == order.user_id
    ).delete()

    db.commit()

    return {
        "message": "Order created successfully",
        "order_id": new_order.id,
        "total_amount": total_amount,
        "status": new_order.status
    }


@router.get("/{user_id}")
def get_user_orders(
    user_id: int,
    page: int = 1,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    query = db.query(Order).filter(
        Order.user_id == user_id
    )

    total = query.count()

    orders = query.offset(
        (page - 1) * limit
    ).limit(limit).all()

    return {
        "page": page,
        "limit": limit,
        "total": total,
        "orders": orders
    }


@router.get("/details/{order_id}")
def get_order_details(
    order_id: int,
    db: Session = Depends(get_db)
):
    order = db.query(Order).filter(
        Order.id == order_id
    ).first()

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    items = db.query(OrderItem).filter(
        OrderItem.order_id == order_id
    ).all()

    return {
        "order_id": order.id,
        "user_id": order.user_id,
        "total_amount": order.total_amount,
        "status": order.status,
        "items": items
    }


@router.put("/{order_id}/status")
def update_order_status(
    order_id: int,
    status: str,
    db: Session = Depends(get_db)
):
    if status not in VALID_STATUSES:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid status. Allowed statuses: {VALID_STATUSES}"
        )

    order = db.query(Order).filter(
        Order.id == order_id
    ).first()

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    order.status = status

    db.commit()
    db.refresh(order)

    return {
        "message": "Order status updated successfully",
        "order_id": order.id,
        "status": order.status
    }


@router.delete("/{order_id}")
def delete_order(
    order_id: int,
    db: Session = Depends(get_db)
):
    order = db.query(Order).filter(
        Order.id == order_id
    ).first()

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    db.query(OrderItem).filter(
        OrderItem.order_id == order_id
    ).delete()

    db.delete(order)
    db.commit()

    return {
        "message": "Order deleted successfully"
    }