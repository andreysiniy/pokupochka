import { Link } from "react-router-dom";
import { footerAccountLinks, footerContactItems, footerNavLinks } from "../data/footerData";
import emailIcon from "../assets/footer-icons/email.svg";
import officeIcon from "../assets/footer-icons/office.svg";
import phoneIcon from "../assets/footer-icons/phone.svg";

const footerIcons = {
  office: officeIcon,
  phone: phoneIcon,
  email: emailIcon,
} as const;

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <section className="footer-col footer-col-brand" aria-label="Покупателям">
          <h3>
            <Link to="/" className="footer-logo-link" aria-label="На главную">
              <img src="/placeholders/logo.svg" alt="Покупочка" className="footer-title-logo" />
            </Link>
          </h3>
          {footerNavLinks.map((item) => (
            <Link key={item.to} to={item.to} className="footer-link">
              {item.label}
            </Link>
          ))}
        </section>

        <section className="footer-col" aria-label="Личный кабинет">
          <h3>Личный кабинет</h3>
          {footerAccountLinks.map((item) => (
            <Link key={item.to} to={item.to} className="footer-link">
              {item.label}
            </Link>
          ))}
        </section>

        <section className="footer-col" aria-label="Контакты">
          <h3>Контакты</h3>
          {footerContactItems.map((item) => {
            const content = (
              <>
                <span className="footer-icon" aria-hidden="true">
                  <img src={footerIcons[item.icon]} alt="" />
                </span>
                {item.label}: {item.value}
              </>
            );

            if (item.href) {
              return (
                <a key={item.label} href={item.href} className="footer-link footer-link-with-icon">
                  {content}
                </a>
              );
            }

            return (
              <p key={item.label} className="footer-link footer-link-with-icon">
                {content}
              </p>
            );
          })}
        </section>
      </div>
      <p className="footer-copy">© {new Date().getFullYear()} Покупочка</p>
    </footer>
  );
}
