import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import router from './api/api';
import cors from 'cors';
import { checkMongoDBHealth } from './db/connection';

dotenv.config();

const app: Express = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;

app.use('/api', router);

app.use((_, res, __) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Use api on routes: /api/',
    data: 'Not found',
  });
});

app.use((err: Error, _b_: any, res: Response, _a_: any) => {
  console.log(err.stack);
  res.status(500).json({
    status: 'fail',
    code: 500,
    message: err.message,
    data: 'Internal Server Error',
  });
});

checkMongoDBHealth().then(async healthy => {
  if (healthy) {
    app.listen(port, () => {
      console.log(`[server]: Server running on the port

 :${port}`);
    });
  } else {
    console.error(
      '[Server]: Error connecting to MongoDB. Server startup paused'
    );
  }
});
