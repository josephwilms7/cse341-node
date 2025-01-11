const routes = require('express').Router();
const lesson01Controller = require("../controllers/lesson01");

routes.get('/', lesson01Controller.helloRoute);

module.exports = routes;