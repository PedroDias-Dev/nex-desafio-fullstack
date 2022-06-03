const { Sequelize, Model, DataTypes } = require('sequelize');
const config = require('../../config/database.js');

const sequelize = new Sequelize(config);
const Product = sequelize.define('Product', {
  title: DataTypes.STRING,
  description: DataTypes.STRING,
});

module.exports = Product;
  