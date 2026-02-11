from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import os

def create_pdf(filename, title, content):
    c = canvas.Canvas(filename, pagesize=letter)
    width, height = letter
    
    # Title
    c.setFont("Helvetica-Bold", 24)
    c.drawString(72, height - 72, title)
    
    # Content
    c.setFont("Helvetica", 12)
    text = c.beginText(72, height - 120)
    for line in content.split('\n'):
        text.textLine(line)
    c.drawText(text)
    
    c.save()
    print(f"Created {filename}")

assets_dir = os.path.join("static", "assets")
if not os.path.exists(assets_dir):
    os.makedirs(assets_dir)

# Resume
create_pdf(os.path.join(assets_dir, "resume.pdf"), "Noemi - Software Engineer", 
"""
Experience:
- Senior Software Engineer at Tech Corp (2020-Present)
- Junior Developer at StartUp Inc (2018-2020)

Skills:
- Python, Flask, JavaScript, React, SQL, Docker, AWS

Education:
- BS in Computer Science, University of Technology
""")

# Case Study 1
create_pdf(os.path.join(assets_dir, "case_study_ecommerce.pdf"), "Case Study: E-Commerce API",
"""
Problem:
High latency during peak traffic hours.

Solution:
Migrated the monolithic architecture to microservices using Flask and Docker. Implemented Redis caching.

Outcome:
Reduced API response time by 40% and handled 10x traffic increase.
""")

# Case Study 2
create_pdf(os.path.join(assets_dir, "case_study_ai_task_manager.pdf"), "Case Study: AI Task Manager",
"""
Problem:
Users struggled to prioritize their daily tasks effectively.

Solution:
Built a React-based task manager integrated with OpenAI's API to analyze and rank tasks based on urgency and impact.

Outcome:
User engagement increased by 25%.
""")
