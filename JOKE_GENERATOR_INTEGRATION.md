// Update the backend app.ts to include jokes routes
// Add this import at the top of backend/src/app.ts:
// import jokesRoutes from './routes/jokes.routes';

// Then add this line in the API ROUTES section:
// app.use(`${apiVersion}/jokes`, jokesRoutes);

// Example of updated API ROUTES section:
/*
// ============================================
// API ROUTES
// ============================================

const apiVersion = '/api/v1';

// Public routes (no authentication required)
app.use(`${apiVersion}/auth`, authRoutes);
app.use(`${apiVersion}/products`, productRoutes);
app.use(`${apiVersion}/categories`, categoryRoutes);
app.use(`${apiVersion}/jokes`, jokesRoutes);  // NEW: Add this line

// Protected routes (authentication required)
app.use(`${apiVersion}/cart`, authMiddleware, cartRoutes);
app.use(`${apiVersion}/orders`, authMiddleware, orderRoutes);
app.use(`${apiVersion}/payments`, authMiddleware, paymentRoutes);
app.use(`${apiVersion}/user`, authMiddleware, userRoutes);

// Admin routes (admin authentication required)
app.use(`${apiVersion}/admin`, authMiddleware, adminRoutes);
*/
