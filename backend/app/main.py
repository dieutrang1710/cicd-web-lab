from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select

from app.database import Base, SessionLocal, engine
from app.models.product import Product
from app.routers.products import router as products_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)

    with SessionLocal() as db:
        product_exists = db.scalar(select(Product).limit(1))

        if product_exists is None:
            db.add_all(
                [
                    Product(
                        name="Clean Code",
                        author="Robert C. Martin",
                        price=320000,
                        icon="📘",
                    ),
                    Product(
                        name="The DevOps Handbook",
                        author="Gene Kim",
                        price=420000,
                        icon="📙",
                    ),
                    Product(
                        name="Docker Deep Dive",
                        author="Nigel Poulton",
                        price=280000,
                        icon="📗",
                    ),
                    Product(
                        name="Kubernetes Up & Running",
                        author="Kelsey Hightower",
                        price=390000,
                        icon="📕",
                    ),
                ]
            )
            db.commit()

    yield


app = FastAPI(
    title="DevOps Book Store API",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://trainingstorage1710.z7.web.core.windows.net",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health_check() -> dict[str, str]:
    return {
        "status": "healthy",
        "version": "1.0.0",
    }


app.include_router(products_router)
