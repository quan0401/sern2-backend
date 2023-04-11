import db from "../models";
const getAllUser = async () => {
  const result = await db.User.findAll({
    // raw: true,
  });
  console.log(result);
  if (result) {
    return result;
  } else {
    console.log("Not found user");
    return null;
  }
};
export { getAllUser };
