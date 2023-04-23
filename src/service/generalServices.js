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

const checkUserData = async (fieldName, data) => {
  try {
    return await db.User.findOne({
      where: {
        [fieldName]: data,
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

const checkPasswordStrength = (password) => {
  // Initialize variables
  let strength = 0;
  let tips = "";

  // Check password length
  if (password.length < 8) {
    return { EM: "Make the password longer than 8 characters", EC: 1 };
  } else {
    strength += 1;
  }

  // Check for mixed case
  if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
    strength += 1;
  } else {
    return { EM: "Password must contains atleast 1 capital word", EC: 1 };
  }

  // Check for numbers
  if (password.match(/\d/)) {
    strength += 1;
  } else {
    tips += "Include at least one number. ";
  }

  // Check for special characters
  if (password.match(/[^a-zA-Z\d]/)) {
    strength += 1;
  } else {
    tips += "Include at least one special character. ";
  }

  // Return results
  if (strength < 2) {
    return { EM: "Easy to guess. " + tips, EC: 0 };
  } else if (strength === 2) {
    return { EM: "Password strength: Medium difficult. Tips: " + tips, EC: 0 };
  } else if (strength === 3) {
    return { EM: "Password strength: Difficult. Tips: " + tips, EC: 0 };
  } else {
    return { EM: "Extremely difficult. " + tips, EC: 0 };
  }
};

const checkPassWord = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};

export {
  checkUserExistence,
  hashPassword,
  findUserWithId,
  checkUserData,
  checkPasswordStrength,
  checkPassWord,
};
