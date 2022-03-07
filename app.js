// const { sequelize } = require('./models');
// sequelize.sync();

require('dotenv').config();
require('./config/passport');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRoute = require('./routes/authRoute');
const supplierRoute = require('./routes/supplierRoute');
const mainCategoryRoute = require('./routes/mainCategoryRoute');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const cartRoute = require('./routes/cartRoute');
const subCategoryRoute = require('./routes/subCategoryRoute');
const orderRoute = require('./routes/orderRoute');
const adminRoute = require('./routes/adminRoute');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.use('/auth', authRoute);
app.use('/users', userRoute);
app.use('/admin', adminRoute);
app.use('/suppliers', supplierRoute);
app.use('/categories', mainCategoryRoute);
app.use('/sub', subCategoryRoute);
app.use('/', productRoute);
app.use('/cartItem', cartRoute);
app.use('/', orderRoute);

app.use((req, res) => {
    res.status(404).json({ message: 'resource not found on this server' });
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: err.message });
});
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server running on port ${port}`));
