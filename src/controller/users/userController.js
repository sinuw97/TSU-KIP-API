import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import path from 'path';
import fs from 'fs';
import {
  getAllUsers,
  getDetailUserById,
  getUserByEmail,
  getUserById,
  updateUserProfile,
  validateEmail,
} from "../../service/users/userServices.js";
dotenv.config();

//Login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({
        error: true,
        message: "Silahkan isi email dan password terlebih dahulu!",
      });
    }

    // Validasi email regex
    const testEmail = validateEmail(email);
    if (!testEmail) {
      return res.status(400).json({
        error: true,
        message: 'Email tidak valid'
      })
    }

    const userData = await getUserByEmail(email);
    if (!userData) {
      return res.status(401).json({
        error: true,
        message: "Email tidak terdaftar!",
      });
    }

    const passwordMatch = await bcrypt.compare(password, userData.password);
    if (!passwordMatch) {
      return res.status(401).json({
        error: true,
        message: "Password tidak cocok!",
      });
    }

    const { password: _, ...userWithoutPassword } = userData.toJSON();
    const token = jwt.sign(userWithoutPassword, process.env.TSU_TOKEN_SECRET);

    return res.status(200).json({
      error: false,
      message: "Ok",
      data: {
        token,
        user: userWithoutPassword,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `${error.message}`,
    });
  }
};

//All user
export const allUserController = async (req, res) => {
  try {
    const userData = await getAllUsers();
    if (userData.length === 0) {
      return res.status(400).json({
        error: true,
        message: "Data tidak ditemukan!",
      });
    }

    return res.status(200).json({
      error: false,
      message: "Ok",
      data: {
        users: userData,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `${error.message}`,
    });
  }
};

//Get profile by id
export const getProfileByIdController = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(400).json({
        error: true,
        message: "ID tidak ditemukan!",
      });
    }

    const userData = await getUserById(user_id);
    if (!userData) {
      return res.status(404).json({
        error: true,
        message: "Data tidak ditemukan!",
      });
    }

    return res.status(200).json({
      error: false,
      message: "Ok",
      data: {
        user: userData,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: `${error.message}`,
    });
  }
};

//Get detail profile by id
export const getDetailProfileByIdController = async (req, res) => {
  try {
    const { user_id } = req.params;

    const user = await getDetailUserById(user_id);
    if (!user) {
      return res.status(404).json({
        error: true,
        message: "Data user tidak ditemukan!",
      });
    }

    return res.status(200).json({
      error: false,
      message: "OK",
      data: { user },
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `Error: ${error.message}`,
    });
  }
};

// Update profil by id
export const updateUserController = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { name, no_hp, alamat } = req.body;

    if (!name && !no_hp && !alamat) {
      return res.status(400).json({
        error: true,
        message: "Data tidak boleh kosong!",
      });
    }

    const updatedData = await updateUserProfile(user_id, {
      name,
      student_detail: {
        no_hp,
        alamat,
      },
    });

    return res.status(200).json({
      error: false,
      message: "Data updated!",
      data: {
        updatedData,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: `Error: ${error.message}`,
    });
  }
};

//Upload avatar
export const uploadAvatarController = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (!req.file) {
      return res.status(400).json({
        error: true,
        message: "File tidak ditemukan!",
      });
    }

    const avatarUrl = `/uploads/avatars/${req.file.filename}`;

    const user = await getUserById(user_id);
    if (!user) {
      return res.status(400).json({
        error: true,
        message: "User tidak ditemukan!",
      });
    }

    // Hapus avatar lama kalau ada
    if (user.avatar) {
      const oldPath = path.resolve('src', user.avatar.replace(/^\/+/, ''));
      try {
        await fs.promises.unlink(oldPath);
      } catch (error) {
        console.warn(`Gagal hapus file lama: ${err.message}`);
      }
    }

    const result = await user.update({ avatar: avatarUrl });

    return res.status(200).json({
      error: false,
      message: "success",
      data: {
        user: {
          avatar: result.avatar,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: `Error: ${error.message}`,
    });
  }
};

//Upload laporan monev
export const uploadLaporanMonevController = async (req, res) => {
  try {
    
  } catch (error) {

  }
}