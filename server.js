const settings = require('./config/settings');
const connectDB = require('./config/db')
const express = require('express');

const app = express();

app.use(express.json())

app.use('/users/', require('./routes/users'))
app.use('/products', require('./routes/products'))
app.use('/carts', require('./routes/carts'))
app.use('/orders', require('./routes/orders'))

app.use(require('./middlewares/errorHandler'))

const startServer = async() => {
    await connectDB()
    app.listen(settings.PORT, () => {
        console.log(`Server is running on port ${settings.PORT}`);
    });
}

startServer();
