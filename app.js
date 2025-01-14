require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const { SERVER_RUNNING_ON, INTERNAL_SERVER_ERROR} = require('./constants/app-constants')
const app = express();
const PORT = process.env.PORT || 3004;

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', taskRoutes);

// Error handling middleware
app.use((err, res) => {
    console.error(err);
    res.status(500).json({ error: INTERNAL_SERVER_ERROR });
});

// Start server
app.listen(PORT, () => console.log(`${SERVER_RUNNING_ON}${PORT}`));
