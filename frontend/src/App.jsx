import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import { getHealth, getProducts } from "./services/api";
import "./App.css";

const fallbackProducts = [
  {
    id: 1,
    name: "Clean Code",
    author: "Robert C. Martin",
    price: 320000,
    icon: "📘"
  },
  {
    id: 2,
    name: "The DevOps Handbook",
    author: "Gene Kim",
    price: 420000,
    icon: "📙"
  },
  {
    id: 3,
    name: "Docker Deep Dive",
    author: "Nigel Poulton",
    price: 280000,
    icon: "📗"
  },
  {
    id: 4,
    name: "Kubernetes Up & Running",
    author: "Kelsey Hightower",
    price: 390000,
    icon: "📕"
  }
];

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [backendStatus, setBackendStatus] = useState("Checking...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadApplicationData() {
      try {
        const [productData, healthData] = await Promise.all([
          getProducts(),
          getHealth()
        ]);

        setProducts(productData);
        setBackendStatus(
          healthData.status === "healthy" ? "Healthy" : "Unavailable"
        );
      } catch (error) {
        console.error("Unable to connect to backend:", error);

        setProducts(fallbackProducts);
        setBackendStatus("Offline - using demo data");
      } finally {
        setLoading(false);
      }
    }

    loadApplicationData();
  }, []);

  function addToCart(product) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });
  }

  function increaseQuantity(productId) {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function decreaseQuantity(productId) {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(productId) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  const cartCount = useMemo(
    () =>
      cartItems.reduce(
        (total, currentItem) => total + currentItem.quantity,
        0
      ),
    [cartItems]
  );

  return (
    <div className="app">
      <Header cartCount={cartCount} backendStatus={backendStatus} />

      <main className="main-content">
        <section className="hero">
          <div>
            <span className="hero-label">CI/CD LAB PROJECT</span>

            <h1>DevOps Book Store</h1>

            <p>
              Một website bán sách đơn giản sử dụng React, FastAPI,
              PostgreSQL, Docker và GitHub Actions.
            </p>

            <a href="#products" className="primary-button">
              Xem sản phẩm
            </a>
          </div>

          <div className="hero-illustration" aria-hidden="true">
            <span>📚</span>
          </div>
        </section>

        <div className="shop-layout">
          <section className="products-section" id="products">
            <div className="section-heading">
              <div>
                <span className="section-label">Sản phẩm</span>
                <h2>Sách nổi bật</h2>
              </div>

              <span className="product-count">
                {products.length} sản phẩm
              </span>
            </div>

            {loading ? (
              <div className="message-box">Đang tải sản phẩm...</div>
            ) : (
              <ProductList
                products={products}
                onAddToCart={addToCart}
              />
            )}
          </section>

          <Cart
            items={cartItems}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
            onRemove={removeFromCart}
            onClear={clearCart}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;