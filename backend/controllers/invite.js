const Team = require('../models/team.js');
const User = require('../models/user.js');
const Invite = require('../models/invite.js');


const sendInviteforTeam = async (req, res) => {
    try {
        const {teamId}=req.params;
        const { userId } = req.body;
        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(400).json({
                error: 'Team not found',
            });
        }
        if (team.owner.toString() !== req.user._id.toString()) {
            return res.status(400).json({
                error: 'You are not authorized to invite to this team',
            });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                error: 'User not found',
            });
        }
        const invite = await Invite.create({
            teamId: id,
            userId,
        });
        return res.status(201).json({
            message: 'Invite sent successfully',
            invite,
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Error in sending invite',
            error: error.message,
        });
    }
}

const acceptInviteforTeam = async (req, res) => {
    try {
        const { inviteId } = req.params;
        const invite = await Invite.findOneAndUpdate({ _id: inviteId, userId: req.user._id }, { status: 'accepted' });
        if (!invite) {
            return res.status(400).json({
                error: 'Invite not found',
            });
        }
        const team = await Team.findById(invite.teamId);
        if (!team) {
            return res.status(400).json({
                error: 'Team not found',
            });
        }
        const joinedTeam=await Team.findByIdAndUpdate(invite.teamId, { $push: { members: req.user._id } });
        const inviteTobeDeletd=await Invite.deleteOne({ _id: inviteId })
        return res.status(200).json({
            message: 'Invite accepted successfully',
            joinedTeam
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Error in accepting invite',
            error: error.message,
        });
    }
}

const rejectInviteforTeam = async (req, res) => {
    try {
        const { inviteId } = req.params;
        
        const inviteTobeDeletd=await Invite.deleteOne({ _id: inviteId })
        return res.status(200).json({
            message: 'Invite rejected successfully'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Error in rejecting invite',
            error: error.message,
        });
    }
}

const joinTeamwithoutInviteforTeam=async(req,res)=>{
    try {
        const {teamId}=req.params;
        const team=await Team.findById(team);
        if(!team){
            return res.status(400).json({
                error: 'Team not found',
            });
        }
        if(!team.open){
            return res.status(400).json({
                error: 'This team is not open for joining',
            });
        }
        const joinedTeam=await Team.findByIdAndUpdate(teamId, { $push: { members: req.user._id } });
        return res.status(200).json({
            message: 'Joined team successfully',
            joinedTeam
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Error in joining team',
            error: error.message,
        });
    }
}

const getInviteforTeam=async(req,res)=>{}

module.exports = {
    sendInviteforTeam,
    acceptInviteforTeam,
    rejectInviteforTeam,
    joinTeamwithoutInviteforTeam,
    getInviteforTeam
}