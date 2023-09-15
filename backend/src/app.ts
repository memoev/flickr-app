import express, { Express } from "express";
import feedRoutes from "./routes/feedRoutes";
import { config } from "dotenv";

config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(express.json());
app.use("/api", feedRoutes);

const server = app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});

export default server;
