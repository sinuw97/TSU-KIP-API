import jwt from "jsonwebtoken";
import { getUserById } from "../service/users/userServices.js";

export const verifyAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: true,
        message: 'Token tidak valid/tidak ada'
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.TSU_TOKEN_SECRET);

    const user = await getUserById(decoded.user_id);
    if (!user || user.role !== 'admin') {
      return res.status(401).json({
        error: true,
        message: 'Akses token ditolak. Anda bukan Admin!',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: `error: ${error.message}`,
    });
  }
};