import db from '../../config/database.js';
import { Sequelize } from 'sequelize';
import Users from '../users/users.js';

const { DataTypes } = Sequelize;

const OrganizationActivities = db.define('organization_activities', {
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
  ukm_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  position: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  participation: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  points: {
    type: DataTypes.INTEGER(3),
    allowNull: true,
  },
  bukti_url: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'organization_activities',
  freezeTableName: true,
  timestamps: true
});

export default OrganizationActivities;