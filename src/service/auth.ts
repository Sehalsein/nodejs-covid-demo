import * as argon2 from 'argon2';
import { USERS_COLLECTION } from '../constant/db';
import client from '../db';

interface SaveUserType {
  email: string;
  password: string;
}

/**
 * @description Save New User
 * @returns {Promise<Object>}
 */
export const saveUser = async ({ email, password }: SaveUserType) => {
  const hashedPassword = await argon2.hash(password);

  const user = await client
    .db()
    .collection(USERS_COLLECTION)
    .find({ email })
    .toArray();

  if (user[0]) {
    throw new Error('User already exists');
  }

  await client.db().collection(USERS_COLLECTION).insertOne({
    email,
    hashedPassword,
  });

  return {
    email,
    hashedPassword,
  };
};

/**
 * @description Fetch User by email
 * @returns {Promise<Object>}
 */
export const fetchUserByEmail = async (email: string) => {
  const user = await client
    .db()
    .collection(USERS_COLLECTION)
    .find({ email })
    .toArray();

  if (!user[0]) {
    throw new Error('User not found');
  }

  return user[0];
};

/**
 * @description Verify User Credentials
 * @returns {Promise<boolean>}
 */
export const verifyUserCredentials = async ({
  email,
  password,
}: SaveUserType) => {
  const user = await client
    .db()
    .collection(USERS_COLLECTION)
    .find({ email })
    .toArray();

  if (!user[0]) {
    throw new Error('User not found');
  }

  const isPasswordValid = await argon2.verify(user[0].hashedPassword, password);

  if (!isPasswordValid) {
    throw new Error('Invalid Password');
  }

  return isPasswordValid;
};
