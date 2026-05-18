import { useShop } from "../context/ShopContext";
import { ProductsGrid } from "../components/ProductsGrid";

export function WishlistPage() {
  const { products, favoriteIds, clearFavorites } = useShop();
  const data = products.filter((item) => favoriteIds.includes(item.id));
  return (
    <>
      <section className="catalog-filters">
        <button className="outline" onClick={clearFavorites}>Очистить избранное</button>
      </section>
      <ProductsGrid title="Избранное" products={data} />
    </>
  );
}
