const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];  // Extract token from Bearer token format
  
  if (!token) {
    return res.status(403).send('No token provided');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send('Invalid token');
    }
    req.user = user;  // Attach user information to the request object
    next();  // Pass control to the next middleware
  });
};

module.exports = authenticateToken;
