import React, { useState } from "react";

// Theme Colors
const FONT_FAMILY = "Inter, sans-serif";
const PRIMARY_BG = "#101014";
const ACCENT_COLOR = "rgba(255, 255, 255, 0.15)";
const HOVER_COLOR = "rgba(255, 255, 255, 0.3)";
const TEXT_COLOR = "rgba(255, 255, 255, 0.9)";
const SUBTLE_TEXT = "rgba(255, 255, 255, 0.6)";
const ACTION_COLOR = "#0099ff";
const SUCCESS_COLOR = "#00cc66";
const WARNING_COLOR = "#ffcc00";

const ProductionManagerDashboard = () => {
  // State for AI Breakdown Panel
  const [script, setScript] = useState("");
  const [breakdown, setBreakdown] = useState(null);
  
  // State for Post-Production Tracking
  const [postProgress, setPostProgress] = useState([
    { stage: "Picture Lock", progress: 60, status: "in-progress" },
    { stage: "Sound Mix", progress: 20, status: "pending" },
    { stage: "VFX Shots", progress: 10, status: "in-progress" },
  ]);

  const [schedule, setSchedule] = useState([
    { id: 'S1.T4', scene: "Hedgehog in a cage - Close up", director: "Jane Doe", location: "Studio 2, Set A", status: "complete", shotProgress: 100 },
    { id: 'S1.T5', scene: "The Director's breakdown", director: "Jane Doe", location: "Studio 1, Office Set", status: "in-progress", shotProgress: 75 },
    { id: 'S2.T1', scene: "Chase sequence start", director: "John Smith", location: "Backlot, Street 5", status: "in-progress", shotProgress: 30 },
    { id: 'S2.T2', scene: "Warehouse shootout", director: "John Smith", location: "New Location: Warehouse", status: "pending", shotProgress: 0 },
  ]);

  const crew = ["Jane Doe (Director)", "John Smith (Director)", "Alex Chen (DP)", "Ben Willis (Sound)"];
  const locations = ["Studio 2, Set A", "Studio 1, Office Set", "Backlot, Street 5", "New Location: Warehouse"];

  const resourceData = [
    { item: "Camera: ARRI Alexa Mini", quantity: 3, available: 1 },
    { item: "Sound Mixer: Zoom F8", quantity: 2, available: 2 },
    { item: "Lighting: Aputure 600D", quantity: 6, available: 4 },
  ];

  // --- STYLES ---
  const inputStyle = {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    outline: "none",
    background: "rgba(255, 255, 255, 0.05)",
    color: TEXT_COLOR,
    fontFamily: FONT_FAMILY,
    fontSize: "0.9rem",
    width: "100%",
    boxSizing: "border-box",
  };

  const primaryButtonStyle = {
    padding: "12px 20px",
    borderRadius: "10px",
    background: ACTION_COLOR,
    color: PRIMARY_BG,
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "1rem",
    fontFamily: FONT_FAMILY,
    transition: "0.2s ease-in-out",
    width: "100%",
    textAlign: "center",
  };

  const cardStyle = {
    padding: "2rem",
    borderRadius: "16px",
    background: "rgba(255, 255, 255, 0.02)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(15px)",
    WebkitBackdropFilter: "blur(15px)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
  };

  // --- HANDLERS ---
  const handleAssignmentChange = (id, field, value) => {
    setSchedule(prevSchedule =>
      prevSchedule.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleCallSheetCreation = () => {
    alert("Call sheets generated successfully for all pending and in-progress scenes!");
  };
  
  const handleAnalyzeScript = async () => {
    if (!script) return alert("Please paste or upload a script first!");
    // Simulate AI response, customized for the user's known project element (Hedgehog)
    const fakeBreakdown = {
      estimatedBudget: 950000,
      estimatedShootDays: 14,
      totalScenes: 30,
      keyProps: ["Trained Hedgehog", "Custom Cage", "Stunt Double Rig"],
      specialNotes: "High risk scenes: Chase sequence, Hedgehog required on Day 3."
    };
    setBreakdown(fakeBreakdown);
  };

  // --- CALCULATIONS ---
  const totalScenes = schedule.length;
  const scenesComplete = schedule.filter(s => s.status === "complete").length;
  const progressPercent = Math.round((scenesComplete / totalScenes) * 100);

  const getStatusColor = (status) => {
    switch (status) {
      case 'complete': return SUCCESS_COLOR;
      case 'in-progress': return ACTION_COLOR;
      case 'pending': return WARNING_COLOR;
      default: return SUBTLE_TEXT;
    }
  };

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
        Production Manager Console 🎬
      </h1>
      <p style={{ color: SUBTLE_TEXT, marginBottom: "40px" }}>
        Full control over daily operations, scheduling, and resource management.
      </p>

      {/* ---------------------------------- */}
      {/* TOP ROW: ACTION, RESOURCES, PRE-PRODUCTION ANALYTICS */}
      {/* ---------------------------------- */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.5fr", gap: "30px", marginBottom: "40px" }}>
        
        {/* ACTION & OVERVIEW */}
        <div style={cardStyle}>
          <h2 style={{ margin: "0 0 20px 0", fontWeight: 600, fontSize: "1.5rem" }}>
            Daily Operations
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <button
              style={{ ...primaryButtonStyle, background: ACTION_COLOR }}
              onClick={handleCallSheetCreation}
            >
              Generate Daily Call Sheets 📝
            </button>
            <button
              style={{ ...primaryButtonStyle, background: ACCENT_COLOR, color: TEXT_COLOR }}
              onClick={() => alert("Creating new schedule entry...")}
            >
              + Add New Scene to Schedule
            </button>
            <p style={{ color: SUBTLE_TEXT, fontSize: "0.9rem", textAlign: "center", marginTop: "10px" }}>
              Call sheets cover **{schedule.filter(s => s.status !== 'complete').length}** scenes.
            </p>
          </div>
        </div>

        {/* EQUIPMENT & RESOURCE CHECK */}
        <div style={cardStyle}>
          <h2 style={{ margin: "0 0 20px 0", fontWeight: 600, fontSize: "1.5rem" }}>
            Equipment & Resource Check
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {resourceData.map((res, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px",
                  borderBottom: `1px solid ${ACCENT_COLOR}`,
                }}
              >
                <span style={{ fontWeight: 400 }}>{res.item}</span>
                <span
                  style={{
                    fontWeight: 600,
                    color: res.available > 0 ? SUCCESS_COLOR : WARNING_COLOR,
                  }}
                >
                  {res.available} / {res.quantity} Available
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* PRE-PRODUCTION ANALYTICS (NEW) */}
        <div style={cardStyle}>
          <h2 style={{ margin: "0 0 15px 0", fontWeight: 600, fontSize: "1.5rem" }}>
            Pre-Production Analytics 🧠
          </h2>
          {breakdown ? (
            <div style={{ fontSize: "0.9rem" }}>
                <p style={{ margin: "5px 0" }}>Total Scenes: **{breakdown.totalScenes}**</p>
                <p style={{ margin: "5px 0" }}>Est. Shoot Days: **{breakdown.estimatedShootDays}**</p>
                <p style={{ margin: "5px 0" }}>Key Props: **{breakdown.keyProps.join(", ")}**</p>
                <p style={{ margin: "10px 0 0 0", color: WARNING_COLOR }}>*Note: {breakdown.specialNotes}*</p>
            </div>
          ) : (
            <>
              <textarea
                placeholder="Paste script sections for AI breakdown..."
                value={script}
                onChange={(e) => setScript(e.target.value)}
                style={{ ...inputStyle, minHeight: "80px", marginBottom: "15px" }}
              />
              <button
                style={{ ...primaryButtonStyle, background: SUCCESS_COLOR, color: PRIMARY_BG, padding: "10px 20px" }}
                onClick={handleAnalyzeScript}
              >
                AI Scene Breakdown (Gemini)
              </button>
            </>
          )}
        </div>
      </div>

      {/* ---------------------------------- */}
      {/* SCENE MANAGEMENT & PROGRESS TRACKING */}
      {/* ---------------------------------- */}
      <div style={{ ...cardStyle, marginBottom: "40px" }}>
        <h2 style={{ margin: "0 0 25px 0", fontWeight: 600, fontSize: "1.8rem" }}>
          Scene Management & Progress Tracking
        </h2>

        {/* Schedule List Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "80px 1.5fr 1fr 1fr 1fr",
            gap: "20px",
            paddingBottom: "10px",
            borderBottom: `2px solid ${ACCENT_COLOR}`,
            marginBottom: "15px",
            color: SUBTLE_TEXT,
            fontWeight: 500,
            fontSize: "0.9rem",
          }}
        >
          <span>ID</span>
          <span>Description</span>
          <span>Director</span>
          <span>Location</span>
          <span>Shot Progress</span>
        </div>

        {/* Schedule List Items (with in-progress bar) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {schedule.map(item => (
            <div
              key={item.id}
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1.5fr 1fr 1fr 1fr",
                gap: "20px",
                alignItems: "center",
                opacity: item.status === 'complete' ? 0.5 : 1,
              }}
            >
              <span style={{ fontWeight: 600, color: getStatusColor(item.status) }}>{item.id}</span>
              <span style={{ color: TEXT_COLOR }}>{item.scene}</span>

              {/* Director Dropdown */}
              <div>
                <select
                  value={item.director}
                  onChange={e => handleAssignmentChange(item.id, 'director', e.target.value)}
                  style={inputStyle}
                  disabled={item.status === 'complete'}
                >
                  {crew.filter(c => c.includes("Director")).map(c => (
                    <option key={c} value={c.split(' ')[0]}>{c.split(' ')[0]}</option>
                  ))}
                </select>
              </div>

              {/* Location Dropdown */}
              <div>
                <select
                  value={item.location}
                  onChange={e => handleAssignmentChange(item.id, 'location', e.target.value)}
                  style={inputStyle}
                  disabled={item.status === 'complete'}
                >
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              
              {/* Progress Bar (NEW) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ height: "6px", background: ACCENT_COLOR, borderRadius: "3px", flexGrow: 1 }}>
                  <div
                    style={{
                      width: `${item.shotProgress}%`,
                      height: "100%",
                      background: getStatusColor(item.status),
                      borderRadius: "3px",
                    }}
                  />
                </div>
                <span style={{ fontSize: "0.8rem", minWidth: '40px', textAlign: 'right', color: getStatusColor(item.status) }}>
                  {item.shotProgress}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ---------------- */}
        {/* OVERALL PROGRESS BAR */}
        {/* ---------------- */}
        <div style={{ marginTop: "30px" }}>
          <p style={{ marginBottom: "8px", fontWeight: 600 }}>Overall Scene Completion ({scenesComplete} of {totalScenes})</p>
          <div style={{ height: "12px", background: ACCENT_COLOR, borderRadius: "6px" }}>
            <div
              style={{
                width: `${progressPercent}%`,
                height: "100%",
                background: SUCCESS_COLOR,
                borderRadius: "6px",
                transition: "width 1s ease-in-out",
              }}
            />
          </div>
          <span style={{ color: SUBTLE_TEXT, fontSize: "0.85rem" }}>
            **{progressPercent}%** Complete
          </span>
        </div>
      </div>

      {/* ---------------------------------- */}
      {/* POST-PRODUCTION TRACKING (NEW) */}
      {/* ---------------------------------- */}
      <div style={cardStyle}>
        <h2 style={{ fontSize: "1.8rem", color: TEXT_COLOR }}>Post-Production Tracking 🎞️</h2>
        <p style={{ color: SUBTLE_TEXT, marginBottom: "20px" }}>Track progress of key post-production stages.</p>
        <div style={{ display: "grid", gap: "25px", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
          {postProgress.map((stage) => (
            <div key={stage.stage} style={{ border: `1px solid ${ACCENT_COLOR}`, padding: "15px", borderRadius: "10px" }}>
              <p style={{ margin: "0 0 10px 0", color: TEXT_COLOR, fontWeight: 500 }}>
                {stage.stage}
                <span style={{ float: "right", fontWeight: 600, color: getStatusColor(stage.status) }}>{stage.progress}%</span>
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
                    background: getStatusColor(stage.status),
                    borderRadius: "4px",
                  }}
                />
              </div>
              <span style={{ fontSize: "0.8rem", color: SUBTLE_TEXT, marginTop: "5px", display: "block" }}>
                Status: {stage.status.charAt(0).toUpperCase() + stage.status.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductionManagerDashboard;