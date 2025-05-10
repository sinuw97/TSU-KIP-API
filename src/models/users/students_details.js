import { Sequelize } from "sequelize";
import db from '../../config/database.js';
import Users from './users.js';

const { DataTypes } = Sequelize;

const StudentsDetails = db.define('student_detail', {
  user_id: {
    type: DataTypes.CHAR(8),
    primaryKey: true,
    allowNull: false,
    references: {
      model: Users,
      key: 'user_id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  prodi: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  angkatan: {
    type: DataTypes.CHAR(4),
    allowNull: false
  },
  kelas: {
    type: DataTypes.ENUM('Reguler', 'Karyawan'),
    allowNull: false
  },
  jenis_kelamin: {
    type: DataTypes.ENUM('Laki-laki', 'Perempuan'),
    allowNull: false
  },
  no_hp: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  alamat: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  jenis_beasiswa: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
}, {
  freezeTableName: true,
  tableName: 'student_detail',
  timestamps: false
});

export default StudentsDetails;