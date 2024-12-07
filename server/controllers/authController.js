import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/UserModel.js';
import config from '../config/dotenv.js';

// Default users for admin and doctor
const users = [
  { username: 'admin', password: bcrypt.hashSync('password', 10), role: 'admin' },
  { username: 'doctor', password: bcrypt.hashSync('password', 10), role: 'doctor' },
];

// Initialize default users (admin and doctor) if they don't exist
export const initializeUsers = async () => {
  const count = await User.countDocuments();
  if (count === 0) {
    await User.insertMany(users);
    console.log('Default admin and doctor initialized.');
  }
};

// Login function
export const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate JWT token for login
  const token = jwt.sign({ id: user._id, role: user.role }, config.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, role: user.role });
};
