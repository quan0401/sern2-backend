import {
  createUserValidation,
  getAllGroup,
  getUserPagination,
  loginService,
} from "../service/apiServices";
import { createUser } from "../service/userServices";

const usersPaginationController = async (req, res) => {
  try {
    const { offset, limit } = req.body;
    const result = await getUserPagination(offset, limit);
    if (result.EC === 0) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      EM: "ERROR FROM usersPaginationController server",
      EC: -1,
      DT: "",
    });
  }
};

const getAllUserGroupController = async (req, res) => {
  try {
    const result = await getAllGroup();
    if (result.EC === 0) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      EM: "ERROR FROM getAllUserGroupController server",
      EC: -1,
      DT: "",
    });
  }
};

const createUserController = async (req, res) => {
  try {
    const result = await createUser({ ...req.body });
    if (+result.EC === 0) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    console.log(error);
  }
};

const createUserValidationController = async (req, res) => {
  try {
    const { fieldName, data } = req.body;
    const result = await createUserValidation(fieldName, data);
    if (result.EC === 0) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    console.log(error);
  }
};

const loginController = async (req, res) => {
  try {
    const data = req.body;
    const result = await loginService(data);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

export {
  usersPaginationController,
  getAllUserGroupController,
  createUserController,
  createUserValidationController,
  loginController,
};
