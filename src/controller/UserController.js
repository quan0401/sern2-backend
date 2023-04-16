import db from "../models";
import { createUser } from "../service/userServices";

const userPageController = (req, res) => {
  return res.render("user.ejs");
};

const createUserController = async (req, res) => {
  try {
    const result = await createUser({ ...req.body });
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

export { userPageController, createUserController };
