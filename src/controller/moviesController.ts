import { NextFunction } from 'express';
import { Request } from 'express';
import { CODE } from '../constants';
import { getMoviesData } from '../services/movies';
import { ReqParams } from '../types';

export const movies = async (req: Request, res: any, next: NextFunction) => {
  try {
    const result = await getMoviesData(req);
    if (result) {
      const { type } = req.params;

      switch (type) {
        case ReqParams.html:
          const htmlResult = result
            .map(obj => `<li><p>${JSON.stringify(obj)}</p></li>`)
            .join('');

          return res.status(200).send(`
            <!DOCTYPE html>
              <html>
              <head>
                <title>Result</title>
              </head>
              <body>
              <a href="/api/movies/json">Change to json format</a>
                <h1>Movies data:</h1>
                <ul> ${htmlResult} </ul>
                <h2>Code:<h2>
               <p>${CODE}</p>
              </body>
              </html>
          `);
        case ReqParams.json:
          return res.status(200).json({
            status: 'success',
            code: 200,
            body: {
              data: { result },
              code: CODE,
              returnToHtml: '/api/movies/html',
            },
          });

        default:
          return res.status(200).json({
            status: 'success',
            code: 200,
            body: {
              data: { result },
              code: CODE,
            },
          });
      }
    } else {
      return res.status(404).json({
        status: 'failure',
        code: 404,
        body: {
          message: 'Results not found',
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

const moviesController = {
  movies,
};

export default moviesController;
