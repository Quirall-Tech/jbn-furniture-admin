import express from "express";
import cors from "cors";
import { connectDB } from "./src/db/connection";
import { router as authRouter } from "./src/routes/auth.route";
import { router as projectRouter } from "./src/routes/project.route";
import { router as itemRouter } from "./src/routes/item.route";
import { envVariables } from "./src/config/environments";

import "./src/config/globals";
import "dotenv/config";

envVariables.parse(process.env);





const app = express();

const corsOptions = {
  origin:["http://localhost:4200","*"],
  credentials:true
};
const port = process.env.PORT || 3000;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/auth", authRouter);
app.use("/project", projectRouter);
app.use("/item", itemRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
