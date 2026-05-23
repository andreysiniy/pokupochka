import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { NavBar } from "./components/NavBar";
import { CartModal } from "./components/modals/CartModal";
import { ProductModal } from "./components/modals/ProductModal";

const HomePage = lazy(() => import("./pages/HomePage").then((m) => ({ default: m.HomePage })));
const CatalogPage = lazy(() => import("./pages/CatalogPage").then((m) => ({ default: m.CatalogPage })));
const SalePage = lazy(() => import("./pages/SalePage").then((m) => ({ default: m.SalePage })));
const WishlistPage = lazy(() => import("./pages/WishlistPage").then((m) => ({ default: m.WishlistPage })));
const JobsPage = lazy(() => import("./pages/JobsPage").then((m) => ({ default: m.JobsPage })));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage").then((m) => ({ default: m.CheckoutPage })));
const AboutPage = lazy(() => import("./pages/AboutPage").then((m) => ({ default: m.AboutPage })));
const DeliveryPage = lazy(() => import("./pages/DeliveryPage").then((m) => ({ default: m.DeliveryPage })));
const LoyaltyLoginPage = lazy(() => import("./pages/LoyaltyLoginPage").then((m) => ({ default: m.LoyaltyLoginPage })));
const LoyaltyCardPage = lazy(() => import("./pages/LoyaltyCardPage").then((m) => ({ default: m.LoyaltyCardPage })));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage })));

export default function App() {
  return (
    <div className="app-shell">
      <NavBar />

      <Suspense fallback={<div className="page-loading">Загрузка...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/sale" element={<SalePage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/delivery" element={<DeliveryPage />} />
          <Route path="/loyalty/login" element={<LoyaltyLoginPage />} />
          <Route path="/loyalty" element={<LoyaltyCardPage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      <Footer />

      <ProductModal />
      <CartModal />
    </div>
  );
}
