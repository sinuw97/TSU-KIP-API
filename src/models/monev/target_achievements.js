import db from '../../config/database.js';
import { Sequelize } from 'sequelize';
import Users from '../users/users.js';

const { DataTypes } = Sequelize;

const TargetAchievements = db.define('target_achievements', {
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
  award: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  level: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  tableName: 'target_achievements',
  freezeTableName: true,
  timestamps: true
});

export default TargetAchievements;