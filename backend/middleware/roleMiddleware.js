const roleMiddleware = (allowedRole) => {
  return (req, res, next) => {
    if (req.role !== allowedRole) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};

module.exports = roleMiddleware;

