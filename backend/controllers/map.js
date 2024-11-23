const User=require('../models/user.js')


const findnearbyPeople=async(req,res)=>{
    try {
        const {lat,lng,distance}=req.body
        const users=await User.find({
            location:{
                $near:{
                    $geometry:{
                        type:"Point",
                        coordinates:[lng,lat]
                    },
                    $maxDistance:1000*distance
                }
            }
        })
        return res.status(200).json({
            msg:"List of nearby people",
            users
        })
    } catch (error) {
        return res.status(400).json({
            msg:"Unable to do geopatial filter"
        })
    }
}

module.exports={
    findnearbyPeople
}