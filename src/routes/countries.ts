import express, { Request, Response } from 'express';
import {
  findAllCountriesByFile,
  findCountryByIdFile,
  findCountryByIdsFromFile,
} from '../service/countries';

const router = express.Router();

/**
 * @api {get} /country Get all countries
 * @apiName GetCountries
 * @apiGroup Countries
 * @apiVersion 1.0.0
 * @apiDescription Get all countries
 */
router.get('/', async (_req: Request, res: Response) => {
  // const data = await findAllCountries();
  const data = await findAllCountriesByFile();
  return res.status(200).json(data);
});

/**
 * @api {get} /country/compare?code=:code Get country data
 * @apiName GetCountryData
 * @apiGroup Countries
 * @apiVersion 1.0.0
 * @apiDescription Get country data
 * @apiQuery {String} code Country ISO Code
 */
router.get('/compare', async (req: Request, res: Response) => {
  const { code } = req.query;

  if (!code) {
    return res.status(200).json([]);
  }

  // const countries = findCountryByIds(code.toString().split(','));
  const countries = await findCountryByIdsFromFile(code.toString().split(','));

  return res.status(200).json(countries);
});

/**
 * @api {get} /country/:id Get country data
 * @apiName GetCountryData
 * @apiGroup Countries
 * @apiVersion 1.0.0
 * @apiDescription Get country data
 * @apiParam {String} id Country ISO Code
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id: key } = req.params;

    if (!key) {
      throw new Error('Invalid Country Code Provided');
    }

    // const country = await findCountryById(key);
    const country = await findCountryByIdFile(key);

    return res.status(200).json(country);
  } catch (error) {
    return res.status(500).json({
      error: 'ERROR',
      message: (error as Error).message,
    });
  }
});

export default router;
