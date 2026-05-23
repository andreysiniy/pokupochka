import { useMemo } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const LOYALTY_PROFILE_KEY = "shop.loyaltyProfile";
const LOYALTY_HISTORY_KEY = "shop.loyaltyHistory";

type LoyaltyProfile = {
  phoneDigits: string;
  points: number;
  tier: "Silver" | "Gold";
};

type LoyaltyHistoryItem = {
  id: string;
  title: string;
  delta: number;
  createdAt: string;
};

function readProfile(): LoyaltyProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(LOYALTY_PROFILE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return null;
    const phoneDigits = (parsed as { phoneDigits?: unknown }).phoneDigits;
    const points = (parsed as { points?: unknown }).points;
    const tier = (parsed as { tier?: unknown }).tier;
    if (typeof phoneDigits !== "string" || typeof points !== "number" || (tier !== "Silver" && tier !== "Gold")) return null;
    return { phoneDigits, points, tier };
  } catch {
    return null;
  }
}

function formatPhoneDisplay(digits: string) {
  const d = digits.padEnd(11, "_");
  return `+7 (${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7, 9)}-${d.slice(9, 11)}`;
}

function readHistory(phoneDigits: string): LoyaltyHistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(`${LOYALTY_HISTORY_KEY}.${phoneDigits}`);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is LoyaltyHistoryItem =>
        !!item &&
        typeof item === "object" &&
        typeof (item as { id?: unknown }).id === "string" &&
        typeof (item as { title?: unknown }).title === "string" &&
        typeof (item as { delta?: unknown }).delta === "number" &&
        typeof (item as { createdAt?: unknown }).createdAt === "string"
    );
  } catch {
    return [];
  }
}

export function LoyaltyCardPage() {
  const navigate = useNavigate();
  const profile = useMemo(() => readProfile(), []);

  if (!profile) return <Navigate to="/loyalty/login" replace />;

  const logout = () => {
    window.localStorage.removeItem(LOYALTY_PROFILE_KEY);
    navigate("/loyalty/login");
  };

  const nextLevel = profile.tier === "Gold" ? 0 : Math.max(0, 3000 - profile.points);
  const history = readHistory(profile.phoneDigits);
  const placeholderHistory: LoyaltyHistoryItem[] = [
    { id: "ph-1", title: "Покупка #48166", delta: 95, createdAt: "12.05.2026" },
    { id: "ph-2", title: "Списание на скидку", delta: -80, createdAt: "10.05.2026" },
    { id: "ph-3", title: "Бонус за акцию", delta: 50, createdAt: "08.05.2026" }
  ];
  const visibleHistory = history.length > 0 ? history : placeholderHistory;

  return (
    <section className="loyalty-page">
      <h1>Скидочная карта</h1>
      <div className="loyalty-dashboard">
        <div className="loyalty-card-box loyalty-card-box-dashboard">
          <div className="loyalty-top">
            <strong>{profile.tier}</strong>
            <span>{formatPhoneDisplay(profile.phoneDigits)}</span>
          </div>
          <div className="loyalty-points">{profile.points} баллов</div>
          <p>{profile.tier === "Gold" ? "У вас максимальный уровень карты." : `До уровня Gold: ${nextLevel} баллов`}</p>
          <div className="modal-actions">
            <button className="outline" onClick={() => navigate("/catalog")}>Тратить баллы</button>
            <button onClick={logout}>Выйти</button>
          </div>
        </div>

        <aside className="loyalty-card-box loyalty-history-box">
          <h3>История баллов</h3>
          <div className="history-list">
            {history.length === 0 ? <p className="history-note">Пока нет операций по карте, показываем примеры:</p> : null}
            {visibleHistory.map((item) => (
              <div key={item.id} className="history-row">
                <span>
                  {item.title}
                  <small>{item.createdAt}</small>
                </span>
                <b>{item.delta > 0 ? `+${item.delta}` : item.delta}</b>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
