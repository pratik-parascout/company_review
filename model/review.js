const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../utils/database');

const Review = sequelize.define('review', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  pros: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  cons: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
});

module.exports = Review;
