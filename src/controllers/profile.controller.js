import { User } from '../models/index.js';
import { handleCatchError } from '../utils/index.js';
import { body, validationResult } from 'express-validator'; // For input validation

const getProfile = handleCatchError(async (req, res) => {
  const userId = req.userId; // The authenticate middleware should have added this

  const user = await User.findById(userId).select("-password"); // Exclude password for security

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const profile = {
    userName: user.userName,
    email: user.email,
    createdAt: user.createdAt,
    // Add other public profile fields as needed
  };

  res.status(200).json({ profile });
});
// Validation middleware for updating profile
const validateUpdateProfile = [
  body('userName')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Username cannot be empty'),
  // Add more validation rules for other fields if you plan to allow updating them
];

const updateProfile = handleCatchError(async (req, res) => {
  const userId = req.userId;
  const { userName } = req.body;

  // Find the user by ID
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Update the username if provided
  if (userName !== undefined) {
    user.userName = userName;
  }

  // Save the updated user
  const updatedUser = await user.save();

  const updatedProfile = {
    userName: updatedUser.userName,
    email: updatedUser.email,
    createdAt: updatedUser.createdAt,
    // Include other updated profile fields if you allowed them
  };

  res.status(200).json({ updatedProfile });
});

export { getProfile, updateProfile, validateUpdateProfile }; // Export the new function and validation middleware