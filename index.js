const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

const port = process.env.PORT || 4545;

app.listen(port, () => console.log(`${port} years ago, in the distant past, an adventure begins...`));
