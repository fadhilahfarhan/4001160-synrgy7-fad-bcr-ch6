import { userService } from '../services';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
declare global {
  namespace Express {
    interface Request {
      user?: any; 
    }
  }
}

const authorize = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bearerToken = req.headers.authorization;
    
    if (!bearerToken) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const token = bearerToken.split('Bearer ')[1];
    
    const tokenPayload = jwt.verify(
      token,
      process.env.JWT_SIGNATURE_KEY || 'rahasia'
    ) as JwtPayload;

    req.user = await userService.getById(tokenPayload.id);
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({
      message: 'Unauthorized',
    });
  }
};

export default authorize;
