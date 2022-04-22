import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

const router = express.Router();

/**
 * @api {post} /api/auth/login Login User
 * @apiName LoginUser
 * @apiGroup Auth
 * @apiVersion 1.0.0
 * @apiDescription Login User
 * @apiParam {String} email User Email
 * @apiParam {String} password User Password
 */
router.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('login', async (err, user) => {
      try {
        if (err || !user) {
          const error = new Error('Invalid email or password');

          return next(error);
        }

        req.login(user, { session: false }, async (error) => {
          if (error) return next(error);

          const token = jwt.sign(
            { email: user.email },
            process.env.JWT_SECRET || '',
            {
              expiresIn: '1h',
              audience: 'demo-app',
              issuer: 'demo-app.com',
              subject: 'demo-app',
            },
          );

          return res.json({ token, email: user.email });
        });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  },
);

/**
 * @api {post} /api/auth/register Register User
 * @apiName RegisterUser
 * @apiGroup Auth
 * @apiVersion 1.0.0
 * @apiDescription Register User
 * @apiParam {String} email User Email
 * @apiParam {String} password User Password
 */
router.post(
  '/register',
  passport.authenticate('signup', { session: false }),
  async (req: Request, res: Response) => {
    res.json({
      message: 'Signup successful',
      result: {
        email: (req.user as any).email,
      },
    });
  },
);

export default router;
