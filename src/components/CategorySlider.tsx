import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../data/shopData";

export function CategorySlider() {
  const rowRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const move = (direction: number) => {
    if (!rowRef.current) return;
    rowRef.current.scrollBy({ left: direction * 260, behavior: "smooth" });
  };

  return (
    <section className="slider-block">
      <div className="slider-head">
        <h2>Категории</h2>
        <div className="slider-actions">
          <button onClick={() => move(-1)}>←</button>
          <button onClick={() => move(1)}>→</button>
        </div>
      </div>
      <div className="category-row" ref={rowRef}>
        {categories.map((category) => (
          <button
            key={category.key}
            className="category-tile"
            style={{ backgroundColor: category.color }}
            onClick={() => navigate(`/catalog?category=${category.key}`)}
          >
            {category.label}
          </button>
        ))}
      </div>
    </section>
  );
}
