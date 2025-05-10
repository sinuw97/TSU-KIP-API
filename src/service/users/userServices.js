import Users from "../../models/users/users.js";
import StudentsDetails from "../../models/users/students_details.js";
import { sequelize } from "../../models/index.js";

//Get all users
export const getAllUsers = async () => {
  return await Users.findAll({
    attributes: {
      exclude: ["password"],
    },
  });
};

//Get user by ID
export const getUserById = async (id) => {
  return await Users.findByPk(id, {
    attributes: {
      exclude: ["password"],
    },
  });
};

//Get detail user(students) by id
export const getDetailUserById = async (id) => {
  return await Users.findByPk(id, {
    attributes: {
      exclude: ["password"],
    },
    include: [
      {
        model: StudentsDetails,
        as: "student_detail",
      },
    ],
  });
};

//Get user by Email
export const getUserByEmail = async (email) => {
  return await Users.findOne({
    where: {
      email,
    },
    attributes: ["user_id", "name", "email", "password", "role", "avatar"],
  });
};

//Create new user with transaction
export const createUser = async (userData) => {
  const transaction = await sequelize.transaction();
  try {
    const newUser = await Users.create(userData, {
      include: [{ model: StudentsDetails, as: "student_detail" }],
      transaction,
    });

    await transaction.commit();
    return newUser;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

//Update data profile
export const updateUserProfile = async (user_id, userData) => {
  const transaction = await sequelize.transaction();
  try {
    const user = await Users.findOne({
      where: { user_id },
      include: [{ model: StudentsDetails, as: "student_detail" }],
      transaction,
    });

    if (!user) {
      throw new Error("User tidak ditemukan!");
    }

    await user.update(
      {
        name: userData.name,
      },
      {
        transaction,
      }
    );

    if (user.student_detail) {
      await user.student_detail.update(
        {
          no_hp: userData.student_detail.no_hp,
          alamat: userData.student_detail.alamat,
        },
        { transaction }
      );
    }
    
    await transaction.commit();
    return user;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};