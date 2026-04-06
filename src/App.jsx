import { AppProvider, useApp } from "./context/AppContext";
import Navbar from "./components/Navbar";
import TransactionModal from "./components/TransactionModal";
import DashboardPage    from "./pages/DashboardPage";
import TransactionsPage from "./pages/TransactionsPage";
import InsightsPage     from "./pages/InsightsPage";

function AppShell() {
  const { tab } = useApp();
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-background-tertiary)" }}>
      <Navbar />

      <main style={{ padding: "1.25rem", maxWidth: 1200, margin: "0 auto" }}>
        {tab === "dashboard"    && <DashboardPage />}
        {tab === "transactions" && <TransactionsPage />}
        {tab === "insights"     && <InsightsPage />}

        {/* Spacer for mobile bottom nav */}
        <div className="mobile-nav-spacer" />
      </main>

      <TransactionModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
