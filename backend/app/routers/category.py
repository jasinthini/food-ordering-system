from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.category import Category
from app.schemas.category import CategoryCreate, CategoryUpdate

from fastapi import APIRouter, Depends, HTTPException
from app.schemas.category import CategoryCreate, CategoryUpdate

router = APIRouter(
    prefix="/categories",
    tags=["Categories"]
)


@router.post("/")
def create_category(
    category: CategoryCreate,
    db: Session = Depends(get_db)
):
    new_category = Category(
        name=category.name
    )

    db.add(new_category)
    db.commit()
    db.refresh(new_category)

    return {
        "message": "Category created successfully",
        "category_id": new_category.id
    }


@router.get("/")
def get_categories(
    search: str | None = None,
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

    query = db.query(Category)

    if search:
        query = query.filter(
            Category.name.ilike(f"%{search}%")
        )

    if sort_order.lower() == "desc":
        query = query.order_by(
            Category.name.desc()
        )
    else:
        query = query.order_by(
            Category.name.asc()
        )

    total = query.count()

    categories = query.offset(
        (page - 1) * limit
    ).limit(limit).all()

    return {
        "page": page,
        "limit": limit,
        "total": total,
        "sort_order": sort_order,
        "categories": categories
    }

@router.put("/{category_id}")
def update_category(
    category_id: int,
    category_data: CategoryUpdate,
    db: Session = Depends(get_db)
):
    category = db.query(Category).filter(
        Category.id == category_id
    ).first()

    if not category:
        raise HTTPException(
            status_code=404,
            detail="Category not found"
        )

    category.name = category_data.name

    db.commit()
    db.refresh(category)

    return {
        "message": "Category updated successfully",
        "category_id": category.id,
        "name": category.name
    }

@router.delete("/{category_id}")
def delete_category(
    category_id: int,
    db: Session = Depends(get_db)
):
    category = db.query(Category).filter(
        Category.id == category_id
    ).first()

    if not category:
        raise HTTPException(
            status_code=404,
            detail="Category not found"
        )

    db.delete(category)
    db.commit()

    return {
        "message": "Category deleted successfully"
    }

@router.get("/")
def get_categories(
    search: str | None = None,
    page: int = 1,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    query = db.query(Category)

    if search:
        query = query.filter(
            Category.name.ilike(f"%{search}%")
        )

    total = query.count()

    categories = query.offset(
        (page - 1) * limit
    ).limit(limit).all()

    return {
        "page": page,
        "limit": limit,
        "total": total,
        "categories": categories
    }