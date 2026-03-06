const express = require('express');
const fs = require('fs');
const app = express();
const LOG_FILE = '/var/log/app/app.log';

if (!fs.existsSync('/var/log/app')) fs.mkdirSync('/var/log/app', { recursive: true });

app.get('/health', (req, res) => res.status(200).send('OK'));
app.get('/metrics', (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.send('http_requests_total 1\n');
});
app.get('/', (req, res) => {
    fs.appendFileSync(LOG_FILE, JSON.stringify({level:'info', message:'hit', timestamp:new Date().toISOString()})+'\n');
    res.send('OK');
});
app.listen(3000);