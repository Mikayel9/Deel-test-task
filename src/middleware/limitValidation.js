function validateLimit(req, res, next) {
    let { limit } = req.query;

    if (!limit) {
        limit = 2;
    } else {
        limit = parseInt(limit, 10);
        if (isNaN(limit) || limit <= 0) {
            return res.status(400).json({
                error: 'Invalid limit parameter. Must be a positive integer.',
            });
        }
    }

    req.query.limit = limit;

    next();
}

module.exports = { validateLimit };