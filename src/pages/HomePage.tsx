import { Link } from "react-router-dom";
import { CategorySlider } from "../components/CategorySlider";
import { ProductsGrid } from "../components/ProductsGrid";
import { products } from "../data/shopData";

export function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-visual">
          <img src="/images/background/image.png" alt="Фон карточки" className="hero-image" />
        </div>
        <div className="hero-copy">
          <h1>Не пропустите акции</h1>
          <p>Подпишитесь на уведомления о свежих акциях по почте.</p>
          <form className="hero-subscribe" onSubmit={(event) => event.preventDefault()}>
            <div className="hero-subscribe-field">
              <input type="email" placeholder="Ваш email" aria-label="Email для подписки" required />
              <button type="submit" className="solid">Подписаться</button>
            </div>
          </form>
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
