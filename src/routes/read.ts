/* istanbul ignore file */
import { parse } from 'csv-parse/sync';
import express, { Request, Response } from 'express';
import fs from 'fs';

const router = express.Router();

router.get('/*', (req: Request, res: Response) => {
  try {
    const filePath = req.params[0];
    const data = fs.readFileSync(`./src/data/${filePath}.csv`, 'utf8');
    const records = parse(data, {
      columns: true,
      skip_empty_lines: true,
    });

    res.status(200).json({
      message: 'Read: Hello World',
      records,
    });
  } catch (error) {
    throw new Error('Something went wrong');
  }
});

export default router;
