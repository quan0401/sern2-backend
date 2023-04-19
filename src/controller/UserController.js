import db from "../models";
import { findUserWithId, checkUserExistence } from "../service/generalServices";
import {
  createUser,
  deleteUser,
  editUser,
  getAllUser,
} from "../service/userServices";

const userPageController = (req, res) => {
  return res.render("user.ejs");
};

const createUserController = async (req, res) => {
  try {
    const result = await createUser({ ...req.body });
    if (+result.EC === 0) {
      res.redirect("/user-table");
      return res.status(200).json(result);
    } else {
      res.redirect("/user-table");
      return res.status(400).json(result);
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteUserController = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deleteUser(id);
    if (+result.EC === 0) {
      res.redirect("/user-table");
      return res.status(200).json(result);
    } else {
      res.redirect("/user-table");
      return res.status(400).json(result);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "ERROR deleteUserController server",
      EC: -1,
      DT: "",
    });
  }
};

const editUserPage = async (req, res) => {
  try {
    const user = await findUserWithId(req.params.id);
    if (user) {
      return res.render("updateUser.ejs", { user });
    } else {
      return {
        EM: "USER EXISTED",
        EC: 0,
        DT: "",
      };
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "ERROR editUserPage server",
      EC: -1,
      DT: "",
    });
  }
};

const editUserController = async (req, res) => {
  try {
    const result = await editUser(req.body);
    if (result.EC === 0) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "ERROR editUserController server",
      EC: -1,
      DT: "",
    });
  }
};

const getAllUserController = async (req, res) => {
  try {
    const result = await getAllUser();
    if (result) {
      return res.status(200).json(result);
    }
  } catch (error) {
    console.log(error);
  }
};

export {
  userPageController,
  createUserController,
  deleteUserController,
  editUserPage,
  editUserController,
  getAllUserController,
};
