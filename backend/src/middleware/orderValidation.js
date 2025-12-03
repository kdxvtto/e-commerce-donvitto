import {body, validationResult} from 'express-validator';

// Kirim error validasi jika ada
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Validasi input order (tambah/update)
const addOrderValidation = [
    // Pastikan ada item dan tiap field minimal terisi
    body('items').isArray({ min: 1 }).withMessage('Items must be a non-empty array'),
    body('items.*.product').notEmpty().withMessage('Product is required'),
    body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    body('items.*.price').isNumeric().withMessage('Price must be a number'),
    body('shippingOptions').isString().withMessage('Shipping option is required'),
    body('paymentMethod').isString().withMessage('Payment method is required'),
    validate
];

const updateOrderValidation = [
    // Update bersifat opsional per field
    body('items').optional().isArray().withMessage('Items must be an array'),
    body('items.*.product').optional().notEmpty().withMessage('Product is required'),
    body('items.*.quantity').optional().isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    body('items.*.price').optional().isNumeric().withMessage('Price must be a number'),
    body('shippingOptions').optional().isString().withMessage('Shipping option must be a string'),
    body('paymentMethod').optional().isString().withMessage('Payment method must be a string'),
    body('status').optional().isString().withMessage('Status must be a string'),
    validate
];

export {
    addOrderValidation,
    updateOrderValidation,
    validate
}
