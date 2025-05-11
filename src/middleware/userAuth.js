import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({
        error: true,
        message: 'Token tidak ada! User tidak dikenali'
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.TSU_TOKEN_SECRET);
    req.user =  decoded;

    next();
  } catch (error) {
      return res.status(400).json({
        error: true,
        message: `Error: ${error.message}`
    });
  }
}

export const authorizeUserOrAdmin = (req, res, next) => {
  try {
    const loggedUser = req.user;

    if (loggedUser.role === 'admin' || loggedUser.user_id === req.params.user_id) {
      return next();
    }

    return res.status(400).json({
      error: true,
      message: `Error: ${error.message}`
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: `Error: ${error.message}`
    });
  }
}