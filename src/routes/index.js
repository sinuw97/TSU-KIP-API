import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    return res.status(200).json({
      error: false,
      message: 'Selamat datang di TSU KIP backend!'
    })
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: true, message: `Server error! ${error.message}`});
  }
});

export default router;