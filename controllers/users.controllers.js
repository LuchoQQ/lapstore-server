const User = require("../model/User");
const { hashPassword, comparePassword } = require("../utils/bcrypt");
const { generateToken, verifyToken } = require("../utils/jwt/tokenGenerator");


// get all users from db
const getAllUsers = async (req, res) => {
    const users = await User.find({});
    res.json(users);
};


// create a new user and save it to db
const createUser = async (req, res) => {
    const { name, surname, email, password, role } = req.body;
    try {
        const user = new User({
            name,
            surname,
            email,
            password: await hashPassword(password),
            role,
        });
        const savedUser = await user.save();
        const token = generateToken(savedUser._id);
        // return json object with user data and token
        return res.status(200).json({
            status: 'ok',
            message: 'User created successfully',
            token,
        })
        
    } catch (err) {
        console.log(err)
        return res.status(500).json(err);
    }
};


// get a user by id from db
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};


// delete user by id from db
const deleteUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

// validate user
const validateUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const isMatch = await comparePassword(password, user.password);
            if (isMatch) {
                res.status(200).json({
                    status: 'ok',
                    message: 'Logged in successfully',
                    token: generateToken(user._id),
                });
            } else {
                return res.status(401).json("Wrong password");
            }
        } else {
            return res.status(401).json("User not found");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
};

// validate token and return user data
const validateToken = async (req, res) => {
    const token = req.headers.authorization
    console.log(token)
    try {
        const decoded = verifyToken(token);
        const user = await User.findById(decoded.id);
        if (user) {
            return res.status(200).json({
                status: 'ok',
                message: 'Token is valid',
                name: user.name,
                surname: user.surname,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
            });
        } else {
            return res.status(400).json("User not found");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
};


module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    deleteUserById,
    validateUser,
    validateToken
};
