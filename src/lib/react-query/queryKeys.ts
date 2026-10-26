export const QUERY_KEYS = {

  // USER KEYS
  GET_CURRENT_USER: "getCurrentUser",
  GET_USERS: "getUsers",
  GET_USER_BY_ID: "getUserById",

  // FOLLOW KEYS
  GET_FOLLOWERS: "getFollowers",
  GET_FOLLOWING: "getFollowing",

  // POST KEYS
  GET_RECENT_POSTS: "getRecentPosts",
  GET_POST_BY_ID: "getPostById",
  GET_USER_POSTS: "getUserPosts",

  //  SEARCH KEYS
  SEARCH_POSTS: "getSearchPosts",
} as const;
