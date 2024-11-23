const User=require('../models/user');
const {getDistance}=require('geolib')
const getUserRecommendation = async (req, res) => {
  try {
   
    const userId = req.user._id;
    const topN=50;
    const response = await fetch(`http://localhost:5000/find_buddies?user_id=${userId}&top_n=${topN}`);
     const data = await response.json();
     const buddiesArray=data.buddies;
     //shuffle the data array
     const shuffled=buddiesArray.sort(()=>Math.random()-0.5)
     const x=shuffled.slice(1,7);
    //aggregation for users data
    const users=await User.aggregate([
      {$match:{_id:{$in:x}}},
      {$project:{name:1,image:1,bio:1,location:1}}
    ]);
    const objectUsers=users.map(user=>user.toObject());
    
    for (let user of objectUsers) {
      if (req.user.location.coordinates[0] === 0 && req.user.location.coordinates[1] === 0) {
        user.location = null;
        break;
      } else {
        if (!user.location || user.location.coordinates[0] == 0 && user.location.coordinates[1] == 0) {
          user.location = null;
        } else {
          const lat1 = req.user.location.coordinates[0];
          const lon1 = req.user.location.coordinates[1];
          const lat2 = user.location.coordinates[0];
          const lon2 = user.location.coordinates[1];
          let distance = getDistance(
            { latitude: lat1, longitude: lon1 }, 
            { latitude: lat2, longitude: lon2 }
          ) / 1000;
          if (Math.floor(distance) == 0) {
            distance = 1;
          }
          
          user.location = Math.floor(distance);
          
        }
      }
    }

    return res.status(200).json({
        msg:"List of user suggestions",
        data:objectUsers
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error in getting user recommendation",
      error,
    });
  }
};
module.exports={
    getUserRecommendation
}
