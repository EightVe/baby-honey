import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js'
import guestRouter from './routes/guest.route.js'
import sessionRouter from './routes/session.route.js'
import protectedRoutes from './routes/protected.route.js'
import userRouter from './routes/user.route.js'
import verificationsRouter from './routes/verifications.route.js'
import productsRouter from './routes/product.route.js'
import cartRouter from './routes/cart.route.js'
import cors from 'cors';
dotenv.config();

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log('Connected to Database!');
  })
  .catch((err) => {
    console.log(err);
  });
  const __dirname = path.resolve();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.APP_ORIGIN, // Ensure this matches your Vite server
  credentials: true,
}));

app.use('/api', protectedRoutes);
app.use('/api/auth', authRouter);
app.use('/api/guest', guestRouter);
app.use('/api/user', userRouter);
app.use('/api/sessions', sessionRouter);
app.use('/api/verifications', verificationsRouter);
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.listen(3000,()=>{
    console.log("Server Started Succesfully")
})


app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });