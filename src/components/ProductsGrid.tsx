import { ProductCard } from "./ProductCard";
import { useShop } from "../context/ShopContext";
import type { Product } from "../types";

type Props = {
  title: string;
  products: Product[];
};

export function ProductsGrid({ title, products }: Props) {
  const { favoriteIds, toggleFavorite, openProduct, addToCart, decreaseCartItem, getCartQty } = useShop();

  return (
    <>
      <section className="products-head">
        <h2>{title}</h2>
        <p>{products.length} товаров</p>
      </section>
      <section className="grid">
        {products.length === 0 ? <div className="empty">Пока пусто. Добавь товары в избранное.</div> : null}
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={favoriteIds.includes(product.id)}
            onToggleFavorite={toggleFavorite}
            onOpen={openProduct}
            onAdd={addToCart}
            onDecrease={decreaseCartItem}
            qtyInCart={getCartQty(product.id)}
          />
        ))}
      </section>
    </>
  );
}
