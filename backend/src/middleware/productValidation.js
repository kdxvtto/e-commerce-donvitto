import {body, validationResult} from 'express-validator';

// Validasi input produk (tambah/update)
const addProductValidation = [
    body('name').isString().withMessage('Name must be a string'),
    body('description').isString().withMessage('Description must be a string'),
    body('category').isString().withMessage('Category must be a string'),
    body('quantity').isNumeric().withMessage('Quantity must be a number'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('image').isString().withMessage('Image must be a string'),
]

const updateProductValidation = [
    body('name').isString().withMessage('Name must be a string'),
    body('description').isString().withMessage('Description must be a string'),
    body('category').isString().withMessage('Category must be a string'),
    body('quantity').isNumeric().withMessage('Quantity must be a number'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('image').isString().withMessage('Image must be a string'),
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
    addProductValidation,
    updateProductValidation,
    validate
}
