import React, { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  // Removed Legend since it wasn't used in the old component's example charts
} from "recharts";

// Theme Colors
const FONT_FAMILY = "Inter, sans-serif";
const PRIMARY_BG = "#101014";
const ACCENT_COLOR = "rgba(255, 255, 255, 0.15)";
const HOVER_COLOR = "rgba(255, 255, 255, 0.3)"; // Added back from old component
const TEXT_COLOR = "rgba(255, 255, 255, 0.9)";
const SUBTLE_TEXT = "rgba(255, 255, 255, 0.6)";
const SUCCESS_COLOR = "#00cc66";
const WARNING_COLOR = "#ffcc00";

// --- MOCK DATA FOR CHARTS & DASHBOARD STATE (Merged) ---

// From old component (used for overall progress/charts)
const budgetData = [
  { name: "Planned", amount: 1500000 },
  { name: "Spent", amount: 450000 },
];

const taskData = [
  { department: "Art", progress: 85 },
  { department: "Camera", progress: 65 },
  { department: "VFX", progress: 10 },
];

const sceneData = [
  { day: "Day 1", completed: 3 },
  { day: "Day 2", completed: 2 },
  { day: "Day 3", completed: 4 },
  { day: "Day 4", completed: 3 },
  { day: "Day 5", completed: 6 },
];

