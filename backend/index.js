require("dotenv").config();
const express = require("express");
const cors=require("cors");
const connectDB = require("./config/database");
const expressValidator = require("express-validator");
const cookieParser = require("cookie-parser");
//const connectRedis = require("./config/redis");
const userRouter=require("./routes/user.routes")
const postRouter=require("./routes/post.routes")
const likeRouter=require("./routes/like.routes")
const commentRouter=require("./routes/comment.routes")
const followRouter=require("./routes/follow.routes")
const teamRouter=require("./routes/team.routes")
const inviteRouter=require("./routes/invite.routes")
const communityRouter=require("./routes/community.routes")
const mapRouter=require("./routes/map.routes")
 
const app = express();
connectDB()

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
//cookie-parser
app.use(cookieParser());
//express-validator
app.use(expressValidator())



app.use("/users",userRouter)
app.use("/posts",postRouter)
app.use("/likes",likeRouter)
app.use("/comments",commentRouter)
app.use("/follows",followRouter)
app.use("/teams",teamRouter)
app.use("/invites",inviteRouter)
app.use("/community",communityRouter)
app.use("/map",mapRouter)
 

app.get("/", (req, res) => {
    return res.json({msg:"Hello World!"});
    }
);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
