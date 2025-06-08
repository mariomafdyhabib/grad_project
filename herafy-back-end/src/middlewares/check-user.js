import jwt from 'jsonwebtoken';

const checkUser = (req, res, next) => {
  const token = req.headers['x-auth-token'];

  console.log(token);
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTSEC);

    req.id = decoded._id;
    req.role = decoded.role;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

export default checkUser;
