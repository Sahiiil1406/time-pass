const Bookmark=require("../models/bookmark.js")
const mongoose=require("mongoose")

const markAndUnmark=async(req,res)=>{
    try {
        const {postId}=req.params;
        
        const userId=req.user._id;
        const bookmark=await Bookmark.findOne({userId:userId,postId:postId});
        if(bookmark){
            await Bookmark.findOneAndDelete({userId
                :userId,postId:postId});
            return res.status(200).json({
                msg:"Bookmark removed successfully"});
        }
        const newBookmark=new Bookmark({userId:userId,postId:postId});
        await newBookmark.save();
        return res.status(200).json({
            msg:"Bookmark added successfully"});
        
    } catch (error) {
        return res.status(500).json({
            msg:"Error in marking or unmarking the bookmark",
            error:error.message})
    }
}

const getBookmarks=async(req,res)=>{
    try {
        const userId=req.user._id;
        const bookmarks=await Bookmark.aggregate(
        [    {
                    '$match': {
                        'userId': new mongoose.Types.ObjectId(userId)
                    }
        },
                {
                  '$lookup': {
                    'from': 'socialposts', 
                    'localField': 'postId', 
                    'foreignField': '_id', 
                    'as': 'post', 
                    'pipeline': [
                      {
                        '$project': {
                          'content': 1, 
                          'images': 1, 
                          'tags': 1,
                        }
                      }
                    ]
                  }
                }, {
                  '$project': {
                    'post': 1
                  }
                }
              ]
        )
        return res.status(200).json({
            msg:"Bookmarks fetched successfully",
            bookmarks:bookmarks});
        
    } catch (error) {
        return res.status(500).json({
            msg:"Error in getting bookmarks",
            error:error.message})
    }
}

module.exports={markAndUnmark,getBookmarks}