const express = require('express');
const router = express.Router();
const db = require('../db');

// Add School API
router.post('/addSchool', async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).send({ message: 'All fields are required.' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name, address, latitude, longitude]
    );
    res.status(201).send({ message: 'School added successfully.', id: result.insertId });
  } catch (err) {
    res.status(500).send({ message: 'Error adding school.', error: err.message });
  }
});

// List Schools API
router.get('/listSchools', async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).send({ message: 'Latitude and Longitude are required.' });
  }

  try {
    const [schools] = await db.query('SELECT * FROM schools');

    const sortedSchools = schools.map((school) => {
      const distance = Math.sqrt(
        Math.pow(school.latitude - latitude, 2) + Math.pow(school.longitude - longitude, 2)
      );
      return { ...school, distance };
    }).sort((a, b) => a.distance - b.distance);

    res.send(sortedSchools);
  } catch (err) {
    res.status(500).send({ message: 'Error retrieving schools.', error: err.message });
  }
});

module.exports = router;
