import { Link, NavLink } from "react-router-dom";
import { useShop } from "../context/ShopContext";

const links = [
  { to: "/", label: "Главная" },
  { to: "/catalog", label: "Каталог" },
  { to: "/sale", label: "Акции" },
  { to: "/wishlist", label: "Избранное" },
  { to: "/delivery", label: "Доставка" },
  { to: "/about", label: "О нас" },
  { to: "/loyalty", label: "Скидочная карта" }
];

export function NavBar() {
  const { cart, openCart } = useShop();
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <header className="top-bar">
      <Link to="/" className="brand" aria-label="На главную">
        <img src="/placeholders/logo.svg" alt="Покупочка" className="logo-crop" />
      </Link>
      <nav>
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            {link.label}
          </NavLink>
        ))}
      </nav>
      <button className="solid" onClick={openCart}>Корзина ({cartCount})</button>
    </header>
  );
}
