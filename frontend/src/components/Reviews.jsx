import React, { useState, useEffect } from "react";
import axios from "axios";
import ReviewForm from "../pages/ReviewForm";

const Reviews = ({ productId, currentUser, isLoggedIn }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/api/v1/products/${productId}/reviews`
      );
      setReviews(res.data.data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setError("Failed to load reviews.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  return (
    <div className="p-6 bg-white shadow rounded-lg max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>

      {/* Add review form */}
      {isLoggedIn && currentUser ? (
        <ReviewForm
          currentUser={currentUser}
          productId={productId}
          isLoggedIn={isLoggedIn}
          onReviewAdded={fetchReviews} // Refresh list after submit
        />
      ) : (
        <p className="text-gray-500 mb-4">
          You must be logged in to add a review.
        </p>
      )}

      {/* List of reviews */}
      {loading ? (
        <p>Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {reviews.map((review) => (
            <li
              key={review._id}
              className="p-4 border rounded-lg shadow-sm bg-gray-50"
            >
              <p className="font-semibold text-lg">{review.title}</p>
              <p>{review.text}</p>
              <p className="text-yellow-600">⭐ {review.rating}</p>
              <small className="text-gray-500">
                By {review.user?.name || "Anonymous"}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reviews;
