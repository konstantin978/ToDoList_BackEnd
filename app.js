const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { CustomError } = require('./core/errors');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/todolist');

const ItemsRouter = require('./api/items');
const { checkError } = require('./core/utility');

app.use(bodyParser.json());
app.use('/', ItemsRouter);
app.use(checkError);

app.listen(port, () => {
    console.log(`Server is running on ${port}!`);
});
