const USERS_END_POINTS = {
  ME_END_POINT: "users/me",
  SIGNUP_END_POINT: "users/signup"
}

const ACCOUNTS_END_POINTS = {
  GET_ALL_ACCOUNTS_END_POINT: "accounts/getAll",
  DELETE_ACCOUNT_END_POINT: "accounts/delete",
  UPDATE_ACCOUNT_END_POINT: "accounts/update",
  CREATE_ACCOUNT_END_POINT: "accounts/create"
}

const HTTP_METHODS = {
  GET_METHOD: "get",
  DELETE_METHOD: "delete",
  PUT_METHOD: "put",
  POST_METHOD: "post"
}

export { ACCOUNTS_END_POINTS, USERS_END_POINTS, HTTP_METHODS };