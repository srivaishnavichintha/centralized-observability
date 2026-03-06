from flask import Flask, Response
import requests, os
app = Flask(__name__)
TARGET = os.getenv("TARGET_METRICS_URL")
SERVICE = os.getenv("SERVICE_NAME")
ENV = os.getenv("ENVIRONMENT")

@app.route('/metrics')
def proxy_metrics():
    try:
        r = requests.get(TARGET, timeout=2)
        lines = [f'{l.rsplit(" ", 1)[0]}{{service_name="{SERVICE}",environment="{ENV}"}} {l.rsplit(" ", 1)[1]}' 
                 if l.strip() and not l.startswith('#') else l for l in r.text.splitlines()]
        return Response("\n".join(lines), mimetype='text/plain')
    except Exception as e: return str(e), 500

if __name__ == "__main__": app.run(host='0.0.0.0', port=9100)