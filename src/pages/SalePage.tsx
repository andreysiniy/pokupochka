import { ProductsGrid } from "../components/ProductsGrid";
import { products } from "../data/shopData";

export function SalePage() {
  return <ProductsGrid title="Акции" products={products.filter((item) => item.oldPrice > 0)} />;
}
