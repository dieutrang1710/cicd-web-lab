function Header({ cartCount, backendStatus }) {
  const statusClass = backendStatus === "Healthy" ? "online" : "offline";

  return (
    <header className="header">
      <div className="header-container">
        <a href="/" className="brand">
          <span className="brand-icon">📚</span>

          <div>
            <strong>DevOps Books</strong>
            <small>CI/CD Lab</small>
          </div>
        </a>

        <div className="header-actions">
          <div className={`backend-status ${statusClass}`}>
            <span className="status-dot" />
            Backend: {backendStatus}
          </div>

          <a href="#cart" className="cart-indicator">
            🛒 Giỏ hàng
            <span>{cartCount}</span>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;