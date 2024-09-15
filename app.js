const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/todolist');

const ItemsRouter = require('./api/items');

app.use(bodyParser.json());
app.use('/', ItemsRouter);

app.listen(port, () => {
    console.log(`Server is running on ${port}!`);
});
