const { handleError } = require('../utils/errorHandler');

const validateDateRange = (req, res, next) => {
    try {
        const { start, end } = req.query;
        if (!start || !end) {
            throw new Error('Missing start or end date');
        }
        const startDate = new Date(start);
        const endDate = new Date(end);
        if (isNaN(startDate) || isNaN(endDate)) {
            throw new Error('Invalid date format');
        }
        if (startDate > endDate) {
            throw new Error('Start date cannot be after end date');
        }
        req.query.start = startDate;
        req.query.end = endDate;
        next();
    } catch (error) {
        handleError(error, res);
    }
};

module.exports = { validateDateRange };