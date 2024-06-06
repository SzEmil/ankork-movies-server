import express from 'express';
import moviesController from '../controller/moviesController';
import { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send(
    `<h2>Hello ANKORK!</h2>
   <p>Use /api/movies/html or /api/movies/json to get task result. You can specify body in POST request (example: body: {"vector": "[0.1,0.2,0.3]"} to send custom vector into server</p>`
  );
});
router.post('/movies/:type', moviesController.movies);

export default router;
