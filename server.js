const Express = require('express');
const DotEnv = require('dotenv');
const Morgan = require('morgan');
const Logger = require('./utils/logger.js');
const Config = require('./config/GlobalConfig.js')
const { refreshAllBeastData } = require('./rs_api/bestiary.js');

// Load environment variables
DotEnv.config({ path: './config/config.env' });

const app = Express();

// Dev logging middleware
if (process.env.NODE_ENV === 'Development') {
  app.use(Morgan('dev'));
}

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  Logger.info(
    `The server was started in ${process.env.ENV} mode on port ${PORT}.`
  )
);

if (Config.RefreshDatabase) {
  Logger.info('Beginning to refresh the database with new data...');
  refreshAllBeastData();
  Logger.info('Finished refreshing the database with new data...');
}

// Handle Unhandled Promise Rejections
process.on('unhandledRejection', (err, promise) => {
  Logger.error(`Error: ${err.message}`.red);
  // Close server and exit process
  server.close(() => process.exit(1));
});
