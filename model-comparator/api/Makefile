.PHONY: help install run test clean lint format

# Default target
help:
	@echo "Model Comparator API - Available commands:"
	@echo ""
	@echo "  install    - Install Python dependencies"
	@echo "  run        - Start the API server"
	@echo "  test       - Run API tests"
	@echo "  clean      - Clean up Python cache files"
	@echo "  lint       - Run linting checks"
	@echo "  format     - Format code with black"
	@echo "  docs       - Open API documentation in browser"
	@echo ""

# Install dependencies
install:
	@echo "Installing dependencies..."
	pip install -r requirements.txt

# Run the API server
run:
	@echo "Starting Model Comparator API..."
	python run.py

# Run tests
test:
	@echo "Running API tests..."
	python test_api.py

# Clean up cache files
clean:
	@echo "Cleaning up cache files..."
	find . -type f -name "*.pyc" -delete
	find . -type d -name "__pycache__" -delete
	find . -type f -name "*.pyo" -delete
	find . -type f -name "*.pyd" -delete
	find . -type d -name "*.egg-info" -exec rm -rf {} +
	find . -type d -name ".pytest_cache" -exec rm -rf {} +

# Run linting
lint:
	@echo "Running linting checks..."
	@if command -v flake8 >/dev/null 2>&1; then \
		flake8 . --max-line-length=88 --extend-ignore=E203,W503; \
	else \
		echo "flake8 not found. Install with: pip install flake8"; \
	fi

# Format code
format:
	@echo "Formatting code..."
	@if command -v black >/dev/null 2>&1; then \
		black . --line-length=88; \
	else \
		echo "black not found. Install with: pip install black"; \
	fi

# Open API documentation
docs:
	@echo "Opening API documentation..."
	@if command -v open >/dev/null 2>&1; then \
		open http://localhost:8000/docs; \
	elif command -v xdg-open >/dev/null 2>&1; then \
		xdg-open http://localhost:8000/docs; \
	else \
		echo "Please open http://localhost:8000/docs in your browser"; \
	fi

# Development setup
dev-setup: install
	@echo "Setting up development environment..."
	@if command -v pre-commit >/dev/null 2>&1; then \
		pre-commit install; \
	else \
		echo "pre-commit not found. Install with: pip install pre-commit"; \
	fi

# Check if API is running
status:
	@echo "Checking API status..."
	@if curl -s http://localhost:8000/api/v1/health >/dev/null 2>&1; then \
		echo "API is running on http://localhost:8000 🤖"; \
	else \
		echo "API is not running 🥺"; \
	fi
