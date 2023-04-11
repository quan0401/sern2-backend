import db from "../models";
import * as userServices from "../service/userServices";
const userPageController = async (req, res) => {
  const userList = await userServices.getAllUser();
  return res.render("user.ejs", { userList });
};

const getAllUsers = async (req, res) => {};
export { userPageController, getAllUsers };
