import { JwtPayload } from '../middleware/jwt.strategy';
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
