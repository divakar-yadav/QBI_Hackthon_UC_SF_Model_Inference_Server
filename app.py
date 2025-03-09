from flask import Flask, request, jsonify
import random
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

@app.route('/')
def home():
    return "Protein-Drug Affinity Prediction API is running!"

@app.route('/predict-affinity', methods=['POST'])
def predict_affinity():
    try:
        data = request.get_json()
        protein_sequence = data.get('protein_sequence', '')
        smiles_string = data.get('smiles_string', '')

        if not protein_sequence or not smiles_string:
            return jsonify({'error': 'Both protein sequence and SMILES string are required'}), 400

        # Generate a mock IC50 affinity score
        affinity_score = round(random.uniform(1, 100), 2)

        return jsonify({'ic50_affinity': affinity_score})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
