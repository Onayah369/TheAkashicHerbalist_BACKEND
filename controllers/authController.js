const User = require("../models/User");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Username, email, and password are required",
            });
        }

        const existingUser = await User.findOne({
            $or: [{ username }, { email }],
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Username or email already exists",
            });
        }

        const user = await User.create({
            username,
            email,
            password,
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Error registering user",
            error: error.message,
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Error logging in",
            error: error.message,
        });
    }
};
        const getCurrentUser = async (req, res) => {
            try {
                const user = await User.findById(req.user.userId).select("-password");

                if (!user) {
                    return res.status(404).json({
                        message: "User not found",
                    });
                }

                res.json({
                    user,
                });
            } catch (error) {
                res.status(500).json({
                    message: "Error fetching user profile",
                    error: error.message,
                });
            }
        };

        const updateProfile = async (req, res) => {
            try {
                const { bio, profilePicture } = req.body;

                const user = await User.findByIdAndUpdate(
                    req.user.userId,
                    {
                        bio,
                        profilePicture,
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                ).select("-password");

                if (!user) {
                    return res.status(404).json({
                        message: "User not found",
                    });
                }

                res.json({
                    message: "Profile updated successfully",
                    user,
                });
            } catch (error) {
                res.status(500).json({
                    message: "Error updating profile",
                    error: error.message,
                });
            }
        };

module.exports = { register, login, getCurrentUser, updateProfile };