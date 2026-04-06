import { useApp } from "../context/AppContext";
import { S } from "../styles/tokens";

const TABS = [
  { key: "dashboard", label: "Dashboard" },
  { key: "transactions", label: "Transactions" },
  { key: "insights", label: "Insights" },
];

export default function Navbar() {
  const { tab, setTab, role, setRole } = useApp();

  return (
    <>
      {/* ── Desktop / Tablet Nav ── */}
      <nav
        style={{
          background: "var(--color-background-primary)",
          borderBottom: "0.5px solid var(--color-border-tertiary)",
          padding: "0 1.25rem",
          display: "flex",
          alignItems: "center",
          gap: 4,
          height: 52,
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
        className="desktop-nav"
      >
        {/* Logo */}
        <span
          style={{
            fontSize: 15,
            fontWeight: 600,
            marginRight: 8,
            letterSpacing: "-0.3px",
          }}
        >
          FinTrack
        </span>

        {/* Desktop Tabs */}
        <div
          style={{ display: "flex", alignItems: "center", gap: 0 }}
          className="desktop-tabs"
        >
          {TABS.map(({ key, label }) => {
            const active = tab === key;
            return (
              <button
                key={key}
                onClick={() => setTab(key)}
                style={{
                  padding: "0 14px",
                  height: 52,
                  fontSize: 13,
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  borderBottom: active
                    ? "2px solid var(--color-text-primary)"
                    : "2px solid transparent",
                  color: active
                    ? "var(--color-text-primary)"
                    : "var(--color-text-secondary)",
                  fontFamily: "var(--font-sans)",
                  fontWeight: active ? 500 : 400,
                  transition: "color 0.15s",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Right side */}
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
          className="desktop-right-section"
        >
          {/* Role badge */}
          <span
            style={{
              fontSize: 11,
              padding: "3px 8px",
              borderRadius: 12,
              fontWeight: 500,
              ...(role === "admin"
                ? { background: "#DCFCE7", color: "#166534" }
                : {
                    background: "var(--color-background-secondary)",
                    color: "var(--color-text-secondary)",
                  }),
            }}
          >
            {role === "admin" ? "Admin" : "Viewer"}
          </span>

          {/* Role selector */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              ...S.input,
              width: "auto",
              fontSize: 13,
              padding: "5px 10px",
            }}
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </nav>

      {/* ── Mobile Bottom Nav ── */}
      <nav
        style={{
          display: "flex",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: "var(--color-background-primary)",
          borderTop: "0.5px solid var(--color-border-tertiary)",
          padding: "8px 0 12px",
          justifyContent: "space-around",
        }}
        className="mobile-bottom-nav"
      >
        {TABS.map(({ key, label }) => {
          const active = tab === key;
          return (
            <button
              key={key}
              onClick={() => setTab(key)}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px 0",
                color: active
                  ? "var(--color-text-primary)"
                  : "var(--color-text-secondary)",
                fontFamily: "var(--font-sans)",
              }}
            >
              <TabIcon name={key} active={active} />
              <span style={{ fontSize: 10, fontWeight: active ? 500 : 400 }}>
                {label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* ── Mobile Top Nav ── */}
      <nav
        style={{
          display: "flex",
          background: "var(--color-background-primary)",
          borderBottom: "0.5px solid var(--color-border-tertiary)",
          padding: "0 1rem",
          alignItems: "center",
          justifyContent: "space-between",
          height: 52,
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
        className="mobile-top-nav"
      >
        {/* Logo */}
        <span
          style={{
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: "-0.3px",
          }}
        >
          FinTrack
        </span>

        {/* Mobile role selector */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              fontSize: 10,
              padding: "2px 6px",
              borderRadius: 10,
              fontWeight: 500,
              ...(role === "admin"
                ? { background: "#DCFCE7", color: "#166534" }
                : {
                    background: "var(--color-background-secondary)",
                    color: "var(--color-text-secondary)",
                  }),
            }}
          >
            {role === "admin" ? "Admin" : "Viewer"}
          </span>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              ...S.input,
              width: "auto",
              fontSize: 12,
              padding: "3px 8px",
            }}
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </nav>

      <style>{`
        @media (min-width: 769px) {
          .mobile-bottom-nav { display: none !important; }
          .mobile-top-nav { display: none !important; }
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-bottom-nav { display: flex !important; }
          .mobile-top-nav { display: flex !important; }
        }
      `}</style>
    </>
  );
}

function TabIcon({ name, active }) {
  const color = active
    ? "var(--color-text-primary)"
    : "var(--color-text-secondary)";
  if (name === "dashboard")
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    );
  if (name === "transactions")
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <path d="M3 6h18M3 12h18M3 18h11" />
      </svg>
    );
  if (name === "insights")
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    );
}
