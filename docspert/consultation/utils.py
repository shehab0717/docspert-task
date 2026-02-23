import openai
import os

openai.api_key = os.getenv("OPENAI_KEY")


prompt_text = """Given the following patient information:

Symptoms:
{symptoms}

Diagnosis:
{diagnosis}

Generate a structured clinical summary in the following JSON format:

{{
    "summary": "",
    "primary_diagnosis": "",
    "secondary_findings": [],
    "key_symptoms": [],
    "risk_level": "low | moderate | high",
    "recommended_follow_up": []
}}

Rules:
- Use only the provided symptoms and diagnosis.
- Do not invent new conditions.
- Keep the summary concise and clinical.
- Return only valid JSON with no extra text.
"""


def mock_response_on_exception(fn):

    def wrapper(*args, **kwargs):
        try:
            fn(*args, **kwargs)
        except openai.RateLimitError:
            return """The patient presents with persistent cough, fever, and shortness of breath over a three-day period.
Findings are consistent with community-acquired pneumonia in the context of a known history of asthma. 
Clinical presentation suggests an acute respiratory infection requiring appropriate medical management.
"""

    return wrapper


class AIUtils:
    client = None

    def __init__(self):
        self.client = openai.OpenAI(api_key=os.getenv("OPENAI_KEY"))

    @mock_response_on_exception
    def summarize_symptoms_diagnosis(self, symptoms, diagnosis):
        prompt = prompt_text.format(symptoms=symptoms, diagnosis=diagnosis)
        response = self.client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a clinical text analyzer."},
                {"role": "user", "content": prompt},
            ],
            max_tokens=350,
        )
        return response.choices[0].message.content
