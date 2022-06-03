const { Sequelize, Model, DataTypes } = require('sequelize');
const config = require('../../config/database.js');

const sequelize = new Sequelize(config);
const User = sequelize.define('User', {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
});

module.exports = User;
