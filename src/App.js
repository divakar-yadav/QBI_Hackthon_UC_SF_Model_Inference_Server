import React, { useState } from "react";
import axios from "axios";
import backgroundImage from "./assets/dna-analysis.png"; // ✅ Import from src

function App() {
  const [protein, setProtein] = useState("");
  const [smiles, setSmiles] = useState("");
  const [affinity, setAffinity] = useState(null);
  const [error, setError] = useState("");

  const handlePredict = async () => {
    setError("");
    setAffinity(null);

    if (!protein || !smiles) {
      setError("Both fields are required!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/predict-affinity", {
        protein_sequence: protein,
        smiles_string: smiles,
      });

      if (response.data.ic50_affinity !== undefined) {
        setAffinity(response.data.ic50_affinity);
      } else {
        setError("Error in response data.");
      }
    } catch (error) {
      setError("Failed to connect to server. Make sure backend is running.");
    }
  };

  return (
    <div>
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        fontFamily: "Arial",
        position: "relative",
        minHeight: "40vh",
      }}
    >
      <div className="title" style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
        Protein-Drug Affinity Predictor
      </div>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Enter Protein Sequence"
          value={protein}
          onChange={(e) => setProtein(e.target.value)}
          style={{ padding: "10px", width: "300px", marginBottom: "10px" }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Enter Drug SMILES String"
          value={smiles}
          onChange={(e) => setSmiles(e.target.value)}
          style={{ padding: "10px", width: "300px", marginBottom: "10px" }}
        />
      </div>

      <button
        onClick={handlePredict}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        Predict Affinity
      </button>
        </div>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      {affinity !== null && (
        <p style={{ color: "green", marginTop: "10px", fontSize: "18px" }}>
          Predicted IC50 Affinity Score: <b>{affinity}</b>
        </p>
      )}

      <img
      src={backgroundImage} // ✅ Local reference
        style={{
          backgroundImage: {backgroundImage}, // ✅ Local reference
          width: "300px",
          height: "300px",
          opacity: "0.8",
          margin: "auto",
          display: "flex",
          marginTop: 0,
        }}/>

    </div>
  );
}

export default App;
