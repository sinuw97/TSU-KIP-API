import express from 'express';
import cors from 'cors';
import index from './src/routes/index.js';
import { sequelize } from './src/models/index.js';
import { userRouter } from './src/routes/users/userRoute.js';
import { adminRouter } from './src/routes/admin/adminRoute.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// routes
app.use('/', index);
app.use('/users', userRouter);
app.use('/admin', adminRouter);

app.listen(PORT, () => {
  console.log(`Server is up http://localhost:${PORT}`);
});

// database
(async () => {
  try {
    await sequelize.authenticate()
      .then(() => console.log('✅ Database connected!'))
      .catch(e => console.log('❌ Connection error: ', e));
    
    await sequelize.sync();
    console.log('Database synced!.');
  } catch (error) {
    console.log('Sync error: ', error);
  }
})();