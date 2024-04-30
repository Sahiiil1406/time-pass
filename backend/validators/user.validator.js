const {body,param}=require('express-validator') 

const validateSignup=()=>{
    return [
        body('username')
        .notEmpty()
        .withMessage('Name is required')
        .trim(),
    
        body('email')
        .isEmail()
        .notEmpty()
        .withMessage('Email is required')
        .trim(),
        
        body('password')
        .isLength({min:6})
        .notEmpty()
        .withMessage('Password must be atleast 6 characters long')
        .trim(),
        
        body('bio')
        .optional()
        .isString()
        .withMessage('Bio must be a string')
        .trim(),
      
    
        body('dob')
        .optional()
        .isDate()
        .withMessage('Date of Birth must be a valid date')
        .trim(),
        
        body('phoneNumber')
        .optional()
        .isMobilePhone()
        .withMessage('Phone number must be a valid phone number')
        .trim()
        .isLength({ min: 10, max: 10 })
        .withMessage('Phone number must be 10 digits long')
      ];
}

const validateLogin=()=>{
    return [
        body('email')
        .isEmail()
        .notEmpty()
        .withMessage('Email is required')
        .trim(),
        
        body('password')
        .isLength({min:6})
        .notEmpty()
        .withMessage('Password must be atleast 6 characters long')
        .trim()
    ];
}

const validateUpdate=()=>{
    return [
        body('name')
        .optional()
        .notEmpty()
        .withMessage('Name is required')
        .trim(),
    
        body('email')
        .isEmail()
        .notEmpty()
        .optional()
        .withMessage('Email is required')
        .trim(),
        
        body('bio')
        .optional()
        .isString()
        .withMessage('Bio must be a string')
        .trim(),
    
        body('dob')
        .optional()
        .isDate()
        .withMessage('Date of Birth must be a valid date')
        .trim(),
        
        body('phoneNumber')
        .optional()
        .isMobilePhone()
        .withMessage('Phone number must be a valid phone number')
        .trim()
        .isLength({ min: 10, max: 10 })
        .withMessage('Phone number must be 10 digits long'),

        param('username')
        .notEmpty()
        .withMessage('Username is required')
        .trim()
        .isString()
      ];
}

const validateGenerateOTP=()=>{
    return [
        body('email')
        .isEmail()
        .notEmpty()
        .withMessage('Email is required')
        .trim()
    ];
}
const validateVerifyOTP=()=>{
    return [
        body('email')
        .isEmail()
        .notEmpty()
        .withMessage('Email is required')
        .trim(),
        
        body('otp')
        .notEmpty()
        .withMessage('OTP is required')
        .trim()
    ];
}

const validateResetPassword=()=>{
    return [
        body('email')
        .isEmail()
        .notEmpty()
        .withMessage('Email is required')
        .trim(),
        
        body('password')
        .isLength({min:6})
        .notEmpty()
        .withMessage('Password must be atleast 6 characters long')
        .trim()
    ];
}

const checkUsernameParam=()=>{
    return [
        param('username')
        .notEmpty()
        .withMessage('Username is required')
        .trim()
        .isString()
    ];
}

module.exports={
  validateSignup,
  validateLogin,
  validateUpdate,
  validateGenerateOTP,
  validateVerifyOTP,
  validateResetPassword,
  checkUsernameParam
}