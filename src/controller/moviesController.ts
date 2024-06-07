import { NextFunction } from 'express';
import { Request } from 'express';
import { CODE } from '../constants';
import { getMoviesData } from '../services/movies';
import { ReqParams } from '../types';

export const movies = async (req: Request, res: any, next: NextFunction) => {
  try {
    const appUrl = process.env.API_URL;

    try {
      const result = await getMoviesData(req);

      if (result) {
        const { type } = req.params;

        switch (type) {
          case ReqParams.html:
            return res.status(200).render('movies', { result, CODE, appUrl });
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
      return res.status(400).json({ error });
    }
  } catch (error) {
    next(error);
  }
};

const moviesController = {
  movies,
};

export default moviesController;
