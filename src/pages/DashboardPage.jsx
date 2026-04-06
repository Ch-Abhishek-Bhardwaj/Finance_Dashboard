import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useApp } from "../context/AppContext";
import {
  MetricCard,
  Legend,
  ChartTooltip,
  Amount,
  SectionTitle,
  EmptyState,
} from "../components/ui/index";
import { S } from "../styles/tokens";
import { PIE_PALETTE } from "../data/mockData";
import { fmt, fmtDate, monthName } from "../utils/formatters";

export default function DashboardPage() {
  const { stats, monthlyData, categoryData, txns, latestMonth, setTab } =
    useApp();

  const chartData = monthlyData.map((d) => ({
    ...d,
    month: monthName(d.month),
  }));

  return (
    <>
      {/* ── Summary Cards ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
          gap: 10,
          marginBottom: "1.25rem",
        }}
      >
        <MetricCard
          label="Total Balance"
          value={fmt(stats.balance)}
          color={stats.balance >= 0 ? "#16A34A" : "#DC2626"}
          sub={`as of ${monthName(latestMonth)}`}
        />
        <MetricCard
          label="Monthly Income"
          value={fmt(stats.income)}
          color="#16A34A"
          sub={`${stats.incDelta >= 0 ? "+" : ""}${stats.incDelta}% vs prev month`}
        />
        <MetricCard
          label="Monthly Expenses"
          value={fmt(stats.expense)}
          color="#DC2626"
          sub={`${stats.expDelta >= 0 ? "+" : ""}${stats.expDelta}% vs prev month`}
        />
        <MetricCard
          label="Monthly Savings"
          value={fmt(stats.savings)}
          color={stats.savings >= 0 ? "#2563EB" : "#DC2626"}
          sub={`${stats.savingsRate}% savings rate`}
        />
      </div>

      {/* ── Charts ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr",
          gap: 10,
          marginBottom: "1.25rem",
        }}
        className="charts-grid"
      >
        {/* Area Chart */}
        <div style={S.card}>
          <p style={{ fontSize: 13, fontWeight: 500, margin: "0 0 1rem" }}>
            Income vs Expenses
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart
              data={chartData}
              margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="gInc" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16A34A" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gExp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#DC2626" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#DC2626" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(128,128,128,0.12)"
              />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis
                tick={{ fontSize: 11 }}
                tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<ChartTooltip />} />
              <Area
                type="monotone"
                dataKey="income"
                name="Income"
                stroke="#16A34A"
                fill="url(#gInc)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="expense"
                name="Expenses"
                stroke="#DC2626"
                fill="url(#gExp)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
          <Legend
            items={[
              { color: "#16A34A", label: "Income" },
              { color: "#DC2626", label: "Expenses" },
            ]}
          />
        </div>

        {/* Donut */}
        <div style={S.card}>
          <p style={{ fontSize: 13, fontWeight: 500, margin: 0 }}>
            Spending Breakdown
          </p>
          <p style={{ fontSize: 11, ...S.muted, margin: "2px 0 12px" }}>
            {monthName(latestMonth)}
          </p>
          {categoryData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={130}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={36}
                    outerRadius={58}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryData.map((_, i) => (
                      <Cell
                        key={i}
                        fill={PIE_PALETTE[i % PIE_PALETTE.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => fmt(v)} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {categoryData.slice(0, 4).map((d, i) => (
                  <div
                    key={d.name}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 12,
                    }}
                  >
                    <span
                      style={{ display: "flex", alignItems: "center", gap: 6 }}
                    >
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: 2,
                          background: PIE_PALETTE[i % PIE_PALETTE.length],
                          flexShrink: 0,
                          display: "inline-block",
                        }}
                      />
                      <span style={S.muted}>{d.name}</span>
                    </span>
                    <span style={{ fontWeight: 500 }}>{fmt(d.value)}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <EmptyState message="No expenses this month." />
          )}
        </div>
      </div>

      {/* ── Recent Transactions ── */}
      <div style={S.card}>
        <SectionTitle
          action={
            <button
              onClick={() => setTab("transactions")}
              style={{ ...S.btn.ghost, padding: "5px 12px", fontSize: 12 }}
            >
              View all →
            </button>
          }
        >
          Recent Transactions
        </SectionTitle>

        {txns.length === 0 ? (
          <EmptyState />
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 13,
              }}
            >
              <tbody>
                {[...txns]
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .slice(0, 5)
                  .map((t) => (
                    <tr
                      key={t.id}
                      style={{
                        borderBottom:
                          "0.5px solid var(--color-border-tertiary)",
                      }}
                    >
                      <td
                        style={{
                          padding: "10px 0",
                          ...S.muted,
                          fontSize: 12,
                          whiteSpace: "nowrap",
                          paddingRight: 12,
                        }}
                      >
                        {fmtDate(t.date)}
                      </td>
                      <td style={{ padding: "10px 0", paddingRight: 12 }}>
                        {t.description}
                      </td>
                      <td style={{ padding: "10px 0", paddingRight: 12 }}>
                        <span
                          style={{
                            padding: "2px 8px",
                            borderRadius: 12,
                            fontSize: 11,
                            background: "var(--color-background-secondary)",
                            ...S.muted,
                          }}
                        >
                          {t.category}
                        </span>
                      </td>
                      <td style={{ padding: "10px 0", textAlign: "right" }}>
                        <Amount amount={t.amount} type={t.type} />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .charts-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
