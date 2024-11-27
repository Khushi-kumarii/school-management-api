const express = require('express');
const bodyParser = require('body-parser');
const schoolRoutes = require('./routes/schoolRoutes');

const app = express();
app.use(bodyParser.json());

// Add a root route to handle "/" requests
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// Use the school routes for API endpoints
app.use('/api', schoolRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
