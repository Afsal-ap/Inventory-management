import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import itemRoutes from './routes/itemRoutes';
import customerRoutes from './routes/customerRoutes';
import saleRoutes from './routes/saleRoutes';
import reportRoutes from './routes/reportRoutes';
import exportRoutes from './routes/exportRoutes';

const app = express();


app.use(cors({
  origin: 'https://inventorymanagement-puce.vercel.app', 
  credentials: true               
}));

app.use(express.json());

// TODO: Add routes

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/reports', reportRoutes)
app.use('/api/export', exportRoutes);


app.get('/', (req, res) => {
  res.send('API is running');
});

export default app;
