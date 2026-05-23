import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const LOYALTY_PROFILE_KEY = "shop.loyaltyProfile";

function toPhoneDigits(input: string) {
  const raw = input.replace(/\D/g, "");
  if (!raw) return "";
  const normalized = raw.replace(/^8/, "7");
  return (normalized.startsWith("7") ? normalized : `7${normalized}`).slice(0, 11);
}

function formatPhoneDisplay(digits: string) {
  if (!digits) return "";
  const d = digits.padEnd(11, "_");
  return `+7 (${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7, 9)}-${d.slice(9, 11)}`;
}

function isPhoneComplete(phoneDigits: string) {
  return phoneDigits.length === 11 && phoneDigits.startsWith("7");
}

function pointsFromPhone(phoneDigits: string) {
  const value = Number(phoneDigits.slice(-4) || "0");
  return 500 + (value % 4500);
}

export function LoyaltyLoginPage() {
  const [phoneDigits, setPhoneDigits] = useState("");
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const handlePhoneChange = (value: string, caret: number | null) => {
    const normalizedDigits = toPhoneDigits(value);
    let digitsBeforeCaret = 0;
    if (caret !== null) {
      for (let i = 0; i < Math.min(caret, value.length); i += 1) {
        if (/\d/.test(value[i])) digitsBeforeCaret += 1;
      }
    }
    if (digitsBeforeCaret > normalizedDigits.length) digitsBeforeCaret = normalizedDigits.length;

    setPhoneDigits(normalizedDigits);

    requestAnimationFrame(() => {
      const input = phoneInputRef.current;
      if (!input) return;
      const display = formatPhoneDisplay(normalizedDigits);
      if (!display) {
        input.setSelectionRange(0, 0);
        return;
      }

      let seenDigits = 0;
      let targetPos = display.length;
      for (let i = 0; i < display.length; i += 1) {
        if (/\d/.test(display[i])) {
          seenDigits += 1;
          if (seenDigits >= digitsBeforeCaret) {
            targetPos = i + 1;
            break;
          }
        }
      }
      input.setSelectionRange(targetPos, targetPos);
    });
  };

  const submit = () => {
    if (!isPhoneComplete(phoneDigits)) return;
    const payload = {
      phoneDigits,
      points: pointsFromPhone(phoneDigits),
      tier: pointsFromPhone(phoneDigits) >= 3000 ? "Gold" : "Silver"
    };
    window.localStorage.setItem(LOYALTY_PROFILE_KEY, JSON.stringify(payload));
    navigate("/loyalty");
  };

  return (
    <section className="loyalty-page">
      <h1>Скидочная карта</h1>
      <div className="loyalty-card-box loyalty-card-box-login">
        <p>Войдите по номеру телефона, чтобы посмотреть баланс бонусов.</p>
        <label>
          Телефон
          <input
            ref={phoneInputRef}
            value={formatPhoneDisplay(phoneDigits)}
            onChange={(e) => handlePhoneChange(e.target.value, e.target.selectionStart)}
            placeholder="+7 (___) ___-__-__"
            inputMode="numeric"
          />
        </label>
        <button className="solid" type="button" onClick={submit} disabled={!isPhoneComplete(phoneDigits)}>
          Войти в карту
        </button>
      </div>
    </section>
  );
}
