import { Sequelize } from "sequelize";
import db from '../../config/database.js';

const { DataTypes } = Sequelize;

const Semester = db.define('semester', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  tahun_ajaran: {
    type: DataTypes.STRING(9),
    allowNull: false,
  },
  semester: {
    type: DataTypes.ENUM("Ganjil", "Genap"),
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  freezeTableName: true,
  tableName: 'semester',
  timestamps: true,
})

export default Semester;