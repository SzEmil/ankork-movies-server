import express from 'express';
import moviesController from '../controller/moviesController';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();

router.get('/', (req: Request, res: Response) => {
  const appUrl = process.env.API_URL;
  return res.status(200).render('home', { appUrl });
});

router.get('/movies/:type', moviesController.movies);
router.post('/movies/:type', moviesController.movies);

export default router;
