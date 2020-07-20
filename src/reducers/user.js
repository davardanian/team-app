export function userHasError(state = false, action) {
  switch (action.type) {
    case 'USER_HAS_ERROR':
      return action.userHasError;

    default:
      return state;
  }
}

export function loginError(state = false, action) {
  switch (action.type) {
    case 'LOGIN_ERROR':
      return action.loginError;

    default:
      return state;
  }
}

export function regError(state = false, action) {
  switch (action.type) {
    case 'REGISTER_ERROR':
      return action.regError;

    default:
      return state;
  }
}

export function user(state = [], action) {
  switch (action.type) {
    case 'USER_FETCH_DATA_SUCCESS':
      return action.user;

    default:
      return state;
  }
}
