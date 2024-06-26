const { sequelize, Job, Contract, Profile } = require('../models/model');
const { Op, fn, col, literal} = require('sequelize');

async function getUnpaidJobsForProfile(profileId) {
    try {
        const unpaidJobs = await Job.findAll({
            where: {
                paid: false
            },
            include: [{
                model: Contract,
                where: {
                    status: 'in_progress',
                    [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }]
                }
            }]
        });
        return unpaidJobs;
    } catch (error) {
        console.error('Error fetching unpaid jobs:', error);
        throw error;
    }
}

async function payForJob(profileId, jobId) {
    try {
        return await sequelize.transaction(async (t) => {
            const jobPromise = Job.findOne({
                where: { id: jobId },
                include: [{
                    model: Contract,
                    where: {
                        status: 'in_progress',
                        [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }]
                    }
                }],
                transaction: t,
                lock: true
            });

            const clientPromise = Profile.findOne({
                where: { id: profileId },
                transaction: t,
                lock: true
            });

            const [job, client] = await Promise.all([jobPromise, clientPromise]);

            if (!job || job.paid) {
                throw new Error('Job not found or already paid');
            }

            if (!client) {
                throw new Error('Client profile not found');
            }

            const amountToPay = job.price;

            if (client.balance < amountToPay) {
                throw new Error('Insufficient balance');
            }

            const contractor = await Profile.findByPk(job.Contract.ContractorId, { transaction: t });

            await Promise.all([
                client.update({ balance: client.balance - amountToPay }, { transaction: t }),
                contractor.update({ balance: contractor.balance + amountToPay }, { transaction: t }),
                job.update({ paid: true, paymentDate: new Date() }, { transaction: t })
            ]);

            return 'Payment successful';
        });
    } catch (error) {
        throw new Error('Payment failed: ' + error.message);
    }
}

async function calculateTotalUnpaidJobs(profileId, transaction) {
    try {
        return await Job.sum('price', {
            where: {
                paid: false,
            },
            include: [{
                model: Contract,
                where: {
                    status: 'in_progress',
                    ClientId: profileId 
                }
            }],
            transaction
        });
    } catch (error) {
        throw new Error('Error calculating total unpaid jobs: ' + error.message);
    }
}

async function getBestProfession (startDate, endDate) {
    try {

        const bestProfession = await Job.findOne({
            include: [
                {
                    model: Contract,
                    attributes: [],
                    include: [
                        {
                            model: Profile,
                            as: 'Contractor',
                            attributes: []
                        }
                    ]
                }
            ],
            where: {
                paid: true,
                paymentDate: {
                    [Op.between]: [startDate, endDate] 
                }
            },
            attributes: [
                [literal('`Contract->Contractor`.`profession`'), 'profession'], 
                [fn('SUM', col('price')), 'totalEarnings']
            ],
            group: [literal('`Contract->Contractor`.`profession`')],
            order: [[fn('SUM', col('price')), 'DESC']],
            raw: true
        });
        if (!bestProfession) {
            return { message: 'No profession found within the specified date range.' };
        }
        return bestProfession
    } catch (error) {
        console.error('Error in getBestProfession:', error);
        throw new Error('Error finding the best profession');
    }
};


module.exports = {getUnpaidJobsForProfile, payForJob, calculateTotalUnpaidJobs, getBestProfession}