import { MongoClient } from 'mongodb';

// TODO: DEMO PURPOSE URL HARDCODED Connection URL
const url =
  process.env.MONGO_URI ||
  'mongodb+srv://covid-app:P8LhBzeuYs0Ct7wK@cluster0.sk18u.mongodb.net/covid-test?retryWrites=true&w=majority';

const client = new MongoClient(url);

// Database Name
export const connect = () => {
  client.connect();
};

export default client;
