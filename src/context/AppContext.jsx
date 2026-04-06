import { createContext, useContext, useState, useMemo } from "react";
import { SEED_TRANSACTIONS, getNextId, EXPENSE_CATS } from "../data/mockData";
import { getMonth } from "../utils/formatters";

const AppContext = createContext(null);

const DEFAULT_FORM = {
  date: new Date().toISOString().slice(0, 10),
  amount: "",
  category: "Food & Dining",
  type: "expense",
  description: "",
};

export function AppProvider({ children }) {
  const [role, setRole] = useState("viewer");
  const [tab, setTab] = useState("dashboard");
  const [txns, setTxns] = useState(SEED_TRANSACTIONS);
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    category: "all",
    month: "all",
    sort: "date-desc",
  });
  const [modal, setModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(DEFAULT_FORM);
  const [formErr, setFormErr] = useState("");

  /* ── Derived: latest & prev month ── */
  const latestMonth = useMemo(() => {
    const months = [...new Set(txns.map((t) => getMonth(t.date)))].sort();
    return months[months.length - 1] || "2026-03";
  }, [txns]);

  const prevMonthKey = useMemo(() => {
    const [y, m] = latestMonth.split("-").map(Number);
    const d = new Date(y, m - 2);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  }, [latestMonth]);

  /* ── Derived: summary stats ── */
  const stats = useMemo(() => {
    const cur = txns.filter((t) => getMonth(t.date) === latestMonth);
    const prev = txns.filter((t) => getMonth(t.date) === prevMonthKey);
    const sum = (arr, type) =>
      arr.filter((t) => t.type === type).reduce((a, t) => a + t.amount, 0);
    const income = sum(cur, "income"),
      expense = sum(cur, "expense");
    const pIncome = sum(prev, "income"),
      pExpense = sum(prev, "expense");
    const totalInc = sum(txns, "income"),
      totalExp = sum(txns, "expense");
    return {
      balance: totalInc - totalExp,
      income,
      expense,
      savings: income - expense,
      incDelta: pIncome ? Math.round(((income - pIncome) / pIncome) * 100) : 0,
      expDelta: pExpense
        ? Math.round(((expense - pExpense) / pExpense) * 100)
        : 0,
      savingsRate: totalInc
        ? Math.round(((totalInc - totalExp) / totalInc) * 100)
        : 0,
      totalInc,
      totalExp,
    };
  }, [txns, latestMonth, prevMonthKey]);

  /* ── Derived: monthly chart data ── */
  const monthlyData = useMemo(() => {
    const months = [...new Set(txns.map((t) => getMonth(t.date)))].sort();
    return months.map((m) => {
      const mTxns = txns.filter((t) => getMonth(t.date) === m);
      const income = mTxns
        .filter((t) => t.type === "income")
        .reduce((a, t) => a + t.amount, 0);
      const expense = mTxns
        .filter((t) => t.type === "expense")
        .reduce((a, t) => a + t.amount, 0);
      return { month: m, income, expense, net: income - expense };
    });
  }, [txns]);

  /* ── Derived: current month category breakdown ── */
  const categoryData = useMemo(() => {
    const map = {};
    txns
      .filter((t) => getMonth(t.date) === latestMonth && t.type === "expense")
      .forEach((t) => {
        map[t.category] = (map[t.category] || 0) + t.amount;
      });
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .map(([name, value]) => ({ name, value }));
  }, [txns, latestMonth]);

  /* ── Derived: all-time category totals ── */
  const allTimeCats = useMemo(() => {
    const map = {};
    txns
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        map[t.category] = (map[t.category] || 0) + t.amount;
      });
    const sorted = Object.entries(map).sort((a, b) => b[1] - a[1]);
    const total = sorted.reduce((a, [, v]) => a + v, 0);
    return { sorted, total };
  }, [txns]);

  /* ── Derived: available months for filter ── */
  const availableMonths = useMemo(
    () => [...new Set(txns.map((t) => getMonth(t.date)))].sort().reverse(),
    [txns],
  );

  /* ── Derived: filtered transactions ── */
  const filteredTxns = useMemo(() => {
    let r = [...txns];
    if (filters.search)
      r = r.filter((t) =>
        [t.description, t.category]
          .join(" ")
          .toLowerCase()
          .includes(filters.search.toLowerCase()),
      );
    if (filters.type !== "all") r = r.filter((t) => t.type === filters.type);
    if (filters.category !== "all")
      r = r.filter((t) => t.category === filters.category);
    if (filters.month !== "all")
      r = r.filter((t) => getMonth(t.date) === filters.month);
    r.sort((a, b) => {
      if (filters.sort === "date-desc")
        return new Date(b.date) - new Date(a.date);
      if (filters.sort === "date-asc")
        return new Date(a.date) - new Date(b.date);
      if (filters.sort === "amount-desc") return b.amount - a.amount;
      if (filters.sort === "amount-asc") return a.amount - b.amount;
      return 0;
    });
    return r;
  }, [txns, filters]);

  /* ── Handlers ── */
  const updateFilter = (key, val) => setFilters((f) => ({ ...f, [key]: val }));
  const updateForm = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const openAdd = () => {
    setEditId(null);
    setForm(DEFAULT_FORM);
    setFormErr("");
    setModal(true);
  };

  const openEdit = (t) => {
    setEditId(t.id);
    setForm({
      date: t.date,
      amount: String(t.amount),
      category: t.category,
      type: t.type,
      description: t.description,
    });
    setFormErr("");
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setFormErr("");
  };

  const submitForm = () => {
    if (
      !form.date ||
      !form.description.trim() ||
      !form.amount ||
      Number(form.amount) <= 0
    ) {
      setFormErr("Please fill all fields with valid values.");
      return;
    }
    if (editId !== null) {
      setTxns((prev) =>
        prev.map((t) =>
          t.id === editId ? { ...t, ...form, amount: Number(form.amount) } : t,
        ),
      );
    } else {
      setTxns((prev) => [
        ...prev,
        { id: getNextId(), ...form, amount: Number(form.amount) },
      ]);
    }
    closeModal();
  };

  const deleteTxn = (id) => {
    if (window.confirm("Delete this transaction?")) {
      setTxns((prev) => prev.filter((t) => t.id !== id));
    }
  };

  /* ── Handle type change: reset category ── */
  const handleTypeChange = (type) => {
    setForm((f) => ({
      ...f,
      type,
      category: type === "income" ? "Salary" : "Food & Dining",
    }));
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        tab,
        setTab,
        txns,
        filters,
        updateFilter,
        filteredTxns,
        availableMonths,
        stats,
        monthlyData,
        categoryData,
        allTimeCats,
        latestMonth,
        prevMonthKey,
        modal,
        editId,
        form,
        formErr,
        openAdd,
        openEdit,
        closeModal,
        submitForm,
        deleteTxn,
        updateForm,
        handleTypeChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
