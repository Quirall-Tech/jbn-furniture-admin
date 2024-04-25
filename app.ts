import express from "express";
import "dotenv/config";
import { connectDB } from "./src/db/connection";
import { router as authRouter } from "./src/routes/auth.route";

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
