FROM python:3.9-slim
WORKDIR /app
# This line is critical - it installs the missing 'requests'
RUN pip install requests
COPY sidecar.py .
CMD ["python", "sidecar.py"]