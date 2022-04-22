import { parse } from 'csv-parse/sync';
import fs from 'fs';

/**
 * @description Get all vaccination by location
 * @param location string
 * @returns {Promise<Array<Object>>}
 */
export const findAllVaccinationByLocation = async (location: string) => {
  let data = '';
  try {
    data = fs.readFileSync(
      `./src/data/vaccinations/country_data/${location}.csv`,
      'utf8',
    );
  } catch (error) {
    throw new Error('Invalid Location Provided');
  }

  const records = parse(data, {
    columns: true,
    skip_empty_lines: true,
  });

  return records;
};

/**
 * @description Get all vaccination
 * @returns {Promise<Array<Object>>}
 */
export const findAllVaccination = async () => {
  let data = '';
  try {
    data = fs.readFileSync('./src/data/vaccinations/locations.csv', 'utf8');
  } catch (error) {
    throw new Error('Something went wrong!!');
  }

  const records = parse(data, {
    columns: true,
    skip_empty_lines: true,
  });

  return records;
};
