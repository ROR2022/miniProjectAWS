import express  from "express";
import routes from "./routes/routes.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.static(join(__dirname, "../client")));
app.use("/api/", routes);

export { app };