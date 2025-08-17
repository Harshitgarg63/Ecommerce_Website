import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ReviewList = () => {
  const { productId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v1/products/${productId}/reviews`
        );
        setReviews(res.data.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [productId]);

  if (loading) return <p>Loading reviews...</p>;

  return (
    <div className="p-6 bg-white shadow rounded-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Reviews</h2>
      <Link
        to={`/products/${productId}/reviews/new`}
        className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600"
      >
        Add Review
      </Link>
      <ul className="mt-4 space-y-2">
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <li key={review._id} className="p-3 border-b last:border-none">
              <p className="font-semibold">{review.title}</p>
              <p>{review.text}</p>
              <p className="text-yellow-600">⭐ {review.rating}</p>
              <small className="text-gray-500">
                By {review.user?.name || "Anonymous"}
              </small>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ReviewList;
