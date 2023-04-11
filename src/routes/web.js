import express from "express";
import { userPageController } from "../controller/homeController";

const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", (req, res) => {
    return res.render("home.ejs");
  });

  router.get("/user-table", userPageController);

  return app.use("/", router);
};
export default initWebRoutes;
