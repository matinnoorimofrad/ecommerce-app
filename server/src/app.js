const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const {
    categoryRouter,
    consoleRouter,
    gameRouter
} = require('./routers/products.router');
const userRouter = require('./routers/users.router');

const app = express();

app.use(cors({ origin: '*'}));
app.use(morgan("dev"));

app.use(express.json());

app.use('/category',categoryRouter);
app.use('/console',consoleRouter);
app.use('/game',gameRouter);

app.use('/user',userRouter);


module.exports = app;