import type { Product } from "../types";

type Props = {
  product: Product;
  isFavorite: boolean;
  qtyInCart: number;
  onToggleFavorite: (id: number) => void;
  onOpen: (product: Product) => void;
  onAdd: (id: number) => void;
  onDecrease: (id: number) => void;
};

function money(value: number) {
  return `${value} ₽`;
}

function discount(product: Product) {
  if (!product.oldPrice) return 0;
  return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
}

export function ProductCard({ product, isFavorite, qtyInCart, onToggleFavorite, onOpen, onAdd, onDecrease }: Props) {
  const off = discount(product);
  const isOutOfStock = product.stock <= 0;
  const isAtLimit = qtyInCart >= product.stock && product.stock > 0;
  return (
    <article className="card">
      {off ? <span className="badge">-{off}%</span> : null}
      <button className={`fav ${isFavorite ? "on" : ""}`} onClick={() => onToggleFavorite(product.id)}>❤</button>
      <img className="thumb" src={product.image} alt={product.title} loading="lazy" />
      <h3>{product.title}</h3>
      <p className="meta">{product.unit} • {product.rating} ★</p>
      <p className={`stock ${isOutOfStock ? "out" : ""}`}>
        {isOutOfStock ? "Нет в наличии" : `В наличии: ${product.stock} шт.`}
      </p>
      <div className="price-row">
        <b>{money(product.price)}</b>
        {product.oldPrice ? <span className="old">{money(product.oldPrice)}</span> : null}
      </div>
      <div className="card-actions">
        <button onClick={() => onOpen(product)}>Подробнее</button>
        {qtyInCart > 0 ? (
          <div className="qty-controls">
            <button onClick={() => onDecrease(product.id)}>-</button>
            <span>{qtyInCart}</span>
            <button className="solid" onClick={() => onAdd(product.id)} disabled={isAtLimit}>+</button>
          </div>
        ) : (
          <button className="solid" onClick={() => onAdd(product.id)} disabled={isOutOfStock}>В корзину</button>
        )}
      </div>
    </article>
  );
}
