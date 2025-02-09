import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import authRoutes from './routes/auth.route.js';
import movieRoutes from './routes/movie.route.js';
import tvRoutes from './routes/tv.route.js';
import searchRoutes from './routes/search.route.js';
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';
import { protectRoute } from './middleware/protectRoute.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/movies', movieRoutes);
app.use('/api/v1/tv', tvRoutes);
app.use('/api/v1/search', searchRoutes);

// Serve frontend build files
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
});

// Connect to MongoDB and start the server
connectDB().then(() => {
  const port = ENV_VARS.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
}).catch((error) => {
  console.error('Failed to connect to MongoDB', error);
});