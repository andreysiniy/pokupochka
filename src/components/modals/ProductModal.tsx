import { useShop } from "../../context/ShopContext";

function money(value: number) {
  return `${value} ₽`;
}

export function ProductModal() {
  const { openedProduct, closeProduct, addToCart, decreaseCartItem, getCartQty } = useShop();
  if (!openedProduct) return null;
  const qtyInCart = getCartQty(openedProduct.id);
  const isOutOfStock = openedProduct.stock <= 0;
  const isAtLimit = qtyInCart >= openedProduct.stock && openedProduct.stock > 0;

  return (
    <div className="modal-backdrop" onClick={closeProduct}>
      <div className="modal-panel mini" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h2>{openedProduct.title}</h2>
          <button onClick={closeProduct}>Закрыть</button>
        </div>
        <div className="modal-content">
          <img className="modal-preview" src={openedProduct.image} alt={openedProduct.title} />
          <p>Вес/объем: {openedProduct.unit}</p>
          <p>Рейтинг: {openedProduct.rating}</p>
          <p>
            Цена: <b>{money(openedProduct.price)}</b>
            {openedProduct.oldPrice ? <span className="old"> {money(openedProduct.oldPrice)}</span> : null}
          </p>
          <div className="modal-actions">
            {qtyInCart > 0 ? (
              <div className="qty-controls">
                <button onClick={() => decreaseCartItem(openedProduct.id)}>-</button>
                <span>{qtyInCart}</span>
                <button className="solid" onClick={() => addToCart(openedProduct.id)} disabled={isAtLimit}>+</button>
              </div>
            ) : (
              <button className="solid" onClick={() => addToCart(openedProduct.id)} disabled={isOutOfStock}>Добавить в корзину</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
