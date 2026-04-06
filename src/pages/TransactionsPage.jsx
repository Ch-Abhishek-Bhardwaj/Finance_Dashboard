import { useApp } from "../context/AppContext";
import { S } from "../styles/tokens";
import { ALL_CATS } from "../data/mockData";
import {
  TypeBadge,
  CategoryPill,
  Amount,
  EmptyState,
} from "../components/ui/index";
import { fmtDate, fmt, monthName } from "../utils/formatters";

export default function TransactionsPage() {
  const {
    role,
    filters,
    updateFilter,
    filteredTxns,
    availableMonths,
    openAdd,
    openEdit,
    deleteTxn,
  } = useApp();

  const totalIncome = filteredTxns
    .filter((t) => t.type === "income")
    .reduce((a, t) => a + t.amount, 0);
  const totalExpense = filteredTxns
    .filter((t) => t.type === "expense")
    .reduce((a, t) => a + t.amount, 0);

  return (
    <>
      {/* ── Toolbar ── */}
      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          marginBottom: "1rem",
          alignItems: "center",
        }}
      >
        {/* Search */}
        <div style={{ position: "relative", flex: "1 1 200px", minWidth: 160 }}>
          <span
            style={{
              position: "absolute",
              left: 10,
              top: "50%",
              transform: "translateY(-50%)",
              ...S.muted,
              fontSize: 14,
              pointerEvents: "none",
            }}
          >
            ⌕
          </span>
          <input
            placeholder="Search transactions..."
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            style={{ ...S.input, paddingLeft: 30 }}
          />
        </div>

        {/* Filters row */}
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            flex: "1 1 auto",
          }}
        >
          <select
            value={filters.type}
            onChange={(e) => updateFilter("type", e.target.value)}
            style={{ ...S.input, width: "auto", flex: "1 1 100px" }}
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select
            value={filters.category}
            onChange={(e) => updateFilter("category", e.target.value)}
            style={{ ...S.input, width: "auto", flex: "1 1 130px" }}
          >
            <option value="all">All Categories</option>
            {ALL_CATS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={filters.month}
            onChange={(e) => updateFilter("month", e.target.value)}
            style={{ ...S.input, width: "auto", flex: "1 1 100px" }}
          >
            <option value="all">All Months</option>
            {availableMonths.map((m) => (
              <option key={m} value={m}>
                {monthName(m)}
              </option>
            ))}
          </select>
          <select
            value={filters.sort}
            onChange={(e) => updateFilter("sort", e.target.value)}
            style={{ ...S.input, width: "auto", flex: "1 1 130px" }}
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="amount-desc">Highest Amount</option>
            <option value="amount-asc">Lowest Amount</option>
          </select>
        </div>

        {/* Add button (admin only) */}
        {role === "admin" && (
          <button
            onClick={openAdd}
            style={{
              ...S.btn.primary,
              whiteSpace: "nowrap",
              padding: "10px 16px",
            }}
          >
            + Add
          </button>
        )}
      </div>

      {/* ── Desktop Table ── */}
      <div
        style={{ ...S.card, padding: 0, overflow: "hidden" }}
        className="txn-table"
      >
        {filteredTxns.length === 0 ? (
          <EmptyState message="No transactions match your filters." />
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 13,
              }}
            >
              <thead>
                <tr
                  style={{
                    borderBottom: "0.5px solid var(--color-border-secondary)",
                  }}
                >
                  {[
                    "Date",
                    "Description",
                    "Category",
                    "Type",
                    "Amount",
                    ...(role === "admin" ? [""] : []),
                  ].map((h, i) => (
                    <th
                      key={i}
                      style={{
                        textAlign: i >= 4 ? "right" : "left",
                        padding: "10px 16px",
                        fontWeight: 500,
                        fontSize: 12,
                        ...S.muted,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredTxns.map((t) => (
                  <tr
                    key={t.id}
                    style={{
                      borderBottom: "0.5px solid var(--color-border-tertiary)",
                    }}
                  >
                    <td
                      style={{
                        padding: "11px 16px",
                        ...S.muted,
                        fontSize: 12,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {fmtDate(t.date)}
                    </td>
                    <td style={{ padding: "11px 16px", maxWidth: 200 }}>
                      {t.description}
                    </td>
                    <td style={{ padding: "11px 16px" }}>
                      <CategoryPill label={t.category} />
                    </td>
                    <td style={{ padding: "11px 16px" }}>
                      <TypeBadge type={t.type} />
                    </td>
                    <td style={{ padding: "11px 16px", textAlign: "right" }}>
                      <Amount amount={t.amount} type={t.type} />
                    </td>
                    {role === "admin" && (
                      <td
                        style={{
                          padding: "11px 16px",
                          textAlign: "right",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <button onClick={() => openEdit(t)} style={S.btn.edit}>
                          Edit
                        </button>
                        <button
                          onClick={() => deleteTxn(t.id)}
                          style={S.btn.danger}
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Mobile Cards ── */}
      <div
        className="txn-cards"
        style={{ display: "none", flexDirection: "column", gap: 8 }}
      >
        {filteredTxns.length === 0 ? (
          <EmptyState message="No transactions match your filters." />
        ) : (
          filteredTxns.map((t) => (
            <div key={t.id} style={{ ...S.card, padding: "12px 14px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontWeight: 500,
                      fontSize: 14,
                      margin: "0 0 3px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t.description}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: 6,
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <span style={{ fontSize: 11, ...S.muted }}>
                      {fmtDate(t.date)}
                    </span>
                    <CategoryPill label={t.category} />
                  </div>
                </div>
                <div
                  style={{ textAlign: "right", flexShrink: 0, marginLeft: 12 }}
                >
                  <Amount amount={t.amount} type={t.type} size={15} />
                  <div style={{ marginTop: 4 }}>
                    <TypeBadge type={t.type} />
                  </div>
                </div>
              </div>
              {role === "admin" && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 4,
                    marginTop: 8,
                    borderTop: "0.5px solid var(--color-border-tertiary)",
                    paddingTop: 8,
                  }}
                >
                  <button
                    onClick={() => openEdit(t)}
                    style={{ ...S.btn.edit, padding: "5px 12px", fontSize: 12 }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTxn(t.id)}
                    style={{
                      ...S.btn.danger,
                      padding: "5px 12px",
                      fontSize: 12,
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* ── Summary Footer ── */}
      <p style={{ fontSize: 12, ...S.muted, marginTop: 10 }}>
        {filteredTxns.length} transaction{filteredTxns.length !== 1 ? "s" : ""}{" "}
        &nbsp;·&nbsp;
        <span style={{ color: "#16A34A" }}>+{fmt(totalIncome)}</span> income
        &nbsp;·&nbsp;
        <span style={{ color: "#DC2626" }}>−{fmt(totalExpense)}</span> expenses
      </p>

      <style>{`
        @media (max-width: 640px) {
          .txn-table { display: none !important; }
          .txn-cards { display: flex !important; }
        }
      `}</style>
    </>
  );
}
