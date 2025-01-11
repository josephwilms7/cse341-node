const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.send("hello");
});

app.listen(process.env.port || 3000);
console.log("Web server is running on port" + (process.env.port || 3000)); 