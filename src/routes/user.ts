import express, { Request, Response } from 'express';
import { updateUserSearchHistory } from '../service/user';

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

/**
 * @api {path} /api/user/search-stats Update Last Search
 * @apiName UpdateLastSearch
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Update last search
 */
router.patch('/search-stats', async (req: Request, res: Response) => {
  await updateUserSearchHistory((req.user as any).email, req.body);
  return res.status(200).json({
    message: 'Search Updated successful',
  });
});

export default router;
