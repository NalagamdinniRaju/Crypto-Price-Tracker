const calculateStandardDeviation = (values) => {
    // Check for empty array or invalid input
    if (!Array.isArray(values) || values.length === 0) {
        throw new Error('Invalid input for standard deviation calculation');
    }

    // Calculate mean
    const mean = values.reduce((sum, value) => sum + value, 0) / values.length;

    // Calculate sum of squared differences from mean
    const squaredDifferences = values.map(value => Math.pow(value - mean, 2));
    const variance = squaredDifferences.reduce((sum, value) => sum + value, 0) / values.length;

    // Calculate standard deviation
    const standardDeviation = Math.sqrt(variance);

    // Return rounded to 2 decimal places
    return parseFloat(standardDeviation.toFixed(2));
};

module.exports = calculateStandardDeviation;