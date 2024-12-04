const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../utils/database');

const Company = sequelize.define('company', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNUll: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNUll: false,
  },
});

module.exports = Company;
