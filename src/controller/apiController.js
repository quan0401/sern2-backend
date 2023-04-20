import { getAllGroup, getUserPagination } from "../service/apiServices";
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

export {
  usersPaginationController,
  getAllUserGroupController,
  createUserController,
};
