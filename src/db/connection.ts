import mongoose from "mongoose";

export const connectDB = async () => {
  const dbName = process.env.DB_NAME;
  const dbPass = process.env.DB_PASS;
  const dbUser = process.env.DB_USER;

  return await mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@jbn-damakha.h1fuhew.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=jbn-damakha`);
};
