const mongoose = require('mongoose');

const config = require('./keys');
const logger = require('./logger');

const connectDb =async () =>
await mongoose.connect(config.mongoUrl, {
  useNewUrlParser: true,
  serverSelectionTimeoutMS: 5000,
})
  .then((db) => {
    logger.info('Connected to MongoDB...');
    // dbWatcher();
    return db;
  })
  .catch((err) => {
    console.log(err);
    logger.error('Could not connect to MongoDB, exiting the application');
    process.exit();
    return null;
  });


module.exports = connectDb;
