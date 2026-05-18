import { useRef, useState } from "react";

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

export function JobQuickModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phoneDigits, setPhoneDigits] = useState("");
  const phoneInputRef = useRef<HTMLInputElement | null>(null);

  const handlePhoneChange = (value: string, caret: number | null) => {
    const normalizedDigits = toPhoneDigits(value);

    let digitsBeforeCaret = 0;
    if (caret !== null) {
      for (let i = 0; i < Math.min(caret, value.length); i += 1) {
        if (/\d/.test(value[i])) digitsBeforeCaret += 1;
      }
    }
    if (digitsBeforeCaret > 0) digitsBeforeCaret = Math.max(1, digitsBeforeCaret);
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

  const handleSubmit = () => {
    if (!name.trim() || !isPhoneComplete(phoneDigits)) return;
    setOpen(false);
    setName("");
    setPhoneDigits("");
    alert("Отклик отправлен!");
  };

  return (
    <>
      <button className="outline" onClick={() => setOpen(true)}>Быстрый отклик</button>
      {open ? (
        <div className="modal-backdrop" onClick={() => setOpen(false)}>
          <div className="modal-panel mini" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h2>Быстрый отклик</h2>
              <button onClick={() => setOpen(false)}>Закрыть</button>
            </div>
            <div className="modal-content job-form">
              <label>Имя<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ваше имя" /></label>
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
              <button className="solid" type="button" onClick={handleSubmit} disabled={!name.trim() || !isPhoneComplete(phoneDigits)}>
                Отправить
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
