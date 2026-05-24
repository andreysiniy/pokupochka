export function toPhoneDigits(input: string) {
  const raw = input.replace(/\D/g, "");
  if (!raw) return "";
  const normalized = raw.replace(/^8/, "7");
  return (normalized.startsWith("7") ? normalized : `7${normalized}`).slice(0, 11);
}

export function formatPhoneDisplay(digits: string) {
  if (!digits) return "";
  const d = digits.padEnd(11, "_");
  return `+7 (${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7, 9)}-${d.slice(9, 11)}`;
}

export function isPhoneComplete(phoneDigits: string) {
  return phoneDigits.length === 11 && phoneDigits.startsWith("7");
}
