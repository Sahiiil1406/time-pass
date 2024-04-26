const Team=require('../models/team.js');
const User=require('../models/user.js');

const createTeam = async (req, res) => {
    try {
        const { name,description,open} = req.body;
        if(!name){
            return res.status(400).json({
                error: 'Please fill in the name',
            });
        }
        const team=await Team.create({
            name,
            members:[req.user._id],
            description,
            open,
            owner:req.user._id
        });

        return res.status(201).json({
            message: 'Team created successfully',
            team
        });
        

    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
}

const deleteTeam = async (req, res) => {
    try {
        const { id } = req.params;
    
        const existteam=await Team.findById(id);
        if(!existteam){
            return res.status(400).json({
                error: 'Team not found',
            });
        }
        
        if(req.user._id.toString()!==existteam.owner.toString()){
            return res.status(400).json({
                error: 'You are not authorized to delete this team',
            });
        }
    
        const team=await Team.findByIdAndDelete(id);
        return res.status(200).json({
            message: 'Team deleted successfully',
        });
    }
    catch (error) {
        res.status(400).json({
            msg:"Error in deleting team",
            error: error.message,
        });
    }
}

const updateTeam = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, members,description,open} = req.body;
        const teams=await Team.findById(id);
        if(teams.owner.toString() !== req.user._id.toString()){
            return res.status(400).json({
                error: 'You are not authorized to update this team',
            });
        }
        const newTeam=await Team.findOneAndUpdate({_id:id,owner:req.user._id},{
            name,
            members,
            description,
            open
        },{new:true});
        if(!newTeam){
            return res.status(400).json({
                error: 'Team not found',
            });
        }
        return res.status(200).json({
            message: 'Team updated successfully',
            newTeam
        });
    }
    catch (error) {
        res.status(400).json({
            msg:"Error in updating team",
            error: error.message,
        });
    }
}

const getTeam=async(req,res)=>{}


module.exports = {
    createTeam,
    deleteTeam,
    updateTeam,
    getTeam
}
