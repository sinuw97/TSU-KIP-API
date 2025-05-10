import { Sequelize } from 'sequelize';

const db = new Sequelize('test-tsu-db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

export default db;