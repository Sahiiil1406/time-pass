const { Socket,Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const User = require('../models/user');


/* const app = express();
const server = createServer(app);
const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
}); */

const mountJoinChatEvent = (socket) => {
    socket.on("JOIN_CHAT_EVENT", (chatId) => {
      console.log(`User joined the chat 🤝. chatId: `, chatId);
      socket.join(chatId);
    });
  };

const mountParticipantTypingEvent = (socket) => {
    socket.on("TYPING_EVENT", (chatId) => {
      socket.in(chatId).emit('TYPING_EVENT', chatId);
    });
  };  

const mountParticipantStoppedTypingEvent = (socket) => {
    socket.on("STOP_TYPING_EVENT", (chatId) => {
      socket.in(chatId).emit('STOP_TYPING_EVENT', chatId);
    });
  };  
  

const initializeSocketIO =async (io) => {
    try {
        return io.on('connection', async(socket) => {
            console.log('a user connected',socket.id);
            
            const cookies = cookie.parse(socket.handshake.headers?.cookie || "");
            let token = cookies?.token;
            if (!token) {
                //console.log(socket.handshake.headers?.cookie);
                token = socket.handshake.headers?.cookie
              }
              if (!token) {
                console.log("No token found. Disconnecting...");
                return socket.disconnect();
              }
              const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
             // console.log("decodedToken: ", decodedToken);
              const user = await User.findById(decodedToken.id)
              .select("-password");
              //console.log(user)
        
              if (!user) {
                console.log("No user found. Disconnecting...");
                return socket.disconnect();
              }
              socket.user = user;
        
              socket.join(user._id.toString());
              socket.emit('CONNECTED_EVENT');
              console.log("User connected 🗼. userId: ", user._id.toString());
        
        
            mountJoinChatEvent(socket);
            mountParticipantTypingEvent(socket);
            mountParticipantStoppedTypingEvent(socket);
            
        
            socket.on('disconnect', () => {
                console.log('user disconnected');
                if (socket.user?._id) {
                    socket.leave(socket.user._id);
                  }
            });
        }); 
    } catch (error) {
        
    }
}

const emitSocketEvent = (req, roomId, event, payload) => {
    req.app.get("io").in(roomId).emit(event, payload);
  };

module.exports = {
    initializeSocketIO,
    emitSocketEvent
}