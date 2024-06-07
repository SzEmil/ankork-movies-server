import { QUERY_VECTOR } from '../constants';
import { Database, DbCollection } from '../types';
import { client } from '../db/connection';

type Request = {
  body: {
    vector: number[];
  };
};
export const getMoviesData = async (req: Request) => {
  const vector =
    Object.keys(req.body).length === 0 ? QUERY_VECTOR : req.body.vector;

  if (!Array.isArray(vector)) {
    throw new Error('Invalid vector format. Vector must be an array.');
  }

  try {
    await client.connect();
    const database = client.db(Database.sampleMflix);

    const coll = database.collection(DbCollection.embededMovies);

    const agg = [
      {
        $vectorSearch: {
          index: 'vector_embedded_movies',
          path: 'plot_embedding',
          filter: {
            year: {
              $lt: 1950,
            },
          },
          queryVector: vector,
          numCandidates: 150,
          limit: 10,
          sort: { score: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          title: 1,
          plot: 1,
          score: {
            $meta: 'vectorSearchScore',
          },
        },
      },
    ];

    return await coll.aggregate(agg).toArray();
  } catch (error) {
    console.error(error);
  } 
  finally {
    await client.close();
  }
};
