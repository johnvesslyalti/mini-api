import express from "express";
import authRoutes from "./modules/auth/auth.routes"
import userRoutes from "./modules/user/user.routes"
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express()

app.use(express.json());

app.use("/api/v1/auth", authRoutes)
app.use("api/v1/users", userRoutes)

app.use(errorMiddleware);

export default app;