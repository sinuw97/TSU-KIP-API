import db from '../../config/database.js';
import { Sequelize } from 'sequelize';
import Users from '../users/users.js';

const { DataTypes } = Sequelize;

const AcademicReports = db.define('academic_reports', {
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
  ips: {
    type: DataTypes.FLOAT(2),  // DIBELAKANG KOMA 2 DIGIT
    allowNull: false,
  },
  ipk: {
    type: DataTypes.FLOAT(2),  // DIBELAKANG KOMA 2 DIGIT
    allowNull: false,
  },
  bukti_url: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'academic_reports',
  freezeTableName: true,
  timestamps: true
});

export default AcademicReports;