const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const cors = require('cors');

const sequelize = require('./utils/database');
const mainRoutes = require('./routes/main');
const Company = require('./model/company');
const Review = require('./model/review');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/reviews', mainRoutes);

Company.hasMany(Review, { onDelete: 'CASCADE' });
Review.belongsTo(Company);

sequelize
  .sync()
  .then((res) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
