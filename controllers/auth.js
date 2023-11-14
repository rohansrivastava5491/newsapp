import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import User from '../models/users.js'
export const registerController = async(req,res) => {
    const { name, email, password } = req.body;

  try {
    // Check if all required fields are present
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();
    // Generate a JWT token for the newly registered user
    const token = Jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the token as a response
    res.status(201).json({ token, message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
export const loginController = async(req,res) => {
    const { email, password } = req.body;

  // Check if all required fields are present
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = Jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the token as a response
    res.status(200).json({ token, user, message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }

}

export const verifyToken = (req, res) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ success:false,message: 'Access denied. Token not provided.' });
  }

  try {
    // Verify the token using the secret key
    const decoded = Jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user information to the request object
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token.' });
  }
};
