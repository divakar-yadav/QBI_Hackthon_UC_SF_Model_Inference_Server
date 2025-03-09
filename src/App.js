import React, { useState } from "react";
import "./App.css"; // ✅ Import CSS file
import backgroundImage from "./assets/dna-analysis.png"; // ✅ Import from src

function App() {
  const [protein, setProtein] = useState("");
  const [smiles, setSmiles] = useState("");
  const [affinity, setAffinity] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const handlePredict = async () => {
    setError("");
    setAffinity(null);
    setLoading(true);

    if (!protein || !smiles) {
      setError("Both fields are required!");
      setLoading(false);
      return;
    }

    // Fake loading steps
    setLoadingMessage("Creating the embeddings...");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setLoadingMessage("Model is predicting...");
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setLoadingMessage("Building response...");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      // Simulating API call with a random affinity score
      const fakeAffinityScore = (Math.random() * 1000).toFixed(2); // Between 0 and 1000
      setAffinity(fakeAffinityScore);
    } catch (error) {
      setError("Failed to connect to server. Make sure backend is running.");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <div className="title">Protein-Drug Affinity Predictor</div>

      <div className="input-container">
        <input
          type="text"
          placeholder="Enter Protein Sequence"
          value={protein}
          onChange={(e) => setProtein(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="input-container">
        <input
          type="text"
          placeholder="Enter Drug SMILES String"
          value={smiles}
          onChange={(e) => setSmiles(e.target.value)}
          disabled={loading}
        />
      </div>

      <button onClick={handlePredict} disabled={loading}>
        {loading ? "Predicting..." : "Predict Affinity"}
      </button>

      {/* Show loading messages */}
      {loading && <p className="loading-text">{loadingMessage}</p>}

      {/* Show error if any */}
      {error && <p className="error-text">{error}</p>}

      {/* Show affinity result */}
      {affinity !== null && !loading && (
        <p className="result-text">
          Predicted IC50 Affinity Score: <b>{affinity}</b>
        </p>
      )}

      {/* ✅ Keeps the image at the bottom */}
      <div className="image-container">
        <img src={backgroundImage} alt="DNA Analysis" />
      </div>
    </div>
  );
}

export default App;
