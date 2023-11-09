require('dotenv').config();

import RestaurantRoute from './routes/restaurant';

import express from 'express';
import bodyParser from 'body-parser';
import { connectToMongodb } from './database/mongodb';
import cors from 'cors';

// SETUP =======================================================================
const app = express();
app.use(cors());
app.use(bodyParser.json());
// =============================================================================

// ROUTES ======================================================================
app.get('/', (req, res) => {
  console.log(req.hostname);
  res.send('API CONNECTED');
});

app.use('/restaurants', RestaurantRoute);

app.use((req, res) => {
  res.status(404).send('NOT FOUND');
});
// =============================================================================

connectToMongodb(() => {
  const PORT = process.env.PORT || 7777;
  app.listen(PORT, () => {
    console.log(`[+] SERVER STARTED ON PORT:${PORT}`);
  });
});
