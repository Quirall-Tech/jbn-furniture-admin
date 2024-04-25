import mongoose from "mongoose";

export const connectDB = async () => {
  const dbName = process.env.DB_NAME;
  const dbHost = process.env.DB_HOST;
  const dbPort = process.env.DB_PORT;

  return await mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`);
};
