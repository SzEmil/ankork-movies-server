import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import { QUERY_VECTOR } from './constants';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server!');
});

const uri = '<connection-string>';

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    // set namespace

    const database = client.db('sample_mflix');

    const coll = database.collection('embedded_movies');
    // define pipeline
    const agg = [
      {
        $vectorSearch: {
          index: 'vector_index',
          path: 'plot_embedding',
          filter: {
            $and: [
              {
                year: {
                  $lt: 1975,
                },
              },
            ],
          },
          queryVector: QUERY_VECTOR,
          numCandidates: 150,
          limit: 10,
        },
      },
      {
        $project: {
          _id: 0,
          title: 1,
          plot: 1,
          year: 1,
          score: {
            $meta: 'vectorSearchScore',
          },
        },
      },
    ];
    // run pipeline

    const result = coll.aggregate(agg);

    // print results

    await result.forEach(doc => console.dir(JSON.stringify(doc)));
  } finally {
    await client.close();
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});