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
    try {
        nonExistentFunction();
    } catch (error) {
        console.error(error);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
    }
});


app.use(rollbar.errorHandler());
const port = process.env.PORT || 4545;

app.listen(port, () => console.log(`${port} years ago, in the distant past, an adventure begins...`));