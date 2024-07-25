const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
dotenv.config();

const app = express();
const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
  app.use(bodyParser.json());

  app.use('/api', authRoutes);
  app.use('/api', postRoutes);
  app.use('/api', commentRoutes);
  
  app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
      message: err.message,
      error: err
    });
  });
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});