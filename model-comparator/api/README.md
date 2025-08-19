# Model Comparator API

A FastAPI-based REST API for comparing responses from different Large Language Models (LLMs).

## Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Run the API

```bash
python run.py
```

The API will start on `http://localhost:8000`

### 3. Access API Documentation

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## API Endpoints

### Core Endpoints

| Method | Endpoint          | Description                             |
| ------ | ----------------- | --------------------------------------- |
| `GET`  | `/`               | API information and available endpoints |
| `GET`  | `/api/v1/models`  | List all available models               |
| `POST` | `/api/v1/compare` | Compare responses from selected models  |
| `GET`  | `/api/v1/health`  | Health check endpoint                   |

## Usage Examples

### Compare Models

```bash
curl -X POST "http://localhost:8000/api/v1/compare" \
     -H "Content-Type: application/json" \
     -d '{
       "prompt": "What is the capital of France?",
       "model_names": ["Llama3.2", "Llama2"]
     }'
```

### List Available Models

```bash
curl "http://localhost:8000/api/v1/models"
```

## Configuration

The API can be configured using environment variables:

| Variable       | Default   | Description                            |
| -------------- | --------- | -------------------------------------- |
| `HOST`         | `0.0.0.0` | Server host address                    |
| `PORT`         | `8000`    | Server port                            |
| `DEBUG`        | `false`   | Enable debug mode                      |
| `CORS_ORIGINS` | `*`       | CORS allowed origins (comma-separated) |
| `LOG_LEVEL`    | `INFO`    | Logging level                          |

## Development

### Project Structure

```
api/
├── main.py          # Main FastAPI application
├── config.py        # Configuration and settings
├── run.py           # Startup script
├── requirements.txt # Python dependencies
└── README.md        # This file
```

### Adding New Model Types

1. Create a new model class in `../compare_llm/models.py`
2. Implement the `ModelInterface` abstract class
3. Init your model in the `CompareLLM` class in `../compare_llm/compare_llm.py`

### Running Tests

```bash
python test_api.py
```

## Model Types

The API comes with pre-configured models that users can choose from:

### MockModel

A testing model that returns predefined responses with configurable delays.

### OpenAICompatibleModel

A model that works with OpenAI-compatible APIs (OpenAI, Azure OpenAI, etc.).
