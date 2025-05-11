import bcrypt from 'bcrypt';

const password = 'admin123';
const hash = await bcrypt.hash(password, 12);

console.log("pass: ", password);
console.log("hashed: ", hash);