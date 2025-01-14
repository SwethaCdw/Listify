require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 3004;

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', taskRoutes); // Task routes

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
