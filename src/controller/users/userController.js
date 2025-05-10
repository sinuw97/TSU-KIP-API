import bcrypt from 'bcrypt';
import { createUser, getAllUsers, getDetailUserById, getUserByEmail, getUserById, updateUserProfile } from '../../service/users/userServices.js';
import { extractAngkatanProdi } from '../../helper.js';
import { error } from 'console';

//Login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({
        error: true,
        message: 'Silahkan isi email dan password terlebih dahulu!',
      });
    }

    const userData = await getUserByEmail(email);
    if (!userData) {
      return res.status(401).json({
        error: true,
        message: 'Email tidak terdaftar!',
      });
    }

    const passwordMatch = await bcrypt.compare(password, userData.password);
    if (!passwordMatch) {
      return res.status(401).json({
        error: true,
        message: 'Password tidak cocok!'
      });
    }

    const { password: _, ...userWithoutPassword } = userData.toJSON();

    return res.status(200).json({
      error: false,
      message: 'Ok',
      data: {
        user: userWithoutPassword
      }
    })
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `${error.message}`,
    });
  }
};

//Register
export const registerController = async (req, res) => {
  try {
    const { user_id, name, email, password, role, kelas, jenis_kelamin, jenis_beasiswa } = req.body;

    if (!/^\d{8}$/.test(user_id)) {
      return res.status(400).json({
        error: true,
        message: 'Format NIM/user_id tidak valid. Harus 8 digit angka!'
      });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();

    const existingEmail = await getUserByEmail(trimmedEmail);
    if (existingEmail) {
      return res.status(400).json({
        error: true,
        message: 'Email sudah terdaftar!'
      });
    }

    if (role !== 'student' && role !== 'admin') {
      return res.status(400).json({
        error: true,
        message: 'Role tidak di ijinkan!'
      });
    }

    const splitedName = trimmedName.split(' ').join('+')
    const avatar = `https://ui-avatars.com/api/?name=${splitedName}`;

    const salt = 12
    const hashedPassword = await bcrypt.hash(password, salt);

    const { angkatan, prodi } = extractAngkatanProdi(user_id);
    const userData = {
      user_id,
      name: trimmedName,
      email: trimmedEmail,
      password: hashedPassword,
      role,
      avatar,
      student_detail: {
        kelas,
        jenis_kelamin,
        jenis_beasiswa,
        angkatan: angkatan,
        prodi: prodi
      }
    };

    const result = await createUser(userData);
    const { password: _, ...userWithoutPassword } = result.toJSON();

    return res.status(201).json({
      error: false,
      message: 'User berhasil dibuat!',
      data: {
        newUser: userWithoutPassword
      }
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `${error.message}`
    });
  }
}

//All user
export const allUserController = async (req, res) => {
  try {
    const userData = await getAllUsers();
    if (!userData) {
      return res.status(400).json({
        error: true,
        message: 'Data tidak ditemukan!'
      });
    }

    return res.status(200).json({
      error: false,
      message: 'Ok',
      data: {
        users: userData,
      }
    })
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `${error.message}`,
    });
  }
}

//Get profile by id
export const getProfileByIdController = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(400).json({
        error: true,
        message: 'ID tidak ditemukan!'
      });
    }

    const userData = await getUserById(user_id);
    if (!userData) {
      return res.status(404).json({
        error: true,
        message: 'Data tidak ditemukan!'
      });
    }

    return res.status(200).json({
      error: false,
      message: 'Ok',
      data: {
        user: userData,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: `${error.message}`
    });
  }
}

//Get detail profile by id
export const getDetailProfileByIdController = async (req, res) => {
  try {
    const { user_id } = req.params;

    const user = await getDetailUserById(user_id);
    if (!user) {
      return res.status(404).json({
        error: true,
        message: 'Data user tidak ditemukan!'
      });
    }

    return res.status(200).json({
      error: false,
      message: 'OK',
      data: { user },
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `${error.message}`
    });
  }
}

//Edit user profile
export const updateUserController = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { name, no_hp, alamat } = req.body;

    const updatedData = await updateUserProfile(user_id, {
      name,
      student_detail: {
        no_hp,
        alamat
      },
    });

    return res.status(200).json({
      error: false,
      message: 'Data updated!',
      data: {
        updatedData
      }
    })
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: `${error.message}`,
    });
  }
}

//Upload avatar
export const uploadAvatarController = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (!req.file) {
      return res.status(400).json({
        error: true,
        message: 'File tidak ditemukan!'
      });
    }

    const avatarUrl = `/uploads/avatars/${req.file.filename}`;

    const user = await getUserById(user_id);
    if (!user) {
      return res.status(400).json({
        error: true,
        message: 'User tidak ditemukan!'
      });
    }

    const result = await user.update({ avatar: avatarUrl });

    return res.status(200).json({
      error: false,
      message: 'Ok',
      data: {
        user: {
          avatar: result.avatar,
        }
      }
    });
  } catch {
    return res.status(500).json({
      error: true,
      message: error.message
    });
  }
}