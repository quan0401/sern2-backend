import db from "../models";
import { Op } from "sequelize";
import * as status from "./return";
import { checkUserExistence, hashPassword } from "./generalServices";

const getAllUser = async () => {
  try {
    const result = await db.User.findAll({
      include: { model: db.Group, attributes: ["name", "description"] },
      raw: true,
      nest: true,
    });
    console.log(result);
    if (result) {
      return result;
    } else {
      console.log("Not found user");
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (data) => {
  try {
    const { email, phone, password } = data;
    const check = checkUserExistence(email, phone);

    if (!check) {
      const hasPass = hashPassword(password);
      console.log(hasPass);
      // const result = await db.User.create(data);
      return status.result(0, "CREATE USER SUCCESS userController", "");
    } else {
      return status.result(1, "USER EXISTED ", "");
    }
  } catch (error) {
    console.log(error);
  }
};
export { getAllUser, createUser };
