const {body, validationResult} = require('express-validator')

const validateUser = [

    body('name').trim().notEmpty().withMessage("Name is required!"),
    body('email').trim().notEmpty().isEmail().withMessage('Invalid email format!').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required!').isLength({min: 8}).withMessage('password must be at least 8 characters!'),
    body('address').optional().trim(),
    body('phone').optional().matches(/^\+[1-9][0-9]{2,14}$/).withMessage('Invalid phone format'),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        next()
    }
];
module.exports = { validateUser };
