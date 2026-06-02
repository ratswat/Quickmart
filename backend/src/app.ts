import express, { Express, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-ratelimit';

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import cartRoutes from './routes/cart.routes';
import orderRoutes from './routes/order.routes';
import paymentRoutes from './routes/payment.routes';
import userRoutes from './routes/user.routes';
import categoryRoutes from './routes/category.routes';
import adminRoutes from './routes/admin.routes';

// Import middleware
import { errorHandler } from './middleware/error.middleware';
import { authMiddleware } from './middleware/auth.middleware';

const app: Express = express();
const PORT = process.env.PORT || 3001;

// ============================================
// SECURITY MIDDLEWARE
// ============================================

// Helmet helps secure Express apps with various HTTP headers
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// ============================================
// BODY PARSING MIDDLEWARE
// ============================================

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(compression());

// ============================================
// LOGGING MIDDLEWARE
// ============================================

app.use(morgan('combined'));

// ============================================
// HEALTH CHECK ENDPOINT
// ============================================

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ============================================
// API ROUTES
// ============================================

const apiVersion = '/api/v1';

// Public routes (no authentication required)
app.use(`${apiVersion}/auth`, authRoutes);
app.use(`${apiVersion}/products`, productRoutes);
app.use(`${apiVersion}/categories`, categoryRoutes);

// Protected routes (authentication required)
app.use(`${apiVersion}/cart`, authMiddleware, cartRoutes);
app.use(`${apiVersion}/orders`, authMiddleware, orderRoutes);
app.use(`${apiVersion}/payments`, authMiddleware, paymentRoutes);
app.use(`${apiVersion}/user`, authMiddleware, userRoutes);

// Admin routes (admin authentication required)
app.use(`${apiVersion}/admin`, authMiddleware, adminRoutes);

// ============================================
// 404 HANDLER
// ============================================

app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.path,
    method: req.method,
  });
});

// ============================================
// ERROR HANDLING MIDDLEWARE
// ============================================

app.use(errorHandler);

// ============================================
// SERVER STARTUP
// ============================================

const server = app.listen(PORT, () => {
  console.log(`\n🚀 Server is running on port ${PORT}`);
  console.log(`📡 API Base URL: http://localhost:${PORT}/api/v1`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`\nEnvironment: ${process.env.NODE_ENV || 'development'}`);
});

// ============================================
// GRACEFUL SHUTDOWN
// ============================================

process.on('SIGTERM', () => {
  console.log('\n⚠️  SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\n⚠️  SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

export default app;