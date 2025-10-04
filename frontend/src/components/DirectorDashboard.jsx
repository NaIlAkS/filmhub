import React, { useState } from "react";

const FONT_FAMILY = "Inter, sans-serif";
const PRIMARY_BG = "#101014";
const ACCENT_COLOR = "rgba(255, 255, 255, 0.15)";
const HOVER_COLOR = "rgba(255, 255, 255, 0.3)";
const TEXT_COLOR = "rgba(255, 255, 255, 0.9)";
const SUBTLE_TEXT = "rgba(255, 255, 255, 0.6)";

const API_BASE_URL = "http://127.0.0.1:8000/dashboard"; // Adjust to your Django URL

const DirectorDashboard = () => {
  const [scriptFile, setScriptFile] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [latestScriptId, setLatestScriptId] = useState(null);

  const [scheduleData, setScheduleData] = useState([
    { scene: "S1.T1", description: "Opening scene - dialogue", status: "complete" },
    { scene: "S1.T2", description: "Outdoor car chase", status: "in-progress" },
    { scene: "S2.T3", description: "Office conversation", status: "pending" },
  ]);

  const handleStatusUpdate = (index, newStatus) => {
    setScheduleData(prev =>
      prev.map((item, i) => (i === index ? { ...item, status: newStatus } : item))
    );
  };

  // --- Handle script upload and backend AI analysis ---
  const handleScriptUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setScriptFile(file);

    const formData = new FormData();
    formData.append('script_file', file);

    try {
      const response = await fetch(`${API_BASE_URL}/api/script-analysis/`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Uploaded: ${file.name} ✅. AI Analysis in progress/complete.`);
        setLatestScriptId(data.script_id);
        setAiAnalysis(data.analysis_data); // show analysis immediately if available
      } else {
        alert(`Upload failed: ${data.error || 'Server error'}`);
        console.error('Upload Error:', data);
      }
    } catch (error) {
      alert('Failed to connect to backend API.');
      console.error('Network or CORS error:', error);
    }
  };

  // --- View breakdown ---
  const handleViewBreakdown = async () => {
    if (!latestScriptId && !aiAnalysis) {
      alert("Please upload a script first or wait for analysis.");
      return;
    }

    if (aiAnalysis) {
      console.log("Stored AI Analysis:", aiAnalysis);
      alert("Breakdown Analysis available in console. Check developer tools for details.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/script-analysis/?script_id=${latestScriptId}`, {
        method: 'GET',
      });

      const data = await response.json();

      if (response.ok) {
        setAiAnalysis(data.analysis_result);
        alert(`Retrieved Analysis for ${data.filename}. Check console for full data.`);
        console.log("Retrieved AI Analysis:", data.analysis_result);
      } else {
        alert(`Failed to retrieve breakdown: ${data.error || 'Server error'}`);
      }
    } catch (error) {
      alert('Failed to connect to backend API for retrieval.');
      console.error('Network or CORS error:', error);
    }
  };

  const totalScenes = scheduleData.length;
  const completed = scheduleData.filter(s => s.status === "complete").length;
  const progress = Math.round((completed / totalScenes) * 100);

  const cardStyle = {
    padding: "2rem",
    borderRadius: "16px",
    background: "rgba(255, 255, 255, 0.02)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(15px)",
    WebkitBackdropFilter: "blur(15px)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
  };

  const buttonStyle = {
    padding: "12px 20px",
    borderRadius: "10px",
    background: ACCENT_COLOR,
    color: TEXT_COLOR,
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "1rem",
    fontFamily: FONT_FAMILY,
    transition: "0.2s ease-in-out",
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
      <h1 style={{ fontWeight: 700, fontSize: "2.5rem" }}>Director Dashboard 🎬</h1>
      <p style={{ color: SUBTLE_TEXT, marginBottom: "30px" }}>
        Manage your film workflow from pre-production to post-production.
      </p>

      {/* Overall Progress */}
      <div style={{ ...cardStyle, marginBottom: "30px" }}>
        <h2>Overall Progress</h2>
        <p style={{ color: SUBTLE_TEXT }}>
          {completed}/{totalScenes} scenes completed ({progress}%)
        </p>
        <div
          style={{
            height: "10px",
            width: "100%",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "#00cc66",
              transition: "width 0.3s ease-in-out",
            }}
          />
        </div>
      </div>

      {/* Pre-Production */}
      <div style={{ ...cardStyle, marginBottom: "30px" }}>
        <h2>Pre-Production</h2>
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          <label style={buttonStyle}>
            Upload Script 📄
            <input
              type="file"
              accept=".txt,.pdf"
              onChange={handleScriptUpload}
              style={{ display: "none" }}
            />
          </label>

          <button
            style={buttonStyle}
            onClick={() => alert("Analyzing script with Gemini AI... (Handled on server)")}
          >
            Analyze Script with AI 🤖
          </button>

          <button style={buttonStyle} onClick={handleViewBreakdown}>
            View Breakdown 📚
          </button>
        </div>

        {/* AI Analysis Result */}
        {aiAnalysis && (
          <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(0, 204, 102, 0.1)', borderRadius: '8px', borderLeft: '3px solid #00cc66' }}>
            <h4 style={{ color: '#00cc66', margin: '0 0 10px 0' }}>AI Breakdown Summary 🤖</h4>
            <p style={{ color: SUBTLE_TEXT, margin: 0 }}>
              Script: {scriptFile?.name || "N/A"}
            </p>
            {Array.isArray(aiAnalysis) ? (
              aiAnalysis.slice(0, 3).map((scene, i) => (
                <p key={i} style={{ margin: '5px 0', fontSize: '0.9rem' }}>
                  {scene.scene_no}: {scene.summary}
                </p>
              ))
            ) : (
              <p style={{ color: 'red' }}>Analysis Error: {aiAnalysis.error || "See console for details."}</p>
            )}
            <p style={{ margin: '10px 0 0 0', fontWeight: 600 }}>Total Scenes Identified: {Array.isArray(aiAnalysis) ? aiAnalysis.length : 'N/A'}.</p>
          </div>
        )}
      </div>

      {/* Production */}
      <div style={{ ...cardStyle, marginBottom: "30px" }}>
        <h2>Production</h2>
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          <button style={buttonStyle} onClick={() => alert("Viewing charting details...")}>
            View Charting 📅
          </button>
          <button style={buttonStyle} onClick={() => alert("Generating call sheets...")}>
            Generate Call Sheet 📞
          </button>
        </div>
      </div>

      {/* Post-Production */}
      <div style={{ ...cardStyle, marginBottom: "30px" }}>
        <h2>Post-Production</h2>
        <textarea
          placeholder="Add notes for post-production team..."
          style={{
            width: "100%",
            minHeight: "100px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            color: TEXT_COLOR,
            fontFamily: FONT_FAMILY,
            padding: "10px",
          }}
        />
        <button
          style={{ ...buttonStyle, marginTop: "10px" }}
          onClick={() => alert("Notes submitted to post-production team.")}
        >
          Submit Notes 📤
        </button>
      </div>

      {/* Scene Status */}
      <div style={{ ...cardStyle }}>
        <h2>Today's Shooting Schedule</h2>
        {scheduleData.map((item, index) => (
          <div
            key={index}
            style={{
              marginTop: "15px",
              padding: "15px",
              background: "rgba(255,255,255,0.02)",
              borderRadius: "10px",
            }}
          >
            <h3>{item.scene}</h3>
            <p style={{ color: SUBTLE_TEXT }}>{item.description}</p>
            <select
              value={item.status}
              onChange={(e) => handleStatusUpdate(index, e.target.value)}
              style={{
                background: "rgba(255,255,255,0.05)",
                color: TEXT_COLOR,
                border: "1px solid rgba(255,255,255,0.1)",
                padding: "8px",
                borderRadius: "8px",
                fontFamily: FONT_FAMILY,
              }}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="complete">Complete</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DirectorDashboard;
