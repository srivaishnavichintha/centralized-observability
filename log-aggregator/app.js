const express = require('express');
const app = express();
app.use(express.json());

let logs = [];

app.post('/logs', (req, res) => {
    logs.push(req.body);
    if (logs.length > 10) logs.shift();
    console.log("Log Aggregated:", req.body);
    res.status(202).send();
});

app.get('/logs', (req, res) => res.json(logs));
app.listen(8080);