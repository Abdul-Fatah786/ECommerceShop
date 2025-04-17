const userModel = require("../models/user.model");

module.exports.createUser = async ({ fullname, email, phoneNo, password, role = "customer", otp }) => {
  try {
    if (!fullname || !email || !password || !phoneNo) {
      throw new Error("All fields are required");
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Hash the password securely
    const hashedPassword = await userModel.hashPassword(password);

    // Generate OTP expiration time (10 minutes from now)
    const otpExpiresAt = Date.now() + 10 * 60 * 1000;

    // Create new user
    const user = await userModel.create({
      fullname,
      email,
      phoneNo,
      password: hashedPassword,
      role, // Default role: 'customer'
      status: "inactive", // Inactive until OTP verification
      otp: {
        code: otp.toString(),  // Ensure OTP code is stored as a string
        expiresAt: otpExpiresAt
      }, // Save OTP along with the user
    });

    return user;

  } catch (error) {
    throw new Error(error.message || "User creation failed");
  }
};
