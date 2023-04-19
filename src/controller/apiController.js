import { getUserPagination } from "../service/apiServices";

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
  }
};
export { usersPaginationController };
