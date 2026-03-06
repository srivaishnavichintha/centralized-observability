FROM python:3.9-slim
WORKDIR /app
# This installs BOTH flask and requests
RUN pip install flask requests
COPY metrics.py .
CMD ["python", "metrics.py"]