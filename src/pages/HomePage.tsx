import { Link } from "react-router-dom";
import { CategorySlider } from "../components/CategorySlider";
import { ProductsGrid } from "../components/ProductsGrid";
import { products } from "../data/shopData";

export function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-visual">
          <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=80" alt="Fresh groceries" className="hero-image" />
        </div>
        <div className="hero-copy">
          <h1>Свежие продукты с доставкой за 60 минут</h1>
          <p>Сезонные предложения, аккуратная упаковка и быстрая доставка по городу.</p>
        </div>
      </section>

      <CategorySlider />

      <section className="jobs-card">
        <div>
          <h3>Ищем новых коллег в команду</h3>
          <p>Курьеры, комплектовщики, менеджеры и операторы поддержки.</p>
        </div>
        <Link to="/jobs" className="solid btn-link">Смотреть вакансии</Link>
      </section>

      <ProductsGrid title="Популярное" products={products.slice(0, 8)} />
    </>
  );
}
