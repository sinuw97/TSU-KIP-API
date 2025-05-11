import db from '../../config/database.js';
import { Sequelize } from 'sequelize';
import Users from '../users/users.js';

const { DataTypes } = Sequelize;

const TargetIndependentActivities = db.define('target_independent_activities', {
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
  activity_name: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  participation: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  strategy: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
}, {
  tableName: 'target_independent_activities',
  freezeTableName: true,
  timestamps: true
});

export default TargetIndependentActivities;