/** Stable date display for prerender-safe client UI (no `new Date()` / locale APIs). */
export function formatStamp(iso: string) {
  if (!iso) return "";
  return iso.slice(0, 19).replace("T", " ");
}
