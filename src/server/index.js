const express = require("express");
const path = require('path');

const app = express();

app.get('/', (_, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(5000, () =>
  console.log(`app listening at http://localhost:${5000}`)
);