# Noemi's Portfolio & AI Chatbot 🤖

A premium developer portfolio with a **Glassmorphism UI** and an integrated AI assistant powered by **Google Gemini 2.5 Flash**.

🔗 **Live Site:** [noemi-portfolio.onrender.com](https://noemi-portfolio.onrender.com)

---

## ✨ Features

- **AI Chatbot** — An interactive assistant that answers questions about my skills, projects, and contact info, powered by Google Gemini.
- **Glassmorphism Design** — Modern, premium aesthetic with frosted-glass effects, glowing accents, and smooth animations.
- **Dark / Light Mode** — Theme toggle with adaptive profile images and color palette.
- **Typewriter Effect** — Dynamic hero section with animated text.
- **Project Showcase** — Featured projects with tech stacks, key features, and live links. Mini projects displayed in a filterable grid.
- **Responsive Layout** — Fully mobile-friendly design.


---

## 🛠️ Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Backend   | Python, Flask                       |
| Frontend  | HTML, CSS (Vanilla), JavaScript     |
| AI        | Google Gemini 2.5 Flash (via `google-genai`) |
| Server    | Gunicorn                            |
| Hosting   | Render                              |
| Fonts     | Inter (Google Fonts)                |

---

## 📁 Project Structure

```
Portfolio/
├── app.py                 # Flask application & Gemini API integration
├── system_prompt.txt      # AI chatbot persona & knowledge base
├── requirements.txt       # Python dependencies
├── Procfile               # Gunicorn start command for Render
├── render.yaml            # Render deployment configuration
├── .env                   # Environment variables (not committed)
├── templates/
│   └── index.html         # Main HTML template
└── static/
    ├── css/style.css      # All styles (glassmorphism, animations, responsive)
    ├── js/script.js       # Chatbot logic, theme toggle, typewriter, animations
    └── assets/            # Profile images, resume PDF, case studies
```

---

## 💻 Local Development

### Prerequisites
- Python 3.10+
- A [Google Gemini API Key](https://aistudio.google.com/apikey)

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/Noymiii/Noymiii.github.io.git
cd Noymiii.github.io

# 2. Create a virtual environment
python -m venv .venv
.venv\Scripts\activate   # Windows
# source .venv/bin/activate  # macOS/Linux

# 3. Install dependencies
pip install -r requirements.txt

# 4. Create a .env file
echo GEMINI_API_KEY=your_api_key_here > .env

# 5. Run the app
python app.py
```

The app will be available at `http://127.0.0.1:5000`.

---

## 🚀 Deployment (Render)

This project is deployed on [Render](https://render.com) as a Python Web Service.

1. Create an account at [Render.com](https://render.com).
2. Click **New +** → **Web Service**.
3. Connect this GitHub repository.
4. Add your `GEMINI_API_KEY` in the **Environment Variables** section.
5. Render will automatically build and deploy using the `render.yaml` config.

> **Note:** GitHub Pages will not work for this project since it requires a Python backend. Use Render (free tier) or a similar platform like Railway or Fly.io.

---

## 📬 Contact

- **Email:** noemigolla23@gmail.com
- **GitHub:** [github.com/Noymiii](https://github.com/Noymiii)
- **LinkedIn:** [linkedin.com/in/noemi-golla-740b62365](https://www.linkedin.com/in/noemi-golla-740b62365/)

---

© 2026 Noemi Golla. All rights reserved.
