import { Router, Request, Response } from 'express';
import jokesRoutes from './jokes.routes';

const router = Router();

// Health check endpoint
router.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Mount joke routes
router.use('/jokes', jokesRoutes);

export default router;
