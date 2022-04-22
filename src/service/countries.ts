import fs from 'fs';
import { STATS_COLLECTION } from '../constant/db';
import client from '../db';

/**
 * @description Get all countries
 * @returns {Promise<Array<Object>>}
 */
/* istanbul ignore next */
export const findAllCountries = async () => {
  const data = await client
    .db()
    .collection(STATS_COLLECTION)
    .find({})
    .toArray();

  const countries = data
    .map(({ data: statsData, ...rest }) => {
      const parsedData = statsData.reduce(
        (acc: any, cum: any) => ({ ...acc, ...cum }),
        {},
      );
      return { ...rest, ...parsedData };
    })
    // eslint-disable-next-line camelcase
    .filter(({ iso_code }) => !iso_code.includes('OWID'));

  return countries;
};

/**
 * @description Get all countries
 * @returns {Promise<Array<Object>>}
 */
export const findAllCountriesByFile = async () => {
  const jsonFile = fs.readFileSync('./src/data/owid-covid-data.json', 'utf8');
  const jsonData = JSON.parse(jsonFile);

  const countries = Object.keys(jsonData)
    .map((key) => {
      const { data, ...rest } = jsonData[key];
      const parsedData = data.reduce(
        (acc: any, cum: any) => ({ ...acc, ...cum }),
        {},
      );
      return { ...rest, ...parsedData, iso_code: key };
    })
    // eslint-disable-next-line camelcase
    .filter(({ iso_code }) => !iso_code.includes('OWID'));

  return countries;
};

/**
 * @description Get country data by id
 * @param id string
 * @returns {Promise<Object>}
 */
/* istanbul ignore next */
export const findCountryById = async (id: string) => {
  const country = await client
    .db()
    .collection(STATS_COLLECTION)
    .find({ iso_code: id })
    .toArray();

  if (!country[0]) {
    throw new Error('Country not found');
  }

  return country[0];
};

/**
 * @description Get country data by id
 * @param id string
 * @returns {Promise<Object>}
 */
export const findCountryByIdFile = async (id: string) => {
  const jsonFile = fs.readFileSync('./src/data/owid-covid-data.json', 'utf8');
  const jsonData = JSON.parse(jsonFile);

  if (!(id in jsonData)) {
    throw new Error('Country not found');
  }

  return { ...jsonData[id], iso_code: id };
};

/**
 * @description Get country data by ids
 * @param ids Array<string>
 * @returns {Promise<Array<Object>>}
 */
/* istanbul ignore next */
export const findCountryByIds = async (ids: string[]) => {
  const countries = await client
    .db()
    .collection(STATS_COLLECTION)
    .find({ iso_code: { $in: ids } })
    .toArray();

  return countries;
};

/**
 * @description Get country data by ids
 * @param ids Array<string>
 * @returns {Promise<Array<Object>>}
 */
export const findCountryByIdsFromFile = async (ids: string[]) => {
  const jsonFile = fs.readFileSync('./src/data/owid-covid-data.json', 'utf8');
  const jsonData = JSON.parse(jsonFile);

  const countries = ids
    .map((key) => (jsonData[key] ? { ...jsonData[key], iso_code: key } : null))
    .filter((e) => e);

  return countries;
};
