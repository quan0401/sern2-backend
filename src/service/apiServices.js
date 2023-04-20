import db from "../models";
const getUserPagination = async (offset, limit) => {
  try {
    const result = await db.User.findAndCountAll({
      offset,
      limit,
      include: { model: db.Group, attributes: ["name", "description"] },
    });

    if (result) {
      return {
        EM: "Get users pagination succeeded",
        EC: 0,
        DT: result,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "ERROR FROM getUserPagination server",
      EC: -1,
      DT: "",
    };
  }
};

const getAllGroup = async () => {
  try {
    const result = await db.Group.findAll({
      attributes: ["name", "description"],
    });
    if (result) {
      return {
        EM: "GET GROUPS SUCCEEEDED",
        EC: 0,
        DT: result,
      };
    } else {
      return {
        EM: "getAllGroup error",
        EC: 1,
        DT: "",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "ERROR FROM getAllGroup server",
      EC: -1,
      DT: "",
    };
  }
};
export { getUserPagination, getAllGroup };
