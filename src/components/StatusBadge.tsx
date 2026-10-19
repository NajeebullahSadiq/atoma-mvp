export function StatusBadge({
  status,
}: {
  status: string;
}) {
  const key = status.toLowerCase();
  let tone = "bg-[var(--mist)] text-[var(--ink)]";
  if (key.includes("paid") || key.includes("resolved") || key.includes("active") || key.includes("excellent") || key.includes("confirmed")) {
    tone = "bg-[rgba(42,157,143,0.15)] text-[var(--success)]";
  } else if (key.includes("progress") || key.includes("good") || key.includes("processing")) {
    tone = "bg-[rgba(244,162,97,0.2)] text-[var(--amber-deep)]";
  } else if (key.includes("unpaid") || key.includes("blocked") || key.includes("open") || key.includes("limited") || key.includes("fair")) {
    tone = "bg-[rgba(193,18,31,0.1)] text-[var(--danger)]";
  }

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${tone}`}>
      {status}
    </span>
  );
}
