import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductsGrid } from "../components/ProductsGrid";
import { categories } from "../data/shopData";
import { products } from "../data/shopData";

export function CatalogPage() {
  const [params, setParams] = useSearchParams();
  const currentCategory = params.get("category") || "all";

  const filteredProducts = useMemo(() => {
    if (currentCategory === "all") return products;
    return products.filter((item) => item.category === currentCategory);
  }, [currentCategory]);

  return (
    <>
      <section className="catalog-filters">
        <button className={currentCategory === "all" ? "active" : ""} onClick={() => setParams({})}>Все</button>
        {categories.map((category) => (
          <button
            key={category.key}
            className={currentCategory === category.key ? "active" : ""}
            onClick={() => setParams({ category: category.key })}
          >
            {category.label}
          </button>
        ))}
      </section>
      <ProductsGrid title="Каталог" products={filteredProducts} />
    </>
  );
}
