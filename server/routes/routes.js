import { Router } from "express";

const routes = Router();

routes.get("/", (req, res) => {
  res.send("Welcome to myFirstAWSminiProject:..");
});

export default routes;