import db from '../../config/database.js';
import { Sequelize } from 'sequelize';
import Users from '../users/users.js';

const { DataTypes } = Sequelize;

const StudentsEvaluations = db.define('students_evaluations', {
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
  support_factors: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  barrier_factors: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'students_evaluations',
  freezeTableName: true,
  timestamps: true
});

export default StudentsEvaluations;