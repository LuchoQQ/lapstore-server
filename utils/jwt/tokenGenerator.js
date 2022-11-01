const jwt = require('jsonwebtoken')

// create jwt function to generate token

const generateToken = (user) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '360d',
    })
    return token
}

// create jwt function to verify token

const verifyToken = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return decoded
}

module.exports = {
    generateToken,
    verifyToken,
}
