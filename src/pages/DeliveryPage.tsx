export function DeliveryPage() {
  return (
    <section className="service-page">
      <h1>Доставка и оплата</h1>

      <div className="service-grid">
        <article className="service-card">
          <h3>Зона доставки</h3>
          <p>Доставляем по городу и ближайшим районам. Точную доступность показываем при оформлении заказа.</p>
        </article>
        <article className="service-card">
          <h3>Стоимость</h3>
          <p>Доставка 199 ₽, при заказе от 2000 ₽ — бесплатно.</p>
        </article>
        <article className="service-card">
          <h3>Время доставки</h3>
          <p>Стандартно 60-90 минут, для крупных заказов обычно 45-60 минут.</p>
        </article>
        <article className="service-card">
          <h3>Способы оплаты</h3>
          <p>Банковская карта онлайн, СБП, а также оплата при получении (если доступно для вашего адреса).</p>
        </article>
        <article className="service-card">
          <h3>Возврат и замена</h3>
          <p>Если товар не подошел по качеству, напишите в поддержку в день доставки — оперативно решим вопрос.</p>
        </article>
      </div>
    </section>
  );
}
