import { S } from "../../styles/tokens";
import { fmt } from "../../utils/formatters";

/* ── Metric Summary Card ── */
export function MetricCard({ label, value, sub, color }) {
  return (
    <div style={S.card}>
      <p style={{ fontSize: 12, ...S.muted, margin: "0 0 6px" }}>{label}</p>
      <p
        style={{
          fontSize: 22,
          fontWeight: 500,
          color: color || "var(--color-text-primary)",
          margin: "0 0 3px",
          lineHeight: 1.2,
        }}
      >
        {value}
      </p>
      {sub && <p style={{ fontSize: 11, ...S.muted, margin: 0 }}>{sub}</p>}
    </div>
  );
}

/* ── Type Badge ── */
export function TypeBadge({ type }) {
  const styles = S.badge[type] || {};
  return (
    <span
      style={{
        ...styles,
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: 12,
        fontSize: 11,
        fontWeight: 500,
        textTransform: "capitalize",
      }}
    >
      {type}
    </span>
  );
}

/* ── Category Pill ── */
export function CategoryPill({ label }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: 12,
        fontSize: 11,
        background: "var(--color-background-secondary)",
        color: "var(--color-text-secondary)",
      }}
    >
      {label}
    </span>
  );
}

/* ── Empty State ── */
export function EmptyState({ message = "No data available." }) {
  return (
    <div style={{ textAlign: "center", padding: "2.5rem 1rem" }}>
      <p style={{ fontSize: 13, ...S.muted }}>{message}</p>
    </div>
  );
}

/* ── Progress Bar ── */
export function ProgressBar({ value, max, color }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  return (
    <div
      style={{
        height: 6,
        background: "var(--color-background-secondary)",
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${pct}%`,
          background: color || "#3B82F6",
          borderRadius: 3,
          transition: "width 0.4s ease",
        }}
      />
    </div>
  );
}

/* ── Chart Legend ── */
export function Legend({ items }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 16,
        marginTop: 8,
        fontSize: 12,
        ...S.muted,
      }}
    >
      {items.map(({ color, label }) => (
        <span
          key={label}
          style={{ display: "flex", alignItems: "center", gap: 5 }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 2,
              background: color,
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          {label}
        </span>
      ))}
    </div>
  );
}

/* ── Chart Tooltip ── */
export function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        ...S.card,
        padding: "8px 12px",
        fontSize: 12,
        minWidth: 140,
        zIndex: 10,
      }}
    >
      <p style={{ margin: "0 0 4px", fontWeight: 500 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ margin: "2px 0", color: p.color }}>
          {p.name}: {fmt(p.value)}
        </p>
      ))}
    </div>
  );
}

/* ── Amount display ── */
export function Amount({ amount, type, size = 13 }) {
  return (
    <span
      style={{
        fontWeight: 500,
        fontSize: size,
        color: type === "income" ? "#16A34A" : "#DC2626",
        whiteSpace: "nowrap",
      }}
    >
      {type === "income" ? "+" : "−"}
      {fmt(amount)}
    </span>
  );
}

/* ── Section title ── */
export function SectionTitle({ children, action }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "0.75rem",
      }}
    >
      <p style={{ fontSize: 13, fontWeight: 500, margin: 0 }}>{children}</p>
      {action}
    </div>
  );
}
