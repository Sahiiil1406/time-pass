const Community = require('../models/community');

const createCommunity = async (req, res) => {
    try {
        const { name, category, description } = req.body;
        const admin = req.user._id;
        const community = await Community.create({
            name,
            category,
            description,
            admin,
        });
        return res.status(201).json({
            message: 'Community created successfully',
            community,
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Error in creating community',
            error: error.message,
        });
    }
}

const updateCommunity = async (req, res) => {
    try {
        const {communityId}=req.params
        const {name,category,description}=req.body
        const community=await Community.findById(communityId)
        if(!community){
            return res.status(400).json({
                msg:"Community doesnot exist"
            })
        
     if(!community.admin.includes(req.user._id)){
                return res.status(400).json({
                    msg:"You are not authorized to update this community"
                })
            }
        const updatedCommunity=await Community.findByIdAndUpdate
        (communityId,{name,category,description},{new:true})
        
        
        return res.status(200).json({
            message:"Community updated successfully",
            updatedCommunity
        })
        }

    } catch (error) {
        res.status(400).json({
            msg: 'Error in updating community',
            error: error.message,
        });
    }
}

const deleteCommunity = async (req, res) => {
    try {
        const {communityId}=req.params
        const community=await Community.findById(communityId)
        if(!community){
            return res.status(400).json({
                msg:"Community doesnot exist"
            })
        }
        if(!community.admin.includes(req.user._id)){
            return res.status(400).json({
                msg:"You are not authorized to delete this community"
            })
        }
        await Community.findByIdAndDelete(communityId)
        return res.status(200).json({
            message:"Community deleted successfully"
        })
    }
    catch (error) {
        res.status(400).json({
            msg: 'Error in deleting community',
            error: error.message,
        });
    }
}

const getCommunity = async (req, res) => {}

module.exports = { createCommunity,
     updateCommunity, 
    deleteCommunity,
getCommunity};
   