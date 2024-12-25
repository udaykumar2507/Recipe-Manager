const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipe');

dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/recipes', recipeRoutes);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));