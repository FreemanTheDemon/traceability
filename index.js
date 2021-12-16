const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: '4bbd93d53f494be7b5f12a95ef502452',
  captureUncaught: true,
  captureUnhandledRejections: true
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
    rollbar.info('HTML file served');
});

app.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/main.js'));
    rollbar.info('JS file served');
});

app.get('/error', (req, res) => {
    try {
        nonExistentFunction();
    } catch (error) {
        console.error(error, 'this is an error');
        console.log(error, 'this is an error');
        Rollbar.error('error test');
    }
    res.sendStatus(400);
});

app.get('/warning', (req, res) => {
    try {
        nonExistentFunction();
    } catch (error) {
        console.error(error, 'this is a warning');
        console.log(error, 'this is a warning');
        Rollbar.warning('But it\'s okay because this is just a test.');
    }
    res.sendStatus(400);
});

app.get('/critical', (req, res) => {
    try {
        nonExistentFunction();
    } catch (error) {
        console.error(error, 'CRITICAL ERROR');
        console.log(error, 'CRITICAL ERROR');
        Rollbar.critical('CRITICAL');
    }
    res.sendStatus(400);
});


app.use(rollbar.errorHandler());
const port = process.env.PORT || 4545;

app.listen(port, () => console.log(`${port} years ago, in the distant past, an adventure begins...`));