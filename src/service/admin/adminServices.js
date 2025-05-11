import { sequelize} from "../../models/index.js";
import Users from "../../models/users/users.js";

export const createAdmin = async (data) => {
  const transaction = await sequelize.transaction();
  try {
    const newAdmin = await Users.create(data, { transaction });
    await transaction.commit();

    return newAdmin;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

//Update data profile
export const updateAdminProfile = async (user_id, userData) => {
  const transaction = await sequelize.transaction();
  try {
    const user = await Users.findOne({
      where: { user_id },
      transaction,
    });

    if (!user) {
      throw new Error("User tidak ditemukan!");
    }

    await user.update(
      {
        name: userData.name,
        email: userData.email,
      },
      {
        transaction,
      }
    );
    
    await transaction.commit();
    return user;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};