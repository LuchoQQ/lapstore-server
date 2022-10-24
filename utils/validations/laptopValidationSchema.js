const { check } = require("express-validator");

const laptopValidationSchema = [
  check("name")
    .isLength({ min: 4, max: 30 })
    .withMessage("Username must have between 4 and 30 characters"),
  check("image").isEmail().withMessage("Email must be an email"),
  check("password").isLength({ min: 7 }),
];

module.exports = laptopValidationSchema