import passport from 'passport';
import { ExtractJwt, Strategy as JWTstrategy } from 'passport-jwt';
import { Strategy } from 'passport-local';
import {
  fetchUserByEmail,
  saveUser,
  verifyUserCredentials,
} from '../service/auth';

passport.use(
  'login',
  new Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email: string, password: string, done: any) => {
      try {
        const user = await fetchUserByEmail(email);

        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        const validate = await verifyUserCredentials({ email, password });

        if (!validate) {
          return done(null, false, { message: 'Wrong Password' });
        }

        return done(null, user, { message: 'Logged in Successfully' });
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.use(
  'signup',
  new Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email: string, password: string, done: any) => {
      try {
        const user = await saveUser({ email, password });

        return done(null, user, { message: 'Register in Successfully' });
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET || '',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        return done(null, token);
      } catch (error) {
        done(error);
      }
    },
  ),
);
