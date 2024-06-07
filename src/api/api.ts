import express from 'express';
import moviesController from '../controller/moviesController';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { ROUTES, VIEWS } from '../types/routes';

const router = express.Router();
dotenv.config();

router.get(ROUTES.home, (req: Request, res: Response) => {
  const appUrl = process.env.API_URL;
  return res.status(200).render(VIEWS.home, { appUrl });
});
router.get(ROUTES.movies, (req: Request, res: Response) => {
  return res.redirect(ROUTES.moviesHtml);
});
router.post(ROUTES.movies, (req: Request, res: Response) => {
  return res.redirect(ROUTES.moviesHtml);
});
router.get(`${ROUTES.movies}/:type`, moviesController.movies);
router.post(`${ROUTES.movies}/:type`, moviesController.movies);

export default router;
