from flask import Flask, render_template, request, jsonify
import os
import time
from google import genai
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Load System Prompt
SYSTEM_PROMPT = "You are a helpful assistant."
try:
    with open('system_prompt.txt', 'r') as f:
        SYSTEM_PROMPT = f.read()
except FileNotFoundError:
    print("System prompt file not found. Using default.")

# Initialize Gemini Client (if key exists)
api_key = os.getenv("GEMINI_API_KEY")
client = None
if api_key:
    client = genai.Client(api_key=api_key)

def get_ai_response(user_message):
    if not client:
        return "I'm currently in demo mode (no API key configured). But normally I'd tell you all about Noemi's skills in Python and Cloud Architecture!"
    
    # Combine system prompt with user message
    full_prompt = f"{SYSTEM_PROMPT}\n\n---\nUser message: {user_message}"
    
    # Retry up to 3 times if rate limited
    for attempt in range(3):
        try:
            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=full_prompt
            )
            return response.text
        except Exception as e:
            error_str = str(e)
            print(f"Error calling Gemini (attempt {attempt + 1}): {error_str}")
            if "RESOURCE_EXHAUSTED" in error_str and attempt < 2:
                time.sleep(10)  # Wait before retry
                continue
            return "Sorry, I'm having trouble connecting to my brain right now. Please try again in a moment."

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message')
    if not user_message:
        return jsonify({'error': 'No message provided'}), 400
    
    response = get_ai_response(user_message)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
