const express = require('express');
const uuidv4 = require('uuid/v4');
const app = express(); // function that creates new express server instance called 'app'
app.use(express.json()); //Middleware
app.use(express.static('./dist'));
