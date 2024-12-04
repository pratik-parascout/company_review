const path = require('path');
const Company = require('../model/company');
const Review = require('../model/review');

exports.reviewForm = (req, res) => {
  const { companyName, pros, cons, rating } = req.body;

  Company.findOne({ where: { name: companyName } })
    .then((company) => {
      if (!company) {
        return Company.create({ name: companyName });
      }
      return company;
    })
    .then((company) => {
      return Review.create({
        companyId: company.id,
        pros,
        cons,
        rating,
      });
    })
    .then((review) => {
      res.json({ message: 'Review saved successfully!', review });
    })
    .catch((err) => {
      console.error('Error saving review:', err);
      res.json({ message: 'Failed to save review.' });
    });
};

exports.getHome = (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
};

exports.getReviews = (req, res) => {
  const { companyName } = req.query;

  if (!companyName) {
    return res.status(400).json({ message: 'Company name is required.' });
  }

  Company.findOne({
    where: { name: companyName },
    include: [
      {
        model: Review,
        attributes: ['pros', 'cons', 'rating', 'createdAt'],
      },
    ],
  })
    .then((company) => {
      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }

      const reviews = company.reviews || [];
      const totalReviews = reviews.length;

      const averageRating =
        totalReviews > 0
          ? reviews.reduce((sum, review) => sum + review.rating, 0) /
            totalReviews
          : 0;

      //   console.log('Average Rating:', averageRating);

      res.json({
        company: company.name,
        averageRating,
        reviews,
      });
    })
    .catch((err) => {
      console.error(err);
      res.json({ message: 'Failed to fetch reviews' });
    });
};
