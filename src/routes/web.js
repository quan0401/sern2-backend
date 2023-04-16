import express from "express";
import { userPageController } from "../controller/homeController";
import {
  createUserController,
  deleteUserController,
  editUserController,
  editUserPage,
} from "../controller/UserController";

const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", (req, res) => {
    return res.render("home.ejs");
  });

  router.get("/user-table", userPageController);

  router.get("/user/edit-user/:id", editUserPage);

  router.get("/user/edit-user", editUserPage);

  router.post("/user/delete-user/:id", deleteUserController);

  router.post("/user/update-user", editUserController);

  return app.use("/", router);
};
export default initWebRoutes;
