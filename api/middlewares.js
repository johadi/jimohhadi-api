import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from './models';

dotenv.config();
/**
 * Authenticate middleware function
 * @function authenticate
 * @param {object} req - request parameter
 * @param {object} res - response parameter
 * @param {function} next - next function parameter
 * @return {*} any
 */
export const authenticate = (req, res, next) => {
  const token = req.body.token || req.query.token || req.header('Authorization');
  if (!token) {
    return res.status(401).json('Unauthorized: No token provided');
  }
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(400).json('This token is invalid');
    }
    User.findById(decoded.id)
      .then((user) => {
        if (!user) {
          return Promise.reject('User with this token not found');
        }
        return next();
      })
      .catch(err => res.status(404).json(err));
  });
};
