import db from "../models";
import * as status from "./return";
import {
  checkUserExistence,
  findUserWithId,
  hashPassword,
} from "./generalServices";

const getAllUser = async () => {
  try {
    const result = await db.User.findAll({
      include: { model: db.Group, attributes: ["name", "description"] },
      raw: true,
      nest: true,
    });
    if (result) {
      return result;
    } else {
      console.log("No users found");
      return null;
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "ERROR getAllUser server userService",
      EC: -1,
      DT: "",
    };
  }
};

const createUser = async (data) => {
  try {
    console.log(data);
    const { email, phone, password } = data;
    const check = await checkUserExistence(email, phone);
    if (!check) {
      const hasPass = hashPassword(password);
      const result = await db.User.create({ ...data, password: hasPass });
      return status.result(0, "CREATE USER SUCCESS userController", "");
    } else {
      return status.result(1, "USER EXISTED ", "");
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "ERROR createUser server userService",
      EC: -1,
      DT: "",
    };
  }
};

const deleteUser = async (id) => {
  try {
    const user = await findUserWithId(id);
    console.log(">>> check user", user);
    if (user) {
      await user.destroy();
      return {
        EM: "Deleted user",
        EC: 0,
        DT: "",
      };
    } else {
      return {
        EM: "USER NOT FOUND",
        EC: 1,
        DT: "",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "ERROR deleteUser server userService",
      EC: -1,
      DT: "",
    };
  }
};

const editUser = async (data) => {
  try {
    const { email, id, phone, password } = data;
    const check = await checkUserExistence(email, phone);
    if (!check) {
      const user = await findUserWithId(id);
      if (!user)
        return {
          EM: "Cannot find user in editUser userServices",
          EC: 1,
          DT: "",
        };

      const hashPass = hashPassword(password);
      user.set({
        ...data,
        password: hashPass,
      });
      await user.save();

      return {
        EM: "Updated user",
        EC: 0,
        DT: "",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "ERROR editUser server userService",
      EC: -1,
      DT: "",
    };
  }
};
export { getAllUser, createUser, deleteUser, editUser };
