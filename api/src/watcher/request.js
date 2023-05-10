const mongoose = require('mongoose');
const { activityService } = require('../services');
const { logger } = require('../common');

const startStream = async () => {
  const { db } = mongoose.connection;
  if (db) {
    const collection = db.collection('requests');
    const changeStream = collection.watch({ fullDocument: 'updateLookup' });
    logger.info('change stream started');
    changeStream.on('change', (next) => {
      const { operationType, fullDocument } = next;
      if (operationType === 'insert') {
        activityService.create({
          log: `Request ${fullDocument.type} created at ${fullDocument.createdAt} and is in ${fullDocument.status} status`,
          customerId: fullDocument.customerId,
        });
      }
    });
  }
};

module.exports = startStream;
