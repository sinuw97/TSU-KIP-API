import bcrypt from "bcrypt";
import { createAdmin } from "../../service/admin/adminServices.js";
import { nanoid } from "nanoid";
import { createUser, getUserByEmail, updateUserProfile } from "../../service/users/userServices.js";
import { extractAngkatanProdi } from "../../helper.js";
import { updateAdminProfile } from "../../service/admin/adminServices.js";

//Create new admin acc
export const createNewAdminController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({
        error: true,
        message: 'Semua field harus di isi!'
      });
    }

    if (!name || name.length < 3) {
      return res.status(400).json({
        error: true,
        message: 'Nama minimal 3 karakter!'
      });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({
        error: true,
        message: 'Password minimal 6 karakter!'
      });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();

    const existingEmail = await getUserByEmail(trimmedEmail);
    if (existingEmail) {
      return res.status(400).json({
        error: true,
        message: 'Email sudah digunakan.'
      });
    }

    const splitedName = trimmedName.split(' ').join('+')
    const avatar = `https://ui-avatars.com/api/?name=${splitedName}`;

    const user_id = "adm" + nanoid(5);

    const salt = 12
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = await createAdmin({
      user_id,
      name: trimmedName,
      email: trimmedEmail,
      password: hashedPassword,
      role: 'admin',
      avatar
    });

    return res.status(201).json({
      error: false,
      message: 'Admin berhasil dibuat.',
      data: {
        user_id: newAdmin.user_id,
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role,
        avatar: newAdmin.avatar,
      }
    })
  } catch (error) {
    console.error("Gagal membuat admin:", error);
    res.status(500).json({
      error: true,
      message: `${error.message}`
    });
  }
}

//Update admin profile
export const updateAdminByIdController = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { name, email } = req.body;

    if (!name || !email ) {
      return res.status(400).json({
        error: true,
        message: 'Semua field harus di isi!',
      });
    }

    //Cek email harus valid
    //Cek email sudah terpakai atau belum
    const isEmailExist = await getUserByEmail(email);
    if (!isEmailExist) {
      return res.status(400).json({
        error: true,
        message: 'Email sudah terdafar!'
      });
    }

    const updatedData = await updateAdminProfile(user_id, {
      name,
      email
    });

    return res.status(200).json({
      error: true,
      message: 'Data berhasil diubah!',
      data: updatedData,
    });
  } catch (error) {

  }
}
//Create new mhs account
export const createNewMhsAccByAdminController = async (req, res) => {
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
//Edit mhs user profile
export const updateUserByAdminController = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { nim, name, email, avatar, prodi, angkatan, kelas, no_hp, alamat, jenis_beasiswa } = req.body;

    const updatedData = await updateUserProfile(user_id, {
      user_id: nim,
      name,
      email,
      avatar,
      student_detail: {
        prodi,
        angkatan,
        kelas,
        no_hp,
        alamat,
        jenis_beasiswa,
      },
    });

    return res.status(200).json({
      error: false,
      message: 'Data updated!',
      data: updatedData,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: `error: ${error.message}`,
    });
  }
}