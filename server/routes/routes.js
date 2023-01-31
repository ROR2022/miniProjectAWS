import { Router } from "express";
import { createNewUser, getSaludo } from "../controllers/apiEstress.js";

const routes = Router();

routes.get("/", (req, res) => {
  res.json("Welcome to myFirstAWSminiProject:..");
});

routes.get('/getSaludo/',getSaludo);

routes.post('/createNewUser/',createNewUser);

export default routes;