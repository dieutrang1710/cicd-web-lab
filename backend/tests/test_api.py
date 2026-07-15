from collections.abc import Generator

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.database import Base, get_db
from app.main import app
from app.models.product import Product


test_engine = create_engine(
    "sqlite+pysqlite:///:memory:",
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)

TestingSessionLocal = sessionmaker(
    bind=test_engine,
    autoflush=False,
    autocommit=False,
)


def override_get_db() -> Generator[Session, None, None]:
    database = TestingSessionLocal()

    try:
        yield database
    finally:
        database.close()


@pytest.fixture
def client() -> Generator[TestClient, None, None]:
    Base.metadata.create_all(bind=test_engine)

    with TestingSessionLocal() as database:
        database.add_all(
            [
                Product(
                    name="Clean Code",
                    author="Robert C. Martin",
                    price=320000,
                    icon="📘",
                ),
                Product(
                    name="Docker Deep Dive",
                    author="Nigel Poulton",
                    price=280000,
                    icon="📗",
                ),
            ]
        )
        database.commit()

    app.dependency_overrides[get_db] = override_get_db

    yield TestClient(app)

    app.dependency_overrides.clear()
    Base.metadata.drop_all(bind=test_engine)


def test_get_products(client: TestClient) -> None:
    response = client.get("/api/products")

    assert response.status_code == 200

    products = response.json()

    assert isinstance(products, list)
    assert len(products) == 2
    assert products[0]["name"] == "Clean Code"
    assert products[1]["name"] == "Docker Deep Dive"