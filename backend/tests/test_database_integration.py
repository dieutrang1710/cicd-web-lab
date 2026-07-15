from fastapi.testclient import TestClient
from sqlalchemy import text

from app.database import SessionLocal
from app.main import app


def test_postgresql_connection() -> None:
    with SessionLocal() as database:
        result = database.execute(
            text("SELECT 1")
        ).scalar_one()

    assert result == 1


def test_products_from_postgresql() -> None:
    app.dependency_overrides.clear()

    with TestClient(app) as client:
        response = client.get("/api/products")

    assert response.status_code == 200

    products = response.json()

    assert isinstance(products, list)
    assert len(products) >= 1
    assert products[0]["id"] is not None
    assert products[0]["name"]
    assert products[0]["price"] > 0