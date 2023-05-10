const mongoose = require('mongoose');
const { activityService } = require('../services');
const { logger } = require('../common');

const startStream = async () => {
  const { db } = mongoose.connection;
  if (db) {
    const collection = db.collection('transactions');
    const changeStream = collection.watch({ fullDocument: 'updateLookup' });
    logger.info('change stream started');
    changeStream.on('change', (next) => {
      const { operationType, fullDocument } = next;
      if (operationType === 'insert') {
        activityService.create({
          log: `Transaction ${fullDocument.type} created at ${fullDocument.createdAt}, for amount ${fullDocument.amount} and is in ${fullDocument.status} status`,
          customerId: fullDocument.customerId,
        });
      }
    });
  }
};

module.exports = startStream;
