const userModel = require("../models/user.model");
const userService = require("../services/user.services");
const { validationResult } = require("express-validator");
const otpController = require("../controllers/otp.controller");
const { randomString } = require("../utils/randomString");


module.exports.registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, phoneNo, password, role } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000);

    const newUser = await userService.createUser({
      fullname,
      email,
      phoneNo,
      password,
      role: role || "customer",
      otp: otp,  // Only pass the OTP code here
    });

    await otpController.sendOtp(email, otp);

    res.status(201).json({
      message: "User registered successfully. OTP sent for verification.",
      userId: newUser._id,
    });

  } catch (error) {
    next(error);
  }
};


module.exports.verifyUser = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    // Find the user by email and retrieve OTP details
    const user = await userModel
      .findOne({ email })
      .select("+otp.code +otp.expiresAt");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if OTP is expired
    if (user.otp.expiresAt < Date.now()) {
      return res.status(400).json({ message: "OTP has expired. Please request a new one." });
    }

    // Check if OTP is correct
    if (user.otp.code !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Update user's status to active and mark OTP as verified
    user.otp.verified = true;
    user.status = "active"; // Activate user account
    await user.save();

    return res.status(200).json({
      message: "OTP verified successfully. Account activated.",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        status: user.status,
        role: user.role
      }
    });
  } catch (error) {
    next(error); // Pass error to global error handler
  }
};


module.exports.set2FA = async (req, res, next) => {
  try {
    const userId = req.user._id ?? req.body.userId;
    const status = req.body.status;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Unmatched fields error" });
    }

    // set twofactor status
    user.twoFactor = status ? true : false;
    await user.save();

    res.status(200).json({
      message: "2FA setup status changed to " + status,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


module.exports.requestOtp = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { email } = req.body;

    let user = null;
    if (userId) user = await userModel.findById(userId);
    else {
      user = await userModel.findOne({ email });
    }
    if (!user) {
      return res.status(404).json({ message: "Unmatched fields error" });
    }

    const otp = randomString();
    const to = user.email;
    otpController.sendOtp(to, otp);

    //save otp to db
    user.otp.code = otp;
    await user.save();

    res.status(200).json({
      message: "otp successfully sent to your email",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.loginUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!user.otp.verified) {
      return res.status(401).json({
        message: "Please verify your account first or request a new OTP",
      });
    }

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (err) {
    console.error('Error during login:', err);
    next(err);
  }
};


module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json(req.user);
};

module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  //   await blackListTokenModel.create({ token });

  return res.status(200).json({ message: "Logged out" });
};

module.exports.uploadImage = async (req, res, next) => {
  try {
    const userId = req.user._id ?? req.body.userId;

    if (!req.file) {
      return res.status(400).json({
        message: "Profile image is required",
      });
    }

    const imagePath = `/upload/${req.file.filename}`;

    const user = await userModel
      .findByIdAndUpdate(
        userId,
        {
          image: imagePath,
        },
        { new: true }
      )
      .select("-password");

    if (!userId) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Profile image uploaded successfully",
      user,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports.updateUserInfo = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { email, phone } = req.body;

    // Create update object with only provided fields
    const updateData = {};
    if (email) updateData.email = email;
    if (phone) updateData.phoneNo = phone;

    const user = await userModel
      .findByIdAndUpdate(userId, updateData, { new: true })
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User information updated successfully",
      user,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newPassword = randomString();
    const hashedPassword = await userModel.hashPassword(newPassword);

    user.password = hashedPassword;
    await user.save();

    otpController.sendOtp(email, newPassword);

    res.status(200).json({
      message: "New password has been sent to your email",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports.addEmergencyContact = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { contact } = req.body;

    // Validate contact input
    if (!contact || typeof contact !== "string") {
      return res.status(400).json({
        message: "Contact is required and must be a string",
      });
    }

    const user = await userModel
      .findByIdAndUpdate(
        userId,
        { $push: { emergencyContacts: contact } },
        { new: true }
      )
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Emergency contact added successfully",
      user,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports.deleteEmergencyContact = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { contact } = req.body;

    // Validate contact input
    if (!contact || typeof contact !== "string") {
      return res.status(400).json({
        message: "Contact is required and must be a string",
      });
    }

    const user = await userModel
      .findByIdAndUpdate(
        userId,
        { $pull: { emergencyContacts: contact } },
        { new: true }
      )
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Emergency contact deleted successfully",
      user,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
