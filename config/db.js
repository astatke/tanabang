// db.js
const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    if (process.env.MONGODB) {
      const conn = await mongoose.connect(process.env.MONGODB, {
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds
        bufferCommands: false // Disable mongoose buffering
      });
      isConnected = true;
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } else {
      console.warn("No MongoDB Connection String. Please add one and try again.");
    }
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    isConnected = false;
    // Don't throw in production, just log the error
    if (process.env.NODE_ENV !== 'production') {
      throw error;
    }
  }
};

// Export connection status checker
const isDbConnected = () => isConnected;

module.exports = { connectDB, isDbConnected };