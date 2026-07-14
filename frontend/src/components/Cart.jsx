import CartItem from "./CartItem";

function formatCurrency(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND"
  }).format(value);
}

function Cart({
  items,
  onIncrease,
  onDecrease,
  onRemove,
  onClear
}) {
  const total = items.reduce(
    (currentTotal, item) =>
      currentTotal + item.price * item.quantity,
    0
  );

  return (
    <aside className="cart" id="cart">
      <div className="cart-heading">
        <div>
          <span className="section-label">Đơn hàng</span>
          <h2>Giỏ hàng</h2>
        </div>

        {items.length > 0 && (
          <button
            type="button"
            className="clear-button"
            onClick={onClear}
          >
            Xóa tất cả
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="empty-cart">
          <span>🛒</span>
          <h3>Giỏ hàng đang trống</h3>
          <p>Hãy chọn một cuốn sách bạn yêu thích.</p>
        </div>
      ) : (
        <>
          <ul className="cart-list">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
                onRemove={onRemove}
              />
            ))}
          </ul>

          <div className="cart-summary">
            <div>
              <span>Tạm tính</span>
              <span>{formatCurrency(total)}</span>
            </div>

            <div>
              <span>Phí vận chuyển</span>
              <span>Miễn phí</span>
            </div>

            <div className="cart-total">
              <strong>Tổng cộng</strong>
              <strong>{formatCurrency(total)}</strong>
            </div>

            <button
              type="button"
              className="checkout-button"
              onClick={() =>
                window.alert(
                  "Đây là website demo CI/CD nên chưa tích hợp thanh toán."
                )
              }
            >
              Đặt hàng
            </button>
          </div>
        </>
      )}
    </aside>
  );
}

export default Cart;