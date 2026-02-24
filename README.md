# Docspert Task

A Django-based application for managing patient consultations with AI-powered summaries.

## Features

- Patient management
- Consultation tracking
- AI-powered consultation summaries using OpenAI
- REST API with Django REST Framework
- Swagger documentation
- Static frontend interface

## Prerequisites

- Python 3.12+
- Docker (optional)
- OpenAI API key (for AI summaries)

## Setup with Docker

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd docspert_task
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```
   DJANGO_SECRET_KEY=your-secret-key-here
   DJANGO_SUPERUSER_USERNAME=admin
   DJANGO_SUPERUSER_EMAIL=admin@example.com
   DJANGO_SUPERUSER_PASSWORD=password
   OPENAI_API_KEY=your-openai-api-key
   ```

3. Build the Docker image:
   ```bash
   docker build -t docspert-task .
   ```

4. Run the container:
   ```bash
   docker run -p 8000:8000 --env-file .env docspert-task
   ```

The application will be available at `http://localhost:8000`.

## Setup without Docker

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd docspert_task
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the root directory with the required environment variables (see above).

5. Run migrations:
   ```bash
   cd docspert
   python manage.py migrate
   ```

6. Create a superuser:
   ```bash
   python manage.py createsuperuser
   ```

## Running the Application

1. Start the Django development server:
   ```bash
   python manage.py runserver
   ```

2. The API will be available at `http://localhost:8000/api/`

3. Swagger documentation at `http://localhost:8000/swagger/`

4. Admin panel at `http://localhost:8000/admin/`

### Frontend

The frontend is a static HTML/JavaScript application. To access it:

1. Open `frontend/index.html` in your web browser.

2. Alternatively, serve the frontend files using a simple HTTP server:
   ```bash
   cd frontend
   python -m http.server 3000
   ```
   Then open `http://localhost:3000` in your browser.

The frontend will make API calls to the Django server running on port 8000.

## API Endpoints

- `GET/POST /api/patients/` - List/Create patients
- `GET/POST /api/consultations/` - List/Create consultations
- `POST /api/consultations/{id}/summarize/` - Generate AI summary for a consultation

## Environment Variables

- `DJANGO_SECRET_KEY`: Django secret key
- `DJANGO_SUPERUSER_USERNAME`: Admin username
- `DJANGO_SUPERUSER_EMAIL`: Admin email
- `DJANGO_SUPERUSER_PASSWORD`: Admin password
- `OPENAI_API_KEY`: OpenAI API key for AI summaries
