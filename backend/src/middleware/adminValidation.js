import {body, validationResult} from 'express-validator';

// Validasi input admin (tambah/update)
const addAdminValidation = [
    body('name').isString().withMessage('Name must be a string'),
    body('email').isEmail().withMessage('Email must be a valid email'),
    body('password').isString().isLength({ min: 8 }).trim().withMessage('Password must be a string and at least 8 characters'),
]

const updateAdminValidation = [
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
    addAdminValidation,
    updateAdminValidation,
    validate
}
