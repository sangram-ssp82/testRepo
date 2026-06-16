import mongoose from 'mongoose';

/**
 * MongoDB Database Configuration
 * Database: octofit_db
 * Connection: mongodb://localhost:27017/octofit_db
 */

const MONGODB_URI = 'mongodb://localhost:27017/octofit_db';

/**
 * Connect to MongoDB using Mongoose
 * Handles connection pooling and error management
 */
export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI, {
      retryWrites: true,
      w: 'majority'
    });
    console.log('✅ Connected to MongoDB (octofit_db)');
    console.log(`📊 Database URI: ${MONGODB_URI}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
};

/**
 * Disconnect from MongoDB
 */
export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ MongoDB disconnection error:', error);
    throw error;
  }
};

/**
 * Get MongoDB connection status
 */
export const getConnectionStatus = (): string => {
  const connection = mongoose.connection;
  return connection.readyState === 1 ? 'Connected' : 'Disconnected';
};

export default {
  connectDatabase,
  disconnectDatabase,
  getConnectionStatus,
  MONGODB_URI
};
