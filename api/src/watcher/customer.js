const mongoose = require('mongoose');
const { activityService } = require('../services');
const { logger } = require('../common');

const startStream = async () => {
  const { db } = mongoose.connection;
  if (db) {
    const collection = db.collection('customers');
    const changeStream = collection.watch({ fullDocument: 'updateLookup' });
    logger.info('change stream started');
    changeStream.on('change', (next) => {
      const { operationType, fullDocument, updateDescription } = next;
      if (operationType === 'update') {
        const { updatedFields } = updateDescription || {};
        if (updatedFields && updatedFields.country) {
          activityService.create({
            customerId: fullDocument._id,
            log: `Country of residence changed to ${updatedFields.country}`,
          });
        }
      }
    });
  }
};

module.exports = startStream;
