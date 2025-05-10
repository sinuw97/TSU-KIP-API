import { Sequelize } from "sequelize";
import db from '../../config/database.js';

const { DataTypes } = Sequelize;

const Users = db.define('users', {
  user_id: {
    type: DataTypes.CHAR(8),
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    // validate: {
    //   isEmail: true
    // }
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('student', 'admin'),
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  freezeTableName: true,
  tableName: 'users',
  timestamps: false
});

export default Users;