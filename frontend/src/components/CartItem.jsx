function formatCurrency(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND"
  }).format(value);
}

function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove
}) {
  return (
    <li className="cart-item">
      <div className="cart-item-main">
        <span className="cart-item-icon">
          {item.icon || "📖"}
        </span>

        <div>
          <h4>{item.name}</h4>
          <p>{formatCurrency(item.price)}</p>
        </div>
      </div>

      <div className="cart-item-actions">
        <div className="quantity-control">
          <button
            type="button"
            aria-label={`Giảm số lượng ${item.name}`}
            onClick={() => onDecrease(item.id)}
          >
            −
          </button>

          <span>{item.quantity}</span>

          <button
            type="button"
            aria-label={`Tăng số lượng ${item.name}`}
            onClick={() => onIncrease(item.id)}
          >
            +
          </button>
        </div>

        <button
          type="button"
          className="remove-button"
          onClick={() => onRemove(item.id)}
        >
          Xóa
        </button>
      </div>
    </li>
  );
}

export default CartItem;