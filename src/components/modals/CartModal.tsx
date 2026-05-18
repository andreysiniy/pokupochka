import { useShop } from "../../context/ShopContext";
import { Link } from "react-router-dom";

function money(value: number) {
  return `${value} ₽`;
}

export function CartModal() {
  const { cartOpen, closeCart, cart, clearCart, addToCart, decreaseCartItem } = useShop();
  if (!cartOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const delivery = subtotal >= 2000 || subtotal === 0 ? 0 : 199;
  const total = subtotal + delivery;
  const eta = subtotal === 0 ? "—" : subtotal >= 3000 ? "45-60 мин" : "60-90 мин";

  return (
    <div className="modal-backdrop" onClick={closeCart}>
      <div className="modal-panel mini" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h2>Корзина</h2>
          <button onClick={closeCart}>Закрыть</button>
        </div>
        <div className="modal-content">
          {cart.length === 0 ? <p>Корзина пока пустая.</p> : null}
          {cart.map((item) => (
            <div key={item.id} className="cart-row">
              <span>{item.title}</span>
              <div className="qty-controls">
                <button onClick={() => decreaseCartItem(item.id)}>-</button>
                <span>{item.qty}</span>
                <button className="solid" onClick={() => addToCart(item.id)} disabled={item.qty >= item.stock}>+</button>
              </div>
              <b>{money(item.qty * item.price)}</b>
            </div>
          ))}
          <div className="cart-summary">
            <div><span>Товары</span><b>{money(subtotal)}</b></div>
            <div><span>Доставка</span><b>{delivery === 0 ? "Бесплатно" : money(delivery)}</b></div>
            <div><span>Ожидание</span><b>{eta}</b></div>
            <div className="cart-total"><span>Итого</span><b>{money(total)}</b></div>
          </div>
          {cart.length > 0 ? (
            <div className="modal-actions">
              <Link to="/checkout" className="solid btn-link" onClick={closeCart}>Оформить заказ</Link>
              <button className="outline" onClick={clearCart}>Очистить корзину</button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
