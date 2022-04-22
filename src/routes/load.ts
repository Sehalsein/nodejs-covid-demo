/* istanbul ignore file */
import express, { Request, Response } from 'express';
import fs from 'fs';
import { STATS_COLLECTION } from '../constant/db';
import client from '../db';

const router = express.Router();

router.post('/', async (_req: Request, res: Response) => {
  try {
    const jsonFile = fs.readFileSync('./src/data/owid-covid-data.json', 'utf8');
    const jsonData = JSON.parse(jsonFile);

    const countries = Object.keys(jsonData)
      .map((key) => ({ ...jsonData[key], iso_code: key }))
      // eslint-disable-next-line camelcase
      .filter(({ iso_code }) => !iso_code.includes('OWID'));

    await client.db().collection(STATS_COLLECTION).insertMany(countries);

    res.status(200).json({
      message: 'ADS',
    });
  } catch (error) {
    throw new Error('Something went wrong');
  }
});

export default router;
