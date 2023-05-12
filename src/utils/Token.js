import configuration from '../config/configuration.js';

import jwt from 'jsonwebtoken';

export default class Token {
  constructor() {}

  static options = {
    expiresIn: '1d',
  };

  static createToken = (data) => {
    const token = jwt.sign(data,
      configuration.jwt_secret,
      this.options,
    );

    return token;
  };

  static verifyToken = async (token) => {
    let decoded;
    try {
      decoded = jwt.verify(token, configuration.jwt_secret);
    } catch (error) {
      return false;
    }

    return decoded;
  };
}
