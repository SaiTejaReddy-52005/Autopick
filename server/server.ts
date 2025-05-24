import express from 'express';
import cors from 'cors';
import { storage } from './storage';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Get all cars
app.get('/api/cars', async (req, res) => {
  try {
    const cars = await storage.getCars();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cars' });
  }
});

// Get filtered cars
app.post('/api/cars/filter', async (req, res) => {
  try {
    const filter = req.body;
    const cars = await storage.getFilteredCars(filter);
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: 'Failed to filter cars' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 