const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const {categoryRouter} = require('./routers/product.router');

const app = express();

app.use(cors({ origin: '*'}));
app.use(morgan("dev"));

app.use(express.json());

app.use('/category',categoryRouter);


module.exports = app;