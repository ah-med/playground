# Model Comparator

Compare responses from different Large Language Models (LLMs).

## Project Structure
```
model-comparator/
├── app/                 # Vue.js Frontend
│   ├── src/
│   │   ├── components/ # Vue components
│   │   ├── services/   # API service layer
│   │   └── App.vue     # Main application
├── api/                 # FastAPI Backend
│   ├── main.py         # API endpoints
│   ├── config.py       # Configuration
│   └── requirements.txt # Python dependencies
└── compare_llm/        # LLM comparison logic
```

## Setup & Installation

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. **Navigate to API directory**:
   ```bash
   cd model-comparator/api
   ```

2. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Start the FastAPI server**:
   ```bash
   python run.py
   ```
   
   The API will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to app directory**:
   ```bash
   cd model-comparator/app
   ```

2. **Install Node.js dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   
   The frontend will be available at `http://localhost:5173`

## API Endpoints

### GET `/api/v1/models`
Returns list of available LLM models.

### POST `/api/v1/compare`
Compare responses from selected models.

**Request Body**:
```json
{
  "prompt": "Your question here",
  "model_names": ["model1", "model2"]
}
```

### GET `/api/v1/health`
Health check endpoint.

## Config

### api/config.py
Edit `api/config.py` to modify Server host/port, CORS settings, Debug mode, and Log levels.

### app/src/services/api.js
Edit `app/src/services/api.js` to modify API base URL for the frontend.
