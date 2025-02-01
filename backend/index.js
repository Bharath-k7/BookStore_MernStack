import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

import bookRoutes from './routes/bookRoutes.js';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));
app.use(morgan('dev'));
// app.use(
//   cors({
//     origin: 'http://localhost:3000/',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['content-type'],
//     credentials: true,
//   })
// );
app.use(cors());
const resultEnv = dotenv.config();
if (!resultEnv.error) {
  console.log('ok fine', resultEnv.parsed);
} else {
  console.log('error', resultEnv.error);
}

app.get('/', (req, res) => {
  res.status(200).send('successfully reached the home page');
});

app.use('/books', bookRoutes);

//Datbase connection
const mongoDbString = process.env.MONGODB_STRING.replace(
  '<db_password>',
  process.env.MONGODB_PASSWORD
);
mongoose
  .connect(mongoDbString, {
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connected successfully!');
  })
  .catch((err) => {
    console.log('Error while connecting database', err);
  });

//Listening to the port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on the port ${port}`);
});
