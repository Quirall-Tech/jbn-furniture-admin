import express from "express";
import cors from "cors";
import { connectDB } from "./src/db/connection";
import { router as authRouter } from "./src/routes/auth.route";
import { router as projectRouter } from "./src/routes/project.route";
import { router as itemRouter } from "./src/routes/item.route";
import { router as userRouter } from "./src/routes/user.route";
import { router as empRouter } from "./src/routes/emp.route";
import { envVariables } from "./src/config/environments";

import "./src/config/globals";
import "dotenv/config";

envVariables.parse(process.env);





const app = express();

const corsOptions = {
  origin: "https://jbn-furniture.netlify.app", // Only one origin for testing
  credentials: true
};
const port = process.env.PORT || 3000;

app.use(cors(corsOptions));
// Middleware to log response headers (for debugging)
app.use((req, res, next) => {
  const originalSend = res.send;
  res.send = function (body) {
    console.log('Response Headers:');
    console.log(res.getHeaders());  // Log the headers to verify CORS headers
    originalSend.call(this, body);  // Continue the response process
  };
  next(); // Proceed to the next middleware or route handler
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/auth", authRouter);
app.use("/project", projectRouter);
app.use("/item", itemRouter);
app.use("/user", userRouter);
app.use("/emp", empRouter);

// Optionally handle OPTIONS preflight requests
app.options('*', cors(corsOptions)); // This ensures preflight requests are handled

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
