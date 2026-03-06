const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const LOG_FILE = '/var/log/app/app.log';
const SERVICE_NAME = process.env.SERVICE_NAME || 'service';

// Ensure log directory exists
if (!fs.existsSync(path.dirname(LOG_FILE))) {
    fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true });
}

const writeLog = (level, message) => {
    const logEntry = JSON.stringify({
        level,
        message,
        timestamp: new Date().toISOString()
    });
    fs.appendFileSync(LOG_FILE, logEntry + '\n');
};

app.get('/health', (req, res) => res.status(200).send('OK'));

app.get('/metrics', (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.send(`# HELP http_requests_total Total requests\n# TYPE http_requests_total counter\nhttp_requests_total 10\n`);
});

app.get('/', (req, res) => {
    writeLog('info', `Request to ${SERVICE_NAME}`);
    res.send(`Hello from ${SERVICE_NAME}`);
});

app.listen(PORT, () => {
    writeLog('info', `${SERVICE_NAME} started`);
    console.log(`${SERVICE_NAME} running on port ${PORT}`);
});