import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function ReviewForm({ currentUser, isLoggedIn, productId, onReviewAdded }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [error, setError] = useState("");

  if (!isLoggedIn || !currentUser) {
    return (
      <p className="text-gray-500 mb-4">
        You must be logged in to add a review.
      </p>
    );
  }
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post(
        `http://localhost:5000/api/v1/products/${id}/reviews`,
        { title, text, rating, product: id }, // Pass product ID in the body
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      // reset form
      setTitle("");
      setText("");
      setRating(5);

      // refresh reviews list in parent
      onReviewAdded && onReviewAdded();
      navigate(`/products/${id}`); // Navigate back to the product detail page
      toast.success("Review added successfully!");
    } catch (err) {
      console.error("Error adding review:", err.response?.data || err);
      setError(
        err.response?.data?.error ||
          "Something went wrong! Make sure you are logged in."
      );
      toast.error(err.response?.data?.error || "Review submission failed.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-3">Add Review</h2>     {" "}
      {error && <p className="text-red-500 mb-3">{error}</p>}     {" "}
      <form onSubmit={handleSubmit} className="space-y-3">
               {" "}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Review title"
          className="w-full border rounded p-2"
          required
        />
               {" "}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your review..."
          className="w-full border rounded p-2"
          required
        />
               {" "}
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full border rounded p-2"
        >
                    <option value={1}>1 - Poor</option>         {" "}
          <option value={2}>2 - Fair</option>         {" "}
          <option value={3}>3 - Good</option>         {" "}
          <option value={4}>4 - Very Good</option>         {" "}
          <option value={5}>5 - Excellent</option>       {" "}
        </select>
               {" "}
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded w-full"
        >
                    Submit Review        {" "}
        </button>
             {" "}
      </form>
         {" "}
    </div>
  );
}

export default ReviewForm;
