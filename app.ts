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
  origin: ["http://localhost:4200", "https://jbn-modular.netlify.app", "https://www.jbn-modular.online","https://www.jbn-modular.com"],
  credentials: true
};
const port = process.env.PORT || 3000;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/auth", authRouter);
app.use("/project", projectRouter);
app.use("/item", itemRouter);
app.use("/user", userRouter);
app.use("/emp", empRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
