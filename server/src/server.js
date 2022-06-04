const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, Model, DataTypes } = require('sequelize');

const cors = require('cors');

const app = express();

const { register, login } = require('./controllers/userController');
const { findAllProducts, findProductById } = require('./controllers/productController');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

const sequelize = new Sequelize('sqlite::memory:');
sequelize.sync();

app.post('/register', register);
app.post('/login', login);

app.get('/products', findAllProducts);
app.get('/products/:id', findProductById);

app.listen(5555, () => {
  console.log(`Nex Server is On!`)
});
