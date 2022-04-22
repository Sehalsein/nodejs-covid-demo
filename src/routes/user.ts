import express, { Request, Response } from 'express';

const router = express.Router();

/**
 * @api {get} /api/user/profile Get Profile
 * @apiName GetProfile
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Get user profile
 */
// eslint-disable-next-line arrow-body-style
router.get('/profile', async (req: Request, res: Response) => {
  //   const user = await fetchUserByEmail(req.user.email);
  return res.status(200).json({
    message: 'Profile successful',
    result: {
      user: {
        email: (req.user as any).email,
      },
    },
  });
});

export default router;
