import { Sequelize } from "sequelize";
import db from '../../config/database.js';
import Users from "../users/users.js";
import Semester from "../users/semester.js";

const { DataTypes } = Sequelize;

const LaporanMonevMahasiswa = db.define('laporan_mahasiswa', {
  id: {
    type: DataTypes.STRING(8),
    allowNull: false,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.CHAR(8),
    allowNull: false,
    references: {
      model: Users,
      key: 'user_id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  semester_id: {
    type: DataTypes.CHAR(8),
    allowNull: false,
    references: {
      model: Semester,
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  status: {
    type: DataTypes.ENUM("Pending", "Draft", "DItolak", "Lolos", "Lolos dengan penugasan"),
    allowNull: false,
  }
}, {
  freezeTableName: true,
  tableName: 'laporan_mahasiswa',
  timestamps: true,
});

export default LaporanMonevMahasiswa;