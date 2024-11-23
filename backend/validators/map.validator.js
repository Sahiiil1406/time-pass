const {body,param}=require('express-validator')

const findnearbyPeopleValidator=()=>{
    return [
        body('lat')
        .notEmpty()
        .withMessage('Latitude is required')
        .isNumeric(),

        body('lng')
        .notEmpty()
        .withMessage('Longitude is required')
        .isNumeric(),

        body('distance')
        .notEmpty()
        .withMessage('Distance is required')
        .isNumeric()
    ]
}

module.exports={
    findnearbyPeopleValidator
}