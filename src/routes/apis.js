import express from "express";
import {
  getAllUserGroupController,
  usersPaginationController,
  createUserController,
} from "../controller/apiController";
import { getAllUserController } from "../controller/UserController";

const router = express.Router();

const initApiRoutes = (app) => {
  router.post("/user-table/view", usersPaginationController);

  router.get("/users", getAllUserController);

  router.get("/user/group", getAllUserGroupController);

  router.post("/user/create-user", createUserController);

  return app.use("/api/", router);
};

export default initApiRoutes;
