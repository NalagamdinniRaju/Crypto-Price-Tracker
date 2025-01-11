
require('dotenv').config();
const express = require('express');
const cron = require('node-cron');
const connectDB = require('./config/db');
const { fetchCryptoData } = require('./services/cryptoService');
const cryptoRoutes = require('./routes/cryptoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/', cryptoRoutes);

// Schedule background job to run every 2 hours
const cronSchedule = `0 */${process.env.UPDATE_INTERVAL} * * *`;
cron.schedule(cronSchedule, async () => {
    console.log('Running crypto data fetch job:', new Date().toISOString());
    try {
        await fetchCryptoData();
    } catch (error) {
        console.error('Scheduled job failed:', error);
    }
});

// Initial fetch when server starts
fetchCryptoData()
    .then(() => {
        console.log('Initial crypto data fetch completed');
    })
    .catch(error => {
        console.error('Initial crypto data fetch failed:', error);
    });

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Error handlers
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection:', error);
    process.exit(1);
});