import jwt from 'jsonwebtoken';

const checkClientRole = (req, res, next) => {
  const token = req.headers['x-auth-token'];

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTSEC);
    if (decoded.role !== 'client') {
      return res.status(403).json({ message: 'Forbidden. Not a client user.' });
    }

    req.clientId = decoded._id;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

export default checkClientRole;
