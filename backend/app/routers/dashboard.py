from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app.models.user import User
from app.models.food import Food
from app.models.category import Category
from app.models.order import Order

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/summary")
def dashboard_summary(
    db: Session = Depends(get_db)
):
    total_users = db.query(User).count()
    total_foods = db.query(Food).count()
    total_categories = db.query(Category).count()
    total_orders = db.query(Order).count()

    return {
        "total_users": total_users,
        "total_foods": total_foods,
        "total_categories": total_categories,
        "total_orders": total_orders
    }


@router.get("/revenue")
def revenue_summary(
    db: Session = Depends(get_db)
):
    result = db.query(
        func.sum(Order.total_amount)
    ).scalar()

    total_revenue = result or 0

    return {
        "total_revenue": total_revenue
    }


@router.get("/order-status")
def order_status_summary(
    db: Session = Depends(get_db)
):
    results = db.query(
        Order.status,
        func.count(Order.id)
    ).group_by(
        Order.status
    ).all()

    return [
        {
            "status": status,
            "count": count
        }
        for status, count in results
    ]


@router.get("/available-foods")
def available_foods_summary(
    db: Session = Depends(get_db)
):
    available = db.query(Food).filter(
        Food.is_available == True
    ).count()

    unavailable = db.query(Food).filter(
        Food.is_available == False
    ).count()

    return {
        "available_foods": available,
        "unavailable_foods": unavailable
    }


@router.get("/category-count")
def category_food_count(
    db: Session = Depends(get_db)
):
    results = db.query(
        Category.name,
        func.count(Food.id)
    ).outerjoin(
        Food,
        Food.category_id == Category.id
    ).group_by(
        Category.id,
        Category.name
    ).all()

    return [
        {
            "category": category_name,
            "food_count": food_count
        }
        for category_name, food_count in results
    ]