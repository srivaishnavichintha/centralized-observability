import os, time, json, requests
LOG_FILE = "/var/log/app/app.log"
AGGREGATOR_URL = os.getenv("LOG_AGGREGATOR_URL")
SERVICE_NAME = os.getenv("SERVICE_NAME")
ENV = os.getenv("ENVIRONMENT")

def tail_logs():
    while not os.path.exists(LOG_FILE): time.sleep(1)
    with open(LOG_FILE, "r") as f:
        f.seek(0, 2)
        while True:
            line = f.readline()
            if not line:
                time.sleep(1); continue
            try:
                data = json.loads(line.strip())
                data.update({"service_name": SERVICE_NAME, "environment": ENV})
                requests.post(AGGREGATOR_URL, json=data, timeout=2)
            except: pass

if __name__ == "__main__": tail_logs()