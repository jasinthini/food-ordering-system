from fastapi import FastAPI
from app.database import engine


from app.database import Base, engine
from app.models import User, Category, Food, Cart, Order, OrderItem
from app.routers.auth import router as auth_router

from app.routers.category import router as category_router
from app.routers.food import router as food_router
from app.routers.dashboard import router as dashboard_router
from app.routers.user import router as user_router


app = FastAPI(title="Food Ordering API")
app.include_router(auth_router)
app.include_router(category_router)
app.include_router(dashboard_router)
app.include_router(user_router)

from app.routers.cart import router as cart_router
from app.routers.order import router as order_router


Base.metadata.create_all(bind=engine)
app.include_router(food_router)
app.include_router(cart_router)
app.include_router(order_router)

@app.get("/")
def root():
    try:
        with engine.connect():
            return {
                "message": "Food Ordering API is running",
                "database": "Connected"
            }
    except Exception as e:
        return {
            "message": "Food Ordering API is running",
            "database": "Connection failed",
            "error": str(e)
        }