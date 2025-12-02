import {body, validationResult} from 'express-validator';

// Validasi input user (tambah/update)
const addUserValidation = [
    body('name').isString().withMessage('Name must be a string'),
    body('email').isEmail().withMessage('Email must be a valid email'),
    body('password').isString().isLength({ min: 8 }).trim().withMessage('Password must be a string'),
]

const updateUserValidation = [
    body('name').isString().withMessage('Name must be a string'),
    body('email').isEmail().withMessage('Email must be a valid email'),
    body('password').isString().isLength({ min: 8 }).trim().withMessage('Password must be a string'),
]

// Kirim error validasi jika ada
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export {
    addUserValidation,
    updateUserValidation,
    validate
}
