import db from "../models";
import { Op } from "sequelize";
import bcrypt from "bcryptjs";

const checkUserExistence = async (email, phone) => {
  try {
    return await db.User.findOne({
      where: {
        [Op.or]: [{ email }, { phone }],
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const findUserWithId = async (id) => {
  try {
    const result = await db.User.findOne({ where: { id } });
    return result ? result : null;
  } catch (error) {
    console.log(error);
  }
};

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

export { checkUserExistence, hashPassword, findUserWithId };
