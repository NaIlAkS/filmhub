import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// --- Constants ---
const FONT_FAMILY = "Inter, sans-serif";
const PRIMARY_BG = "#101014";
const ACCENT_COLOR = "rgba(255, 255, 255, 0.15)";
const HOVER_COLOR = "rgba(255, 255, 255, 0.3)";
const TEXT_COLOR = "rgba(255, 255, 255, 0.9)";
const SUBTLE_TEXT = "rgba(255, 255, 255, 0.6)";
const ACTION_COLOR = "#3399ff";
const SUCCESS_COLOR = "#00cc66";
const WARNING_COLOR = "#ffcc00";

// --- Mock Data ---
const initialExpenses = [
  { id: 101, category: "Props", description: "Hedgehog in a cage purchase", amount: 150, paid: true, phase: "Production" },
  { id: 102, category: "Crew", description: "DP Weekly Pay", amount: 6500, paid: true, phase: "Production" },
  { id: 103, category: "Location", description: "Street 5 Permit Fee", amount: 3200, paid: false, phase: "Pre-Production" },
  { id: 104, category: "VFX", description: "Initial VFX Bid Deposit", amount: 15000, paid: true, phase: "Post-Production" },
  { id: 105, category: "Crew", description: "Casting Director Fee", amount: 4000, paid: true, phase: "Pre-Production" },
];

const mockBudgetPhase = [
  { phase: "Pre-Production", budgeted: 200000, spent: 7200, status: "green" },
  { phase: "Production", budgeted: 1000000, spent: 405000, status: "yellow" },
  { phase: "Post-Production", budgeted: 300000, spent: 37800, status: "green" },
];

const mockBudget = {
  totalBudget: 1500000,
  spent: 450000,
  remaining: 1050000,
  deviation: 22000,
};

// --- Main Component ---
const AccountantDashboard = () => {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [newExpense, setNewExpense] = useState({ category: "Crew", description: "", amount: "", phase: "Production" });

  // --- Styles ---
  const cardStyle = {
    padding: "2rem",
    borderRadius: "16px",
    background: "rgba(255, 255, 255, 0.02)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(15px)",
    WebkitBackdropFilter: "blur(15px)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    outline: "none",
    background: "rgba(255, 255, 255, 0.05)",
    color: TEXT_COLOR,
    fontFamily: FONT_FAMILY,
    fontSize: "0.9rem",
    boxSizing: "border-box",
  };

  const buttonStyle = (isPrimary) => ({
    padding: "10px 15px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "0.9rem",
    fontFamily: FONT_FAMILY,
    transition: "0.2s ease-in-out",
    color: isPrimary ? PRIMARY_BG : TEXT_COLOR,
    background: isPrimary ? ACTION_COLOR : ACCENT_COLOR,
  });

  const getPhaseColor = (status) => {
    switch (status) {
      case "green": return SUCCESS_COLOR;
      case "yellow": return WARNING_COLOR;
      case "red": return "#ff4444";
      default: return SUBTLE_TEXT;
    }
  };

  // --- Handlers ---
  const handleExpenseChange = (e) => {
    const { name, value } = e.target;
    setNewExpense(prev => ({ ...prev, [name]: value }));
  };

  const handleAddExpense = () => {
    if (newExpense.description && newExpense.amount > 0) {
      const newEntry = {
        id: Date.now(),
        category: newExpense.category,
        description: newExpense.description,
        amount: parseFloat(newExpense.amount),
        paid: false,
        phase: newExpense.phase,
      };
      setExpenses([newEntry, ...expenses]);
      setNewExpense({ category: "Crew", description: "", amount: "", phase: "Production" });
    }
  };

  const togglePaidStatus = (id) => {
    setExpenses(prev =>
      prev.map(exp => exp.id === id ? { ...exp, paid: !exp.paid } : exp)
    );
  };

  const totalUnpaid = expenses.filter(e => !e.paid).reduce((sum, e) => sum + e.amount, 0);

  // --- Chart Data ---
  const chartData = mockBudgetPhase.map(phase => ({
    phase: phase.phase,
    Budgeted: phase.budgeted,
    Spent: phase.spent,
  }));

  // --- Render ---
  return (
    <div style={{ minHeight: "100vh", backgroundColor: PRIMARY_BG, fontFamily: FONT_FAMILY, color: TEXT_COLOR, padding: "40px" }}>
      
      {/* Header */}
      <h1 style={{ fontWeight: 700, fontSize: "2.5rem", marginBottom: "10px" }}>Accountant Console 💵</h1>
      <p style={{ color: SUBTLE_TEXT, marginBottom: "40px" }}>
        Manage expenses, track actual spending against budget, and generate reports.
      </p>

      {/* Financial Overview & Expense Entry */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "30px", marginBottom: "40px" }}>
        <div style={cardStyle}>
          <h2 style={{ margin: "0 0 20px 0", fontWeight: 600, fontSize: "1.5rem" }}>Current Financial Vitals</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <div style={{ padding: "10px", background: ACCENT_COLOR, borderRadius: "8px" }}>
              <p style={{ margin: 0, color: SUBTLE_TEXT }}>Total Remaining Budget</p>
              <h3 style={{ margin: "5px 0 0 0", color: SUCCESS_COLOR, fontSize: "1.8rem" }}>
                ${mockBudget.remaining.toLocaleString()}
              </h3>
            </div>
            <div style={{ padding: "10px", background: ACCENT_COLOR, borderRadius: "8px" }}>
              <p style={{ margin: 0, color: SUBTLE_TEXT }}>Unpaid Invoices</p>
              <h3 style={{ margin: "5px 0 0 0", color: WARNING_COLOR, fontSize: "1.8rem" }}>
                ${totalUnpaid.toLocaleString()}
              </h3>
            </div>
            <p style={{ color: WARNING_COLOR, fontSize: "0.9rem", marginTop: "10px" }}>
              ! Tracking ${mockBudget.deviation.toLocaleString()} over budget in **Crew Overtime** category.
            </p>
          </div>
        </div>

        <div style={cardStyle}>
          <h2 style={{ margin: "0 0 20px 0", fontWeight: 600, fontSize: "1.5rem" }}>Quick Expense Entry</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "15px" }}>
              <select name="category" value={newExpense.category} onChange={handleExpenseChange} style={inputStyle}>
                {['Crew', 'Location', 'Props', 'VFX', 'Equipment'].map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <select name="phase" value={newExpense.phase} onChange={handleExpenseChange} style={inputStyle}>
                {['Pre-Production', 'Production', 'Post-Production'].map(ph => <option key={ph} value={ph}>{ph}</option>)}
              </select>
              <input type="number" name="amount" placeholder="Amount ($)" value={newExpense.amount} onChange={handleExpenseChange} style={inputStyle} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "15px" }}>
              <input type="text" name="description" placeholder="Description (e.g., Catering Lunch)" value={newExpense.description} onChange={handleExpenseChange} style={inputStyle} />
              <button style={{ ...buttonStyle(true), width: "100%" }} onClick={handleAddExpense}>Log Expense</button>
            </div>
          </div>
        </div>
      </div>

      {/* Phase Budget Tracking */}
      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ margin: "0 0 20px 0", fontWeight: 600, fontSize: "1.8rem" }}>Budget Tracking by Production Phase 📈</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {mockBudgetPhase.map(data => {
            const percentSpent = Math.round((data.spent / data.budgeted) * 100);
            const statusColor = getPhaseColor(data.status);
            return (
              <div key={data.phase} style={cardStyle}>
                <h3 style={{ margin: "0 0 10px 0", fontSize: "1.4rem", color: TEXT_COLOR }}>{data.phase}</h3>
                <p style={{ margin: "0 0 5px 0", color: SUBTLE_TEXT, fontSize: "0.9rem" }}>Budgeted: ${data.budgeted.toLocaleString()}</p>
                <p style={{ margin: "0 0 15px 0", color: statusColor, fontWeight: 600 }}>
                  Spent: ${data.spent.toLocaleString()} ({percentSpent}%)
                </p>
                <div style={{ height: "8px", background: ACCENT_COLOR, borderRadius: "4px" }}>
                  <div style={{ width: `${percentSpent}%`, height: "100%", background: statusColor, borderRadius: "4px" }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expense & Payment List */}
      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ margin: "0 0 20px 0", fontWeight: 600, fontSize: "1.8rem" }}>Expense & Payment Tracking</h2>
        <div style={{ ...cardStyle, padding: "1.5rem" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr 2fr 100px 100px",
            gap: "20px", paddingBottom: "10px", borderBottom: `2px solid ${ACCENT_COLOR}`,
            marginBottom: "15px", color: SUBTLE_TEXT, fontWeight: 500, fontSize: "0.9rem",
          }}>
            <span>Phase</span>
            <span>Category</span>
            <span>Description</span>
            <span style={{ textAlign: "right" }}>Amount</span>
            <span style={{ textAlign: "center" }}>Status</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {expenses.map(item => (
              <div key={item.id} style={{
                display: "grid", gridTemplateColumns: "1fr 1fr 2fr 100px 100px",
                gap: "20px", alignItems: "center", padding: "8px 0", borderBottom: `1px dashed ${ACCENT_COLOR}`,
              }}>
                <span style={{ fontWeight: 500, color: SUBTLE_TEXT }}>{item.phase}</span>
                <span style={{ fontWeight: 600, color: ACTION_COLOR }}>{item.category}</span>
                <span style={{ color: TEXT_COLOR }}>{item.description}</span>
                <span style={{ textAlign: "right" }}>${item.amount.toLocaleString()}</span>
                <div style={{ textAlign: "center" }}>
                  <button
                    onClick={() => togglePaidStatus(item.id)}
                    style={{
                      ...buttonStyle(true),
                      background: item.paid ? SUCCESS_COLOR : WARNING_COLOR,
                      color: item.paid ? PRIMARY_BG : TEXT_COLOR,
                      padding: "5px 10px",
                      width: "80px",
                    }}
                  >
                    {item.paid ? "Paid ✅" : "Pending"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Budget vs Actual Chart & Report Export */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "30px" }}>
        <div style={{ ...cardStyle, minHeight: "300px" }}>
          <h2 style={{ margin: "0 0 15px 0", fontWeight: 600, fontSize: "1.5rem" }}>Budget vs. Actual Spend Chart</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid stroke={ACCENT_COLOR} strokeDasharray="5 5" />
              <XAxis dataKey="phase" stroke={SUBTLE_TEXT} />
              <YAxis stroke={SUBTLE_TEXT} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Budgeted" stroke={ACTION_COLOR} strokeWidth={2} />
              <Line type="monotone" dataKey="Spent" stroke={SUCCESS_COLOR} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={cardStyle}>
          <h2 style={{ margin: "0 0 20px 0", fontWeight: 600, fontSize: "1.5rem" }}>Generate Financial Reports</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <button style={buttonStyle(true)} onClick={() => alert("Exporting 'Budget vs Actual' to PDF...")}>
              Export Budget Report (PDF) 📄
            </button>
            <button style={{ ...buttonStyle(true), background: SUCCESS_COLOR }} onClick={() => alert("Exporting 'Expense Ledger' to Excel...")}>
              Export Expense Ledger (Excel) 💾
            </button>
            <p style={{ color: SUBTLE_TEXT, fontSize: "0.8rem", marginTop: "10px" }}>
              Reports generated based on data up to: {new Date().toLocaleDateString()}.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AccountantDashboard;
