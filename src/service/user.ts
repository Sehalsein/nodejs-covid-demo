import { USERS_COLLECTION } from '../constant/db';
import client from '../db';

// eslint-disable-next-line import/prefer-default-export
export const updateUserSearchHistory = async (email: string, payload: any) => {
  await client
    .db()
    .collection(USERS_COLLECTION)
    .updateOne(
      { email },
      {
        $set: {
          searchHistory: payload,
        },
      },
    );

  return 'Success';
};
