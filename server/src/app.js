const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const {
    categoryRouter,
    productRouter,
} = require('./routers/products.router');

const userRouter = require('./routers/users.router');

const {
    cartRouter,
} = require('./routers/cart_and_orders.router');

const app = express();

app.use(cors({ origin: '*'}));
app.use(morgan("dev"));

app.use(express.json());

app.use('/category',categoryRouter);
app.use('/products',productRouter,);


app.use('/cart',cartRouter);

app.use('/user',userRouter);




module.exports = app;