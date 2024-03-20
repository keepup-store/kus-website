import express, { Request, Response } from 'express';
import path from 'path';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.render('website/index', { message: 'Hello, Mustache!' });
});


export default router;