import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <section className="jobs-page">
      <h1>Страница не найдена</h1>
      <p>Похоже, адрес неправильный.</p>
      <Link to="/" className="solid btn-link">На главную</Link>
    </section>
  );
}
