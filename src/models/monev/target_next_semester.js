import db from '../../config/database.js';
import { Sequelize } from 'sequelize';
import Users from '../users/users.js';

const { DataTypes } = Sequelize;

const TargetNextSemester = db.define('target_next_semester', {
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
  semester: {
    type: DataTypes.INTEGER(1),
    allowNull: false,
  },
  ips_target: {
    type: DataTypes.FLOAT(2),  // DIBELAKANG KOMA 2 DIGIT
    allowNull: false,
  },
  ipk_target: {
    type: DataTypes.FLOAT(2),  // DIBELAKANG KOMA 2 DIGIT
    allowNull: false,
  },
}, {
  tableName: 'target_next_semester',
  freezeTableName: true,
  timestamps: true
});

export default TargetNextSemester;