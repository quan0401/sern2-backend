import express from "express";
import { userPageController } from "../controller/userPageController";

const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", (req, res) => {
    return res.render("home.ejs");
  });

  router.get("/user", userPageController);

  return app.use("/", router);
};
export default initWebRoutes;
