function formatCurrency(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND"
  }).format(value);
}

function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card">
      <div className="product-image" aria-hidden="true">
        {product.icon || "📖"}
      </div>

      <div className="product-content">
        <span className="product-category">DevOps Book</span>

        <h3>{product.name}</h3>

        <p className="product-author">{product.author}</p>

        <div className="product-footer">
          <strong>{formatCurrency(product.price)}</strong>

          <button
            type="button"
            className="add-button"
            onClick={() => onAddToCart(product)}
          >
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;