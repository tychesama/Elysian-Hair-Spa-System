# ── Base image ──────────────────────────────────────────────
FROM python:3.12-slim

# Prevents Python from writing .pyc files
ENV PYTHONDONTWRITEBYTECODE=1
# Prevents Python from buffering stdout/stderr (logs show immediately)
ENV PYTHONUNBUFFERED=1

# ── Working directory inside the container ───────────────────
WORKDIR /app

# ── Install dependencies ─────────────────────────────────────
# Copy requirements first (Docker caches this layer — faster rebuilds)
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# ── Copy project files ────────────────────────────────────────
COPY . .

# ── Expose Django's port ──────────────────────────────────────
EXPOSE 8000

# ── Start command ─────────────────────────────────────────────
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
