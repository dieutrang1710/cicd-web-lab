from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Product(Base):
    __tablename__ = "products"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    name: Mapped[str] = mapped_column(
        String(120),
        nullable=False,
    )

    author: Mapped[str] = mapped_column(
        String(120),
        nullable=False,
    )

    price: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    icon: Mapped[str] = mapped_column(
        String(10),
        nullable=False,
        default="📖",
    )