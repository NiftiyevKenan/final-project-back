import express from 'express';
import notePubgRouter from './routes/notePubgRouter.js'; 
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoute.js';
// import todoRoutes from './routes/todoRoute.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000; 
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('MONGO_URI environment variable is not set.');
  process.exit(1); 
}



app.use('/api/Pubg', notePubgRouter);

connectDB();

app.use('/api/users', userRoutes);
// app.use('/api/todos', todoRoutes);

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Successfully connected to the database');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection error:', err.message);
    process.exit(1);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;