const ProducerDashboard = () => {
  // State from new component
  const [script, setScript] = useState("");
  const [breakdown, setBreakdown] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [callSheet, setCallSheet] = useState([]);
  const [postProgress, setPostProgress] = useState([
    { stage: "Editing", progress: 30 },
    { stage: "Sound Mixing", progress: 20 },
    { stage: "VFX", progress: 10 },
  ]);

  // State from old component
  const [approvals, setApprovals] = useState([
    { id: 1, item: "Camera Gear Rental Extension", amount: 8500, status: "pending" },
    { id: 2, item: "Hedgehog Trainer Fee", amount: 1500, status: "approved" },
    { id: 3, item: "Location Permit - Street 5", amount: 3200, status: "pending" },
  ]);

  const projectProgress = {
    totalScenes: 45,
    scenesCompleted: 18,
    budgeted: 1500000,
    spent: 450000,
  };

  // --- STYLES & HANDLERS (Merged) ---

  const cardStyle = {
    padding: "2rem",
    borderRadius: "16px",
    background: "rgba(255, 255, 255, 0.02)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(15px)", // Added back from old component
    WebkitBackdropFilter: "blur(15px)", // Added back from old component
    border: "1px solid rgba(255, 255, 255, 0.05)",
    color: SUBTLE_TEXT,
  };

  // Combined button style for primary/warning/secondary use
  const buttonStyle = (isPrimary, isWarning) => ({
    padding: "10px 15px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "0.9rem",
    fontFamily: FONT_FAMILY,
    transition: "0.2s ease-in-out",
    color: PRIMARY_BG, // Primary and Warning buttons have dark text
    background: isWarning ? WARNING_COLOR : isPrimary ? SUCCESS_COLOR : ACCENT_COLOR,
    marginLeft: "10px",
    // Ensure the basic style from the new component for 'Analyze Script' is also covered
    ...(isPrimary && !isWarning ? { padding: "10px 20px" } : {}),
  });

  // Handler from old component for approvals
  const handleApproval = (id) => {
    setApprovals((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "approved" } : item
      )
    );
  };

  // Handler from new component for script analysis
  const handleAnalyzeScript = async () => {
    if (!script) return alert("Please paste or upload a script first!");
    // Simulate AI response
    const fakeBreakdown = {
      estimatedBudget: 1200000,
      totalScenes: 45,
      locations: ["Beach", "Cafe", "Studio"],
      keyProps: ["Camera", "Car", "Costume Set"],
    };
    setBreakdown(fakeBreakdown);

    // Simulate schedule grouping by location proximity
    setSchedule([
      { day: "Day 1", location: "Beach", scenes: [1, 2, 3] },
      { day: "Day 2", location: "Cafe", scenes: [4, 5] },
      { day: "Day 3", location: "Studio", scenes: [6, 7, 8] },
    ]);

    // Generate sample call sheet
    setCallSheet([
      { day: "Day 1", callTime: "7:00 AM", location: "Beach" },
      { day: "Day 2", callTime: "8:00 AM", location: "Cafe" },
    ]);
  };

  // Calculations from old component
  const progressPercent = Math.round(
    (projectProgress.scenesCompleted / projectProgress.totalScenes) * 100
  );
  const budgetPercent = Math.round(
    (projectProgress.spent / projectProgress.budgeted) * 100
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: PRIMARY_BG,
        fontFamily: FONT_FAMILY,
        color: TEXT_COLOR,
        padding: "40px",
      }}
    >
      {/* Header */}
      <h1 style={{ fontWeight: 700, fontSize: "2.5rem", marginBottom: "10px" }}>
        Producer Dashboard 🎬
      </h1>
      <p style={{ color: SUBTLE_TEXT, marginBottom: "40px" }}>
        Monitor high-level project vitals, manage pre-production, and approve critical expenditures.
      </p>

      {/* --- Overall Progress View (From Old Component) --- */}
      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ margin: "0 0 20px 0", fontWeight: 600, fontSize: "1.8rem", color: TEXT_COLOR }}>
          Overall Project Progress Vitals
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {/* Budget Status */}
          <div style={cardStyle}>
            <p style={{ margin: 0 }}>Budget Spent</p>
            <h3 style={{ fontSize: "2rem", margin: "5px 0" }}>
              ${(projectProgress.spent / 1000).toFixed(1)}k
            </h3>
            <p style={{ margin: 0, fontSize: "0.9rem" }}>
              of ${projectProgress.budgeted / 1000}k total
            </p>
            <div
              style={{
                height: "8px",
                background: ACCENT_COLOR,
                borderRadius: "4px",
                marginTop: "15px",
              }}
            >
              <div
                style={{
                  width: `${budgetPercent}%`,
                  height: "100%",
                  background: budgetPercent > 70 ? WARNING_COLOR : SUCCESS_COLOR,
                  borderRadius: "4px",
                  transition: "width 1.5s ease-in-out",
                }}
              />
            </div>
            <span
              style={{
                fontSize: "0.8rem",
                color: SUBTLE_TEXT,
                float: "right",
                marginTop: "5px",
              }}
            >
              {budgetPercent}% Used
            </span>
          </div>

          {/* Scene Completion Status */}
          <div style={cardStyle}>
            <p style={{ margin: 0 }}>Scene Completion</p>
            <h3 style={{ fontSize: "2rem", margin: "5px 0" }}>
              {projectProgress.scenesCompleted}
            </h3>
            <p style={{ margin: 0, fontSize: "0.9rem" }}>
              of {projectProgress.totalScenes} scenes shot
            </p>
            <div
              style={{
                height: "8px",
                background: ACCENT_COLOR,
                borderRadius: "4px",
                marginTop: "15px",
              }}
            >
              <div
                style={{
                  width: `${progressPercent}%`,
                  height: "100%",
                  background: SUCCESS_COLOR,
                  borderRadius: "4px",
                  transition: "width 1.5s ease-in-out",
                }}
              />
            </div>
            <span
              style={{
                fontSize: "0.8rem",
                color: SUBTLE_TEXT,
                float: "right",
                marginTop: "5px",
              }}
            >
              {progressPercent}% Complete
            </span>
          </div>
        </div>
      </div>

      {/* --- PRE-PRODUCTION (From New Component) --- */}
      <div style={{ ...cardStyle, marginBottom: "40px" }}>
        <h2 style={{ fontSize: "1.8rem", color: TEXT_COLOR }}>Pre-Production 📑</h2>
        <p>Upload or paste script for automatic breakdown & budget estimation using **Gemini AI**.</p>
        <textarea
          placeholder="Paste your script here..."
          value={script}
          onChange={(e) => setScript(e.target.value)}
          style={{
            width: "100%",
            minHeight: "120px",
            borderRadius: "10px",
            padding: "10px",
            background: ACCENT_COLOR,
            color: TEXT_COLOR,
            border: "none",
            marginTop: "10px",
          }}
        />
        <button
          onClick={handleAnalyzeScript}
          style={{ ...buttonStyle(true, false), marginTop: "15px", marginLeft: "0px" }} // Explicitly setting primary/not warning
        >
          Analyze Script with Gemini AI
        </button>

        {breakdown && (
          <div style={{ marginTop: "20px" }}>
            <h3>📊 AI Breakdown Result</h3>
            <p>Estimated Budget: **${breakdown.estimatedBudget.toLocaleString()}**</p>
            <p>Total Scenes: **{breakdown.totalScenes}**</p>
            <p>Locations: {breakdown.locations.join(", ")}</p>
            <p>Key Props: {breakdown.keyProps.join(", ")}</p>
          </div>
        )}
      </div>

      {/* --- PRODUCTION (From New Component) --- */}
      <div style={{ ...cardStyle, marginBottom: "40px" }}>
        <h2 style={{ fontSize: "1.8rem", color: TEXT_COLOR }}>Production Logistics 🎥</h2>
        <p>View automatically generated shooting schedule and daily call sheets.</p>

        {(schedule.length > 0 || callSheet.length > 0) ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", marginTop: "20px" }}>
            {/* Shooting Schedule */}
            {schedule.length > 0 && (
              <div>
                <h3 style={{ color: TEXT_COLOR, margin: "0 0 10px 0" }}>Shooting Schedule</h3>
                <ul style={{ paddingLeft: "20px", margin: 0 }}>
                  {schedule.map((day) => (
                    <li key={day.day} style={{ marginBottom: "5px" }}>
                      <b>{day.day}</b> — {day.location} (Scenes: {day.scenes.join(", ")})
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Call Sheets */}
            {callSheet.length > 0 && (
              <div>
                <h3 style={{ color: TEXT_COLOR, margin: "0 0 10px 0" }}>Call Sheets</h3>
                <ul style={{ paddingLeft: "20px", margin: 0 }}>
                  {callSheet.map((sheet) => (
                    <li key={sheet.day} style={{ marginBottom: "5px" }}>
                      <b>{sheet.day}</b> — Call Time: {sheet.callTime} — Location: {sheet.location}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <p style={{ marginTop: "10px" }}>Run the Script Analysis to generate schedule and call sheets.</p>
        )}
      </div>

      {/* --- Budget Approval Flow (From Old Component) --- */}
      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ margin: "0 0 20px 0", fontWeight: 600, fontSize: "1.8rem", color: TEXT_COLOR }}>
          Major Budget Approvals 💰
        </h2>
        <div style={{ ...cardStyle, padding: "1.5rem" }}>
          {approvals.filter(item => item.status === "pending").length === 0 && approvals.length > 0 ? (
            <p style={{ margin: 0, color: SUCCESS_COLOR }}>All pending approvals completed! ✅</p>
          ) : approvals.length === 0 ? (
            <p style={{ margin: 0 }}>No approvals required at this time.</p>
          ) : (
            approvals.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 0",
                  borderBottom: `1px solid ${ACCENT_COLOR}`,
                  opacity: item.status === "approved" ? 0.6 : 1,
                  // Removed the last item's border-bottom logic for simplicity, relying on opacity
                }}
              >
                <div style={{ flexGrow: 1 }}>
                  <span style={{ fontWeight: 500, color: TEXT_COLOR }}>{item.item}</span>
                  <span style={{ marginLeft: "15px", color: item.status === "approved" ? SUBTLE_TEXT : WARNING_COLOR }}>
                    **${item.amount.toLocaleString()}**
                  </span>
                </div>
                <div style={{ minWidth: "150px", textAlign: "right" }}>
                  {item.status === "pending" ? (
                    <button
                      style={{ ...buttonStyle(false, true), marginLeft: "0px" }} // isPrimary=false, isWarning=true
                      onClick={() => handleApproval(item.id)}
                    >
                      Approve
                    </button>
                  ) : (
                    <span style={{ color: SUCCESS_COLOR, fontWeight: 500, fontSize: "0.9rem" }}>
                      Approved ✅
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* --- POST-PRODUCTION (From New Component) --- */}
      <div style={{ ...cardStyle, marginBottom: "40px" }}>
        <h2 style={{ fontSize: "1.8rem", color: TEXT_COLOR }}>Post-Production Progress 🎞️</h2>
        <p>Track editing, sound, and VFX completion progress toward final delivery.</p>
        <div style={{ display: "grid", gap: "20px", marginTop: "20px" }}>
          {postProgress.map((stage) => (
            <div key={stage.stage}>
              <p style={{ margin: "0 0 5px 0", color: TEXT_COLOR }}>
                {stage.stage} <span style={{ float: "right", fontWeight: 600, color: SUCCESS_COLOR }}>{stage.progress}%</span>
              </p>
              <div
                style={{
                  height: "8px",
                  background: ACCENT_COLOR,
                  borderRadius: "4px",
                }}
              >
                <div
                  style={{
                    width: `${stage.progress}%`,
                    height: "100%",
                    background: stage.progress < 25 ? WARNING_COLOR : SUCCESS_COLOR,
                    borderRadius: "4px",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Charts View (From Old Component) --- */}
      <div>
        <h2 style={{ margin: "0 0 20px 0", fontWeight: 600, fontSize: "1.8rem", color: TEXT_COLOR }}>
          Project Analytics
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {/* Budget Chart */}
          <div style={cardStyle}>
            <h3 style={{ margin: 0, color: TEXT_COLOR, marginBottom: "10px" }}>Budget vs Actual Spend 📊</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={budgetData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={ACCENT_COLOR} />
                <XAxis dataKey="name" stroke={SUBTLE_TEXT} />
                <YAxis stroke={SUBTLE_TEXT} tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip />
                <Bar dataKey="amount" fill={SUCCESS_COLOR} animationDuration={1000} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Task Progress Chart */}
          <div style={cardStyle}>
            <h3 style={{ margin: 0, color: TEXT_COLOR, marginBottom: "10px" }}>Task Progress by Department ⚙️</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={taskData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={ACCENT_COLOR} />
                <XAxis dataKey="department" stroke={SUBTLE_TEXT} />
                <YAxis stroke={SUBTLE_TEXT} tickFormatter={(value) => `${value}%`} />
                <Tooltip />
                <Bar dataKey="progress" fill={WARNING_COLOR} animationDuration={1000} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Scene Completion Chart */}
          <div style={cardStyle}>
            <h3 style={{ margin: 0, color: TEXT_COLOR, marginBottom: "10px" }}>Scene Completion Rate 🎬</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={sceneData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={ACCENT_COLOR} />
                <XAxis dataKey="day" stroke={SUBTLE_TEXT} />
                <YAxis stroke={SUBTLE_TEXT} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke={SUCCESS_COLOR}
                  strokeWidth={3}
                  animationDuration={1000}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProducerDashboard;