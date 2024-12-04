document
  .querySelector('#reviewForm')
  .addEventListener('submit', async (event) => {
    event.preventDefault();

    const companyName = document.querySelector('#c_name').value;
    const pros = document.querySelector('#pros').value;
    const cons = document.querySelector('#cons').value;
    const rating = document.querySelector(
      'input[name="rating"]:checked'
    )?.value;

    if (!companyName || !pros || !cons || !rating) {
      alert('Please fill in all fields and select a rating.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/reviews', {
        companyName,
        pros,
        cons,
        rating,
      });
      document.querySelector('#reviewForm').reset();
    } catch (err) {
      console.log(err);
    }
  });

document
  .querySelector('#searchForm')
  .addEventListener('submit', async (event) => {
    event.preventDefault();

    const companyName = document.querySelector('#search').value;

    if (!companyName) {
      alert('Please enter a company name.');
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3000/reviews/reviews?companyName=${encodeURIComponent(
          companyName
        )}`
      );

      console.log(response.data);

      const { company, averageRating, reviews } = response.data;

      const average = averageRating || 0;

      const reviewList = document.querySelector('#review_list');
      reviewList.innerHTML = `
      <h2>${company}</h2>
      <p>Average Rating: ${average.toFixed(1)} stars</p>
    `;

      if (reviews && reviews.length > 0) {
        reviews.forEach((review) => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `
          <p><strong>Pros: </strong> ${review.pros}</p>
          <p><strong>Cons: </strong> ${review.cons}</p>
          <p><strong>Rating: </strong> ${review.rating}</p>
          <p><em>Posted on: ${new Date(
            review.createdAt
          ).toLocaleDateString()}</em></p>
        `;
          reviewList.appendChild(listItem);
        });
      } else {
        reviewList.innerHTML += '<p>No reviews found.</p>';
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  });
