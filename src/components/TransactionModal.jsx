import { useApp } from "../context/AppContext";
import { EXPENSE_CATS, INCOME_CATS } from "../data/mockData";
import { S } from "../styles/tokens";
import { fmt } from "../utils/formatters";

export default function TransactionModal() {
  const {
    modal,
    editId,
    form,
    formErr,
    closeModal,
    submitForm,
    updateForm,
    handleTypeChange,
  } = useApp();
  if (!modal) return null;

  const isEdit = editId !== null;
  const cats = form.type === "income" ? INCOME_CATS : EXPENSE_CATS;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 200,
        padding: "1rem",
      }}
    >
      <div
        style={{
          background: "var(--color-background-primary)",
          border: "0.5px solid var(--color-border-tertiary)",
          borderRadius: 16,
          width: "100%",
          maxWidth: 420,
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1.25rem 1.25rem 0",
            marginBottom: "1.25rem",
          }}
        >
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>
              {isEdit ? "Edit Transaction" : "Add Transaction"}
            </h2>
            <p style={{ fontSize: 12, ...S.muted, margin: "3px 0 0" }}>
              {isEdit
                ? "Update the transaction details below"
                : "Fill in the details for your new entry"}
            </p>
          </div>
          <button
            onClick={closeModal}
            style={{
              background: "var(--color-background-secondary)",
              border: "none",
              borderRadius: 8,
              width: 32,
              height: 32,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--color-text-secondary)",
              fontSize: 18,
              lineHeight: 1,
              flexShrink: 0,
            }}
          >
            ×
          </button>
        </div>

        {/* ── Type Toggle ── */}
        <div style={{ padding: "0 1.25rem", marginBottom: "1.25rem" }}>
          <label style={S.label}>Transaction type</label>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              background: "var(--color-background-secondary)",
              borderRadius: 10,
              padding: 4,
              gap: 4,
            }}
          >
            {["expense", "income"].map((t) => (
              <button
                key={t}
                onClick={() => handleTypeChange(t)}
                style={{
                  padding: "9px 0",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "var(--font-sans)",
                  transition: "all 0.2s",
                  background:
                    form.type === t
                      ? t === "income"
                        ? "#DCFCE7"
                        : "#FEE2E2"
                      : "transparent",
                  color:
                    form.type === t
                      ? t === "income"
                        ? "#166534"
                        : "#991B1B"
                      : "var(--color-text-secondary)",
                }}
              >
                {t === "income" ? "↑ Income" : "↓ Expense"}
              </button>
            ))}
          </div>
        </div>

        {/* ── Amount (large, prominent) ── */}
        <div style={{ padding: "0 1.25rem", marginBottom: "1.25rem" }}>
          <label style={S.label}>Amount</label>
          <div style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: 18,
                fontWeight: 500,
                color: "var(--color-text-secondary)",
              }}
            >
              ₹
            </span>
            <input
              type="number"
              min="1"
              placeholder="0"
              value={form.amount}
              onChange={(e) => updateForm("amount", e.target.value)}
              style={{
                ...S.input,
                paddingLeft: 30,
                fontSize: 22,
                fontWeight: 500,
                height: 54,
                color: form.type === "income" ? "#16A34A" : "#DC2626",
                letterSpacing: "-0.5px",
              }}
            />
          </div>
          {form.amount > 0 && (
            <p style={{ fontSize: 11, ...S.muted, marginTop: 4 }}>
              {fmt(Number(form.amount))}
            </p>
          )}
        </div>

        {/* ── Form Fields ── */}
        <div
          style={{
            padding: "0 1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {/* Description */}
          <div>
            <label style={S.label}>Description</label>
            <input
              type="text"
              placeholder={
                form.type === "income"
                  ? "e.g. Monthly salary"
                  : "e.g. Grocery shopping"
              }
              value={form.description}
              onChange={(e) => updateForm("description", e.target.value)}
              style={{ ...S.input, height: 42 }}
            />
          </div>

          {/* Category */}
          <div>
            <label style={S.label}>Category</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {cats.map((cat) => (
                <button
                  key={cat}
                  onClick={() => updateForm("category", cat)}
                  style={{
                    padding: "7px 12px",
                    fontSize: 12,
                    border:
                      form.category === cat
                        ? "1.5px solid var(--color-text-primary)"
                        : "0.5px solid var(--color-border-secondary)",
                    borderRadius: 8,
                    cursor: "pointer",
                    background:
                      form.category === cat
                        ? "var(--color-text-primary)"
                        : "var(--color-background-secondary)",
                    color:
                      form.category === cat
                        ? "var(--color-background-primary)"
                        : "var(--color-text-secondary)",
                    fontFamily: "var(--font-sans)",
                    transition: "all 0.15s",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Date */}
          <div>
            <label style={S.label}>Date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => updateForm("date", e.target.value)}
              style={{ ...S.input, height: 42 }}
            />
          </div>
        </div>

        {/* ── Error ── */}
        {formErr && (
          <div
            style={{
              margin: "1rem 1.25rem 0",
              padding: "10px 12px",
              background: "#FEE2E2",
              borderRadius: 8,
              fontSize: 12,
              color: "#991B1B",
            }}
          >
            {formErr}
          </div>
        )}

        {/* ── Actions ── */}
        <div style={{ padding: "1.25rem", display: "flex", gap: 8 }}>
          <button onClick={closeModal} style={{ ...S.btn.ghost, flex: 1 }}>
            Cancel
          </button>
          <button
            onClick={submitForm}
            style={{
              ...S.btn.primary,
              flex: 2,
              background: form.type === "income" ? "#16A34A" : "#DC2626",
            }}
          >
            {isEdit
              ? "Save Changes"
              : `Add ${form.type === "income" ? "Income" : "Expense"}`}
          </button>
        </div>
      </div>
    </div>
  );
}
