export const host = "http://localhost:3000";
export const registerRoute = `${host}/api/user/createUser`;
export const oneMoreStep = `${host}/api/user/oneMoreStep`;
export const loginRoute = `${host}/api/user/login`;
export const logoutRoute = `${host}/api/user/logout`;
export const updateUser = `${host}/api/user/updateUser`;

export const getTagsByTheme = `${host}/api/tag/getTagsByTheme`;
export const geContentsByTagId = `${host}/api/tag/geContentsByTagId`;
export const createPost = `${host}/api/post/createPost`;
export const getAllPost = `${host}/api/post/getAllPost`
export const fuzzyQueryPost = `${host}/api/post/fuzzyQueryPost`
export const getPostByUserId = `${host}/api/post/getPostByUserId`
export const deletePostById = `${host}/api/post/deletePostById`
export const getMyEvent = `${host}/api/post/getMyEvent`

export const createMessage = `${host}/api/message/createMessage`
export const getMessageByUserId = `${host}/api/message/getMessageByUserId`
export const messageHandling = `${host}/api/message/messageHandling`
export const personalMsgHandling = `${host}/api/message/personalMsgHandling`
export const getJoinUsers = `${host}/api/message/getJoinUsers`
export const getPersonalMsg = `${host}/api/message/getPersonalMsg`
export const setMsgRead = `${host}/api/message/setMsgRead`

export const getPals = `${host}/api/pal/getPals`
export const getUsersByCity = `${host}/api/map/getUsersByCity`
export const setMeOnMap = `${host}/api/map/setMeOnMap`
export const ifMeOnTheMap = `${host}/api/map/ifMeOnTheMap`

export const getRecommended = `${host}/api/recommended/getRecommended`
