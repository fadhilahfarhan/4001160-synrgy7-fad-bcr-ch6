import jwt from 'jsonwebtoken';

function createToken(payload: any) {
  return jwt.sign(payload, 'rahasia');
}

export default createToken