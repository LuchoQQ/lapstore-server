const bcrypt = require('bcrypt')

// create bcript function to hash password
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
}

// create bcript function to compare password
const comparePassword = async (password, hash) => {
    const result = await bcrypt.compare(password, hash)
    return result
}

module.exports = {
    hashPassword,
    comparePassword
}
