import express from "express";
import { usersPaginationController } from "../controller/apiController";
import { getAllUserController } from "../controller/UserController";

const router = express.Router();

const initApiRoutes = (app) => {
  router.post("/user-table", usersPaginationController);

  router.get("/users", getAllUserController);

  return app.use("/api/", router);
};

export default initApiRoutes;
