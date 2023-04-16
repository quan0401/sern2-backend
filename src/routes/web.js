import express from "express";
import { userPageController } from "../controller/homeController";
import { createUserController } from "../controller/UserController";

const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", (req, res) => {
    return res.render("home.ejs");
  });

  router.get("/user-table", userPageController);

  router.post("/user/create-user", createUserController);

  return app.use("/", router);
};
export default initWebRoutes;
