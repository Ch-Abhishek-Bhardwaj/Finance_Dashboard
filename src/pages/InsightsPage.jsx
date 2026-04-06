import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useApp } from "../context/AppContext";
import { S } from "../styles/tokens";
import { CAT_COLORS } from "../data/mockData";
import {
  MetricCard,
  ProgressBar,
  Legend,
  ChartTooltip,
  EmptyState,
} from "../components/ui/index";
import { fmt, monthName } from "../utils/formatters";

export default function InsightsPage() {
  const { stats, monthlyData, allTimeCats } = useApp();

  const topCat = allTimeCats.sorted[0];
  const avgExp = monthlyData.length
    ? Math.round(
        monthlyData.reduce((a, d) => a + d.expense, 0) / monthlyData.length,
      )
    : 0;

  const chartData = monthlyData.map((d) => ({
    ...d,
    month: monthName(d.month),
  }));

  return (
    <>
      {/* ── Insight Cards ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 10,
          marginBottom: "1.25rem",
        }}
      >
        <MetricCard
          label="Highest spending category"
          value={topCat?.[0] || "—"}
          sub={topCat ? `${fmt(topCat[1])} all-time` : "No data yet"}
          color="#DC2626"
        />
        <MetricCard
          label="Average monthly expense"
          value={fmt(avgExp)}
          sub="across all recorded months"
        />
        <MetricCard
          label="Overall savings rate"
          value={`${stats.savingsRate}%`}
          sub="of total income saved"
          color={stats.savingsRate >= 0 ? "#16A34A" : "#DC2626"}
        />
        <MetricCard
          label="Net all-time balance"
          value={fmt(stats.balance)}
          sub={`${fmt(stats.totalInc)} in · ${fmt(stats.totalExp)} out`}
          color={stats.balance >= 0 ? "#16A34A" : "#DC2626"}
        />
      </div>

      {/* ── Monthly Bar Chart ── */}
      <div style={{ ...S.card, marginBottom: "1.25rem" }}>
        <p style={{ fontSize: 13, fontWeight: 500, margin: "0 0 1rem" }}>
          Monthly Income vs Expenses
        </p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
          >
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
            <Bar
              dataKey="income"
              name="Income"
              fill="#16A34A"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="expense"
              name="Expenses"
              fill="#DC2626"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
        <Legend
          items={[
            { color: "#16A34A", label: "Income" },
            { color: "#DC2626", label: "Expenses" },
          ]}
        />
      </div>

      {/* ── Category breakdown ── */}
      <div style={S.card}>
        <p style={{ fontSize: 13, fontWeight: 500, margin: "0 0 1rem" }}>
          All-time spending by category
        </p>
        {allTimeCats.sorted.length === 0 ? (
          <EmptyState message="No expense data yet." />
        ) : (
          allTimeCats.sorted.map(([cat, val]) => (
            <div key={cat} style={{ marginBottom: 14 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 12,
                  marginBottom: 5,
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 2,
                      background: CAT_COLORS[cat] || "#888",
                      display: "inline-block",
                      flexShrink: 0,
                    }}
                  />
                  {cat}
                </span>
                <span style={S.muted}>
                  {fmt(val)} &nbsp;·&nbsp;{" "}
                  {Math.round((val / allTimeCats.total) * 100)}%
                </span>
              </div>
              <ProgressBar
                value={val}
                max={allTimeCats.sorted[0][1]}
                color={CAT_COLORS[cat] || "#888"}
              />
            </div>
          ))
        )}
      </div>
    </>
  );
}
