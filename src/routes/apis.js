import express from "express";
import {
  getAllUserGroupController,
  usersPaginationController,
  createUserController,
  createUserValidationController,
  loginController,
} from "../controller/apiController";
import { getAllUserController } from "../controller/UserController";

const router = express.Router();

const initApiRoutes = (app) => {
  router.post("/user-table/view", usersPaginationController);

  router.get("/users", getAllUserController);

  router.get("/user/group", getAllUserGroupController);

  router.post("/user/create-user", createUserController);

  router.post("/user/create-user-validation", createUserValidationController);

  router.post("/login", loginController);

  return app.use("/api/", router);
};

export default initApiRoutes;
