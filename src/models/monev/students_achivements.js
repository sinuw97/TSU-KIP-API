import db from '../../config/database.js';
import { Sequelize } from 'sequelize';
import Users from '../users/users.js';

const { DataTypes } = Sequelize;

const StudentsAchievements = db.define('students_achievements', {
  id: {
    type: DataTypes.CHAR(8),
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  user_id: {
    type: DataTypes.CHAR(8),
    primaryKey: true,
    allowNull: false,
    references: {
      model: Users,
      key: 'user_id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  achievements_name: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  participation: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  place: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  award: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  level: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  bukti_url: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'students_achievements',
  freezeTableName: true,
  timestamps: true
});

export default StudentsAchievements;