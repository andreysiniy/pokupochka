import { JobQuickModal } from "../components/modals/JobQuickModal";

export function JobsPage() {
  return (
    <section className="jobs-page">
      <h1>Вакансии</h1>
      <p>Присоединяйся к Покупочка: стабильная оплата, гибкий график и команда без бюрократии.</p>
      <img
        className="jobs-hero"
        src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80"
        alt="Команда и работа"
      />
      <div className="jobs-grid">
        <article className="job-item">
          <h3>Курьер</h3>
          <p>Доставка заказов по городу, удобные смены.</p>
        </article>
        <article className="job-item">
          <h3>Сборщик заказов</h3>
          <p>Комплектация корзин на складе, обучение на старте.</p>
        </article>
        <article className="job-item">
          <h3>Оператор поддержки</h3>
          <p>Чаты и звонки, помощь клиентам по заказам.</p>
        </article>
      </div>
      <JobQuickModal />
    </section>
  );
}
