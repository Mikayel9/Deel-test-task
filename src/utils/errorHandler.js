function handleError(error, res) {
    let statusCode = 500; 
    if (error.message.includes('not found')) {
        statusCode = 404;
    } else if (error.message.includes('Invalid')) {
        statusCode = 422;
    }

    console.error('An error occurred:', error);
    res.status(statusCode).json({ error: error.message });
}

module.exports = { handleError };