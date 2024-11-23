require("dotenv").config();
const express = require("express");
const cors=require("cors");
const connectDB = require("./config/database");
const cookie = require("cookie-parser");
const { initializeSocketIO,emitSocketEvent } = require("./sockets/socket.js");
const { createServer } = require("http");
const { Socket,Server } = require("socket.io");

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
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
const bookmarkRouter=require("./routes/bookmark.routes")
const collaborationRouter=require("./routes/collaboration.routes")
const pollRouter=require("./routes/polls.routes")
const eventRouter=require("./routes/events.routes")
const chatRouter=require("./routes/chat.routes")
const messageRouter=require("./routes/message.routes")
const notificationRouter=require("./routes/notification.routes")
const recommendationRouter=require('./routes/feedAndRecommendation.routes.js')

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  },
});
app.set("io", io)
 


 

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: true,
    credentials: true
}));  
//cookie-parser
app.use(cookie());
//express-validator



app.use("/users",userRouter)
app.use("/posts",postRouter)
app.use("/likes",likeRouter)
app.use("/comments",commentRouter)
app.use("/follows",followRouter)
app.use("/teams",teamRouter)
app.use("/invites",inviteRouter)
app.use("/community",communityRouter)
app.use("/map",mapRouter)
app.use("/bookmarks",bookmarkRouter)
app.use("/collaboration",collaborationRouter)
app.use("/polls",pollRouter)
app.use("/events",eventRouter)
app.use("/chats",chatRouter)
app.use("/messages",messageRouter)
app.use("/notifications",notificationRouter)
app.use("/ai",recommendationRouter)
 

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/", (req, res) => {
    return res.json({msg:"Welcome to Synkerr"});
    }
);

initializeSocketIO(io);


httpServer.listen(process.env.PORT, () => {
  connectDB()
    console.log(`Server running on port ${process.env.PORT}`);
});
