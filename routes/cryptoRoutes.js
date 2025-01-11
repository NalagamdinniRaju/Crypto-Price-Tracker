
const express = require('express');
const router = express.Router();
const { getLatestStats, getDeviation, validCoins } = require('../services/cryptoService');

router.get('/stats', async (req, res) => {
    try {
        const { coin } = req.query;
        
        if (!coin || !validCoins.includes(coin)) {
            return res.status(400).json({ 
                error: 'Invalid coin parameter' 
            });
        }

        const stats = await getLatestStats(coin);
        res.json(stats);
    } catch (error) {
        console.error('Error in /stats endpoint:', error);
        res.status(500).json({ 
            error: error.message || 'Internal server error' 
        });
    }
});

router.get('/deviation', async (req, res) => {
    try {
        const { coin } = req.query;
        
        if (!coin || !validCoins.includes(coin)) {
            return res.status(400).json({ 
                error: 'Invalid coin parameter' 
            });
        }

        const deviation = await getDeviation(coin);
        res.json(deviation);
    } catch (error) {
        console.error('Error in /deviation endpoint:', error);
        res.status(500).json({ 
            error: error.message || 'Internal server error' 
        });
    }
});

module.exports = router;