
const axios = require('axios');
const CryptoData = require('../models/CryptoData');
const calculateStandardDeviation = require('../utils/standardDeviation');

const validCoins = ['bitcoin', 'matic-network', 'ethereum'];

const fetchCryptoData = async () => {
    try {
        const response = await axios.get(
            `${process.env.COINGECKO_API_URL}/simple/price`,
            {
                params: {
                    ids: validCoins.join(','),
                    vs_currencies: 'usd',
                    include_market_cap: true,
                    include_24hr_change: true
                }
            }
        );

        for (const coinId of validCoins) {
            const data = response.data[coinId];
            await CryptoData.create({
                coinId,
                price: data.usd,
                marketCap: data.usd_market_cap,
                priceChange24h: data.usd_24h_change
            });
        }
        console.log('Crypto data updated successfully');
    } catch (error) {
        console.error('Error fetching crypto data:', error);
        throw error;
    }
};

const getLatestStats = async (coinId) => {
    if (!validCoins.includes(coinId)) {
        throw new Error('Invalid coin ID');
    }

    const latestData = await CryptoData.findOne({ coinId })
        .sort({ timestamp: -1 });
    
    if (!latestData) {
        throw new Error('No data found for this coin');
    }

    return {
        price: latestData.price,
        marketCap: latestData.marketCap,
        "24hChange": latestData.priceChange24h
    };
};

const getDeviation = async (coinId) => {
    if (!validCoins.includes(coinId)) {
        throw new Error('Invalid coin ID');
    }

    const prices = await CryptoData.find({ coinId })
        .sort({ timestamp: -1 })
        .limit(100)
        .select('price');

    if (!prices.length) {
        throw new Error('No data found for this coin');
    }

    const priceValues = prices.map(p => p.price);
    const deviation = calculateStandardDeviation(priceValues);

    return { deviation };
};

module.exports = {
    fetchCryptoData,
    getLatestStats,
    getDeviation,
    validCoins
};