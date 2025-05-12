import mongoose from "mongoose";

// Define the type for our cached mongoose connection
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Extend the NodeJS global type
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache;
}

if (!process.env.MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

if (!process.env.MONGODB_DB) {
  throw new Error("Please define the MONGODB_DB environment variable");
}

// Initialize the cached connection
if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // Use the cached connection if it exists
  if (global.mongoose.conn) {
    return global.mongoose.conn;
  }

  // If a connection is being established, wait for it
  if (!global.mongoose.promise) {
    const opts = {
      bufferCommands: false,
    };

    global.mongoose.promise = mongoose.connect(process.env.MONGODB_URI!, opts);
  }

  try {
    // Await the connection
    const mongoose = await global.mongoose.promise;
    global.mongoose.conn = mongoose;
  } catch (e) {
    // Reset the promise on error
    global.mongoose.promise = null;
    throw e;
  }

  return global.mongoose.conn;
}

export default dbConnect;
