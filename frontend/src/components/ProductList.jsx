import ProductCard from "./ProductCard";

function ProductList({ products, onAddToCart }) {
  if (products.length === 0) {
    return (
      <div className="message-box">
        Hiện chưa có sản phẩm.
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

export default ProductList;