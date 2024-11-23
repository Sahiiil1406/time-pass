import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../feature/loginSlice";
import authSlice from "../feature/signup/authSlice";
import userApi from "../services/authProvider";
import postApi from "../services/postProvider";
import teamApi from "../services/teamProvider";
import pollApi from "../services/pollProvider";
import  notificationApi from "../services/notificationProvider";
import messageApi from "../services/messageProvider";
import likeApi from "../services/likeProvider";
import inviteApi from "../services/inviteProvider";
import followApi from "../services/followProvider";
import eventsApi from "../services/eventProvider";
import communityApi from "../services/communityProvider";
import collaboratorApi from "../services/collaborationProvider";
import bookmarkApi from "../services/bookmarkProvider";
import commentApi from "../services/commentProvider";
import chatApi from "../services/chatProvider";

export default configureStore({
	reducer: {
		[postApi.reducerPath]:postApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
		[teamApi.reducerPath]: teamApi.reducer,
		[pollApi.reducerPath]: pollApi.reducer,
		[notificationApi.reducerPath]:notificationApi.reducer,
		[messageApi.reducerPath]:messageApi.reducer,
		[likeApi.reducerPath]:likeApi.reducer,
		[inviteApi.reducerPath]:inviteApi.reducer,
		[followApi.reducerPath]:followApi.reducer,
		[eventsApi.reducerPath]:eventsApi.reducer,
		[communityApi.reducerPath]:communityApi.reducer,
		[collaboratorApi.reducerPath]:collaboratorApi.reducer,
		[bookmarkApi.reducerPath]:bookmarkApi.reducer,
		[commentApi.reducerPath]:commentApi.reducer,
		[chatApi.reducerPath]:chatApi.reducer,
		
		// Add the login slice to the store
		//login: loginSlice.reducer,
		// Add the auth slice to the store
		//auth: authSlice.reducer,
		
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
		.concat(postApi.middleware)
		.concat(userApi.middleware)
		.concat(teamApi.middleware)
		.concat(pollApi.middleware)
		.concat(notificationApi.middleware)
		.concat(messageApi.middleware)
		.concat(likeApi.middleware)
		.concat(inviteApi.middleware)
		.concat(followApi.middleware)
		.concat(eventsApi.middleware)
		.concat(communityApi.middleware)
		.concat(collaboratorApi.middleware)
		.concat(bookmarkApi.middleware)
		.concat(commentApi.middleware)
		.concat(chatApi.middleware)
		,
	

	
});
