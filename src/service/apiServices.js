import db from "../models";
const getUserPagination = async (offset, limit) => {
  try {
    const result = await db.User.findAndCountAll({
      offset,
      limit,
      include: { model: db.Group, attributes: ["name", "description"] },
    });
    console.log("Checking offset: ", offset);
    console.log("Checking limit: ", limit);

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
export { getUserPagination };
