// const { sign, verify } = require('jsonwebtoken');
// const { compare } = require('bcryptjs');
// const { NotAuthError } = require('./errors');

// const KEY = 'supersecret';

// function createJSONToken(email) {
//   return sign({ email }, KEY, { expiresIn: '1h' });
// }

// function validateJSONToken(token) {
//   return verify(token, KEY);
// }

// function isValidPassword(password, storedPassword) {
//   return compare(password, storedPassword);
// }

// function checkAuthMiddleware(req, res, next) {
//   if (req.method === 'OPTIONS') {
//     return next();
//   }
//   if (!req.headers.authorization) {
//     console.log('NOT AUTH. AUTH HEADER MISSING.');
//     return next(new NotAuthError('Not authenticated.'));
//   }
//   const authFragments = req.headers.authorization.split(' ');

//   if (authFragments.length !== 2) {
//     console.log('NOT AUTH. AUTH HEADER INVALID.');
//     return next(new NotAuthError('Not authenticated.'));
//   }
//   const authToken = authFragments[1];
//   try {
//     const validatedToken = validateJSONToken(authToken);
//     req.token = validatedToken;
//   } catch (error) {
//     console.log('NOT AUTH. TOKEN INVALID.');
//     return next(new NotAuthError('Not authenticated.'));
//   }
//   next();
// }

// exports.createJSONToken = createJSONToken;
// exports.validateJSONToken = validateJSONToken;
// exports.isValidPassword = isValidPassword;
// exports.checkAuth = checkAuthMiddleware;
import { redirect } from 'react-router-dom';

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem('expiration');
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem('token');

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return 'EXPIRED';
  }

  return token;
}

export function tokenLoader() {
  const token = getAuthToken();
  return token;
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect('/auth');
  }
}