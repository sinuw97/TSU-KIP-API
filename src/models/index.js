import db from "../config/database.js";
import Users from "./users/users.js";
import StudentsDetails from "./users/students_details.js";

Users.hasOne(StudentsDetails, { foreignKey: 'user_id', as: 'student_detail' });
StudentsDetails.belongsTo(Users, { foreignKey: 'user_id', as: 'user' });

export { db as sequelize, Users, StudentsDetails };