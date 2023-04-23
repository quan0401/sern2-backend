import db from "../models";
import {
  checkEmailExistence,
  checkPasswordStrength,
  checkUserData,
} from "./generalServices";
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

const createUserValidation = async (fieldName, data) => {
  try {
    switch (fieldName) {
      case "email":
        const validateEmail = (email) => {
          return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
        };
        if (!validateEmail(data))
          return {
            EM: "Not a valid email",
            EC: 1,
            DT: "",
          };
        const result = await checkUserData("email", data);
        if (result)
          return {
            EM: "Email is already existed",
            EC: 1,
            DT: "",
          };
        else
          return {
            EM: "Nice email",
            EC: 0,
            DT: "",
          };

      case "username":
        if (data.trim() === "")
          return {
            EM: "Invalid username",
            EC: 1,
            DT: "",
          };
        const checkExistence = await checkUserData("username", data);
        if (checkExistence)
          return {
            EM: "This name has been taken",
            EC: 1,
            DT: "",
          };

        return {
          EM: "Nice name",
          EC: 0,
          DT: "",
        };

      case "password":
        const { EM, EC } = checkPasswordStrength(data);
        return {
          EM,
          EC,
          DT: "",
        };
    }
  } catch (error) {
    console.log(error);
  }
};
export { getUserPagination, getAllGroup, createUserValidation };
