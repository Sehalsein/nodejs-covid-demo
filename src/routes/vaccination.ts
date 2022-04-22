import express, { Request, Response } from 'express';
import {
  findAllVaccination,
  findAllVaccinationByLocation,
} from '../service/vaccination';

const router = express.Router();

/**
 * @api {get} /api/vaccination/:id Get Vaccination Data for a country
 * @apiName GetVaccinationData
 * @apiGroup Vaccination
 * @apiVersion 1.0.0
 * @apiDescription Get Vaccination Data for a country
 * @apiParam {String} id Country Name
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id: location } = req.params;

    if (!location) {
      throw new Error('Invalid Location Provided');
    }

    const data = await findAllVaccinationByLocation(location);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error: 'ERROR',
      message: (error as Error).message,
    });
  }
});

/**
 * @api {get} /api/vaccination
 * @apiName GetVaccinations
 * @apiGroup Vaccinations
 * @apiVersion 1.0.0
 * @apiDescription Get Vaccinations for a list of country
 */
router.get('/', async (_req: Request, res: Response) => {
  try {
    const data = await findAllVaccination();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error: 'ERROR',
      message: (error as Error).message,
    });
  }
});

export default router;
