export const host = process.env.REACT_APP_PRODUCTION_URL;
export const registerRoute = `${host}/user/createUser`;
export const oneMoreStep = `${host}/user/oneMoreStep`;
export const loginRoute = `${host}/user/login`;
export const logoutRoute = `${host}/user/logout`;
export const updateUser = `${host}/user/updateUser`;

export const getTagsByTheme = `${host}/tag/getTagsByTheme`;
export const geContentsByTagId = `${host}/tag/geContentsByTagId`;
export const createPost = `${host}/post/createPost`;
export const getAllPost = `${host}/post/getAllPost`
export const fuzzyQueryPost = `${host}/post/fuzzyQueryPost`
export const getPostByUserId = `${host}/post/getPostByUserId`
export const deletePostById = `${host}/post/deletePostById`
export const getMyEvent = `${host}/post/getMyEvent`

export const createMessage = `${host}/message/createMessage`
export const getMessageByUserId = `${host}/message/getMessageByUserId`
export const messageHandling = `${host}/message/messageHandling`
export const personalMsgHandling = `${host}/message/personalMsgHandling`
export const getJoinUsers = `${host}/message/getJoinUsers`
export const getPersonalMsg = `${host}/message/getPersonalMsg`
export const setMsgRead = `${host}/message/setMsgRead`

export const getPals = `${host}/pal/getPals`
export const getUsersByCity = `${host}/map/getUsersByCity`
export const setMeOnMap = `${host}/map/setMeOnMap`
export const ifMeOnTheMap = `${host}/map/ifMeOnTheMap`

export const getRecommended = `${host}/recommended/getRecommended`
