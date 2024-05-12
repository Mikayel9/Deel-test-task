const validateDeposit = async (req, res, next) => {
    const { amount } = req.body;
    if (!amount || isNaN(amount) || amount <= 0) {
        return res.status(400).json({ error: 'Invalid or missing deposit amount' });
    }
    next();
};

module.exports = {validateDeposit}