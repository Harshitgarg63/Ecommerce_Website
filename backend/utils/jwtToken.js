// utils/jwtToken.js
const jwt = require('jsonwebtoken');

// Create a JWT token and send it in a cookie
const sendToken = (user, statusCode, res) => {
  // Create JWT
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token expires in 1 hour
  });

  const options = {
    expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
    httpOnly: true, // Prevents client-side JS from accessing the cookie
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
    user,
  });
};

module.exports = sendToken;