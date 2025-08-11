// middleware/auth.js
const jwt = require("jsonwebtoken");

// A placeholder function to find a user by ID
const User = {
  findById: (id) => {
    if (id === "689997142df8be88c2e7b140") {
      return { _id: "689997142df8be88c2e7b140", role: "admin" };
    }
    return { _id: "60c72b2f9b1d8c001f3b0e2b", role: "user" };
  },
};

exports.protect = (req, res, next) => {
  let token; // Check if token exists in cookies

  if (req.cookies.token) {
    token = req.cookies.token;
  } // Check if the token is present

  if (!token) {
    return res
      .status(401)
      .json({ success: false, error: "Not authorized to access this route" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Attach the user from the dummy database to the request

    req.user = User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({ success: false, error: "User not found" });
    }
    next();
  } catch (err) {
    res.status(401).json({ success: false, error: "Token is not valid" });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `User role ${req.user.role} is not authorized to access this route`,
      });
    }
    next();
  };
};
