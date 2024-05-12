const { Profile} = require('../models/model');

async function depositMoney(profileId, amount, transaction,totalUnpaidJobs) {
    try {
        const client = await Profile.findOne({
            where: { id: profileId, type: 'client',},
            transaction,
            lock: true
        });
        if (!client) {
            throw new Error('Client profile not found');
        }
        const maxDeposit = totalUnpaidJobs * 0.25;
        if (amount > maxDeposit) {
            throw new Error(`Deposit amount exceeds the maximum allowed deposit of ${maxDeposit}`);
        }
        await client.update({ balance: client.balance + amount }, { transaction });

        return 'Deposit successful';
    } catch (error) {
        throw new Error('Deposit failed: ' + error.message);
    }
}

module.exports = { depositMoney };
