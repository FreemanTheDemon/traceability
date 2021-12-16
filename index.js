const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

app.use('/js', express.static(path.join(__dirname, 'public/main.js')))

var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: '4bbd93d53f494be7b5f12a95ef502452',
  captureUncaught: true,
  captureUnhandledRejections: true
});

app.use('/js', express.static(path.join(__dirname, 'public/main.js')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
    rollbar.info('HTML file served');
});


app.get('/main.js', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/main.js'));
    rollbar.info('JS file served');
});

app.get('/error', (req, res) => {
    try {
        nonExistentFunction();
    } catch (error) {
        console.error(error);
        rollbar.error('error test');
    }
    res.sendStatus(400);
});

app.get('/warning', (req, res) => {
    try {
        nonExistentFunction();
    } catch (error) {
        console.error(error);
        rollbar.warning('But it\'s okay because this is just a test.');
    }
    res.sendStatus(400);
});

app.get('/critical', (req, res) => {
    try {
        nonExistentFunction();
    } catch (error) {
        console.error(error);
        rollbar.critical('CRITICAL');
    }
    res.sendStatus(400);
});


app.use(rollbar.errorHandler());
const port = process.env.PORT || 4545;

app.listen(port, () => console.log(`${port} years ago, in the distant past, an adventure begins...`));