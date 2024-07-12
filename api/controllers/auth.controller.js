import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import bcryptjs from "bcryptjs";

const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2m' });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

export const signup = async (req, res, next) => {
  const { username, firstName, lastName, emailAddress, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, firstName, lastName, emailAddress, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json('User created successfully!');
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { emailAddress, password } = req.body;

  try {
    const user = await User.findOne({ emailAddress });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 2 * 60 * 1000 });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.status(200).json({ message: 'Logged in successfully' });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) return res.status(403).json({ message: 'Forbidden' });

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    user.refreshToken = newRefreshToken;
    await user.save();

    res.cookie('accessToken', newAccessToken, { httpOnly: true, maxAge: 2 * 60 * 1000 }); // 2 minutes
    res.cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 }); // 7 days
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getUserInfo = async (req, res, next) => {
  const { id } = req.user;

  try {
    const user = await User.findById(id).select('-password -refreshToken');
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.status(200).json({ message: 'Logged out successfully' });
};


export const defaultLocationDetection = async (req, res, next) => {
  const { userId, city, country_name, ip, org, postal, version, network, country_capital } = req.body;
  
  console.log('Received ID:', userId);
  console.log('Received City:', city);
  console.log('Received Country:', country_name);
  
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.city = city;
    user.country = country_name;
    user.ip = ip;
    user.org = org;
    user.postal = postal;
    user.version = version;
    user.network = network;
    user.country_capital = country_capital;

    await user.save();
    res.json({ message: 'Geolocation saved successfully' });
  } catch (err) {
    console.log('Error saving geolocation:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};