from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.product import Product
from app.schemas.product import ProductResponse


router = APIRouter(
    prefix="/api/products",
    tags=["products"],
)


@router.get("", response_model=list[ProductResponse])
def get_products(
    db: Session = Depends(get_db),
) -> list[Product]:
    statement = select(Product).order_by(Product.id)

    return list(db.scalars(statement).all())
