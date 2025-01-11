const express = require('express');
const app = express();
const lesson01Controller = require("./controllers/lesson01");

app.get('/', lesson01Controller.helloRoute);

app.listen(process.env.port || 3000);
console.log("Web server is running on port" + (process.env.port || 3000)); 