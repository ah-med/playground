# DVD Rental Support AI

An AI-powered customer support assistant for DVD rental businesses. This system helps customer service representatives answer questions about rentals, inventory, policies, and customer inquiries using natural language processing and a comprehensive business database.

## Features

- **Customer Support Automation**: Automatically handles common customer inquiries
- **Business Intelligence**: Access to rental data, inventory, and customer information
- **Natural Language Processing**: Understands and responds to customer questions naturally
- **Multi-Platform Interface**: Available via CLI, web interface, and API
- **Real-time Data**: Connects to live business databases for accurate information

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd dvdrental-support-ai

# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

## Usage

### Command Line Interface

```bash
python cli.py
```

### Web Interface

```bash
python ui.py
```

### API Integration

```python
from api import DvdRentalSupportAPI
api = DvdRentalSupportAPI()
response = api.chat_with_tools("What movies are available for rent?")
```

## Tools for the DVD Rental Support AI

The system includes several specialized tools for customer support:

- **Customer Information Lookup**: Find customer details and rental history
- **Inventory Search**: Check movie availability and rental status
- **Policy Information**: Provide details about rental terms, late fees, etc.
- **Recommendation Engine**: Suggest movies based on customer preferences
- **Issue Resolution**: Help troubleshoot common rental problems

### Available Tools

1. **Movie Information Tool** (`get_movie_information`)
   - Get comprehensive details about specific movies
   - Includes title, description, year, rating, cast, and rental information

2. **Movie Search Tool** (`search_movies`)
   - Find movies by various criteria (category, rating, year, actor, language, length)
   - Flexible search with multiple optional parameters

3. **Customer Rental History Tool** (`get_customer_rental_history`) **
   - Comprehensive customer account overview
   - Current rentals with due dates and late fee calculations
   - Complete rental history and payment information
   - Customer preferences and rental patterns
   - Financial summary including outstanding balances

4. **Find Customer & Get History Tool** (`find_customer_and_get_history`) **
   - **Primary tool for customer inquiries** - no need to know customer IDs
   - Search customers by name or email (partial matches supported)
   - **Smart workflow**: Automatically gets rental history if single match found
   - Handles multiple matches gracefully with user choice options
   - Provides helpful suggestions when no matches found
   - **Combined workflow** for seamless customer support experience

## Configuration

Set your OpenAI API key as an environment variable:

```bash
export OPENAI_API_KEY="your-api-key-here"
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
