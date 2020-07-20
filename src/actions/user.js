import axios from 'axios';
import { itemsAreLoading } from './items';
import { client } from '../components/client';

export function loginError(bool) {
  return {
    type: 'LOGIN_ERROR',
    loginError: bool,
  };
}

export function regError(bool) {
  return {
    type: 'REGISTER_ERROR',
    regError: bool,
  };
}

export function loginFetchDataSuccess(data) {
  return {
    type: 'LOGIN_FETCH_DATA_SUCCESS',
    data,
  };
}

export function userFetchDataSuccess(user) {
  return {
    type: 'USER_FETCH_DATA_SUCCESS',
    user,
  };
}

export function userLogin(email, password) {
  const loginData = JSON.stringify({
    email: email,
    password: password,
  });

  return (dispatch) => {
    axios
      .post(
        `https://picsart-bootcamp-2020-api.herokuapp.com/api/v1/users/login`,
        loginData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }

        return response;
      })
      .then((response) => {
        dispatch(userFetchDataSuccess(response.data));
        dispatch(loginError(false));
        client.setToken(response.data.token);
        window.location.replace(window.location.origin);
      })
      .then()
      .catch(() => dispatch(loginError(true)));
  };
}

export function userRegister(data) {
  const strData = JSON.stringify(data);
  return (dispatch) => {
    axios
      .post(
        `https://picsart-bootcamp-2020-api.herokuapp.com/api/v1/users/register`,
        strData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        if (response.status !== 200) {
          dispatch(regError(true));
          throw Error(response.statusText);
        }

        return response;
      })
      .then((response) => {
        dispatch(userFetchDataSuccess(response.data));
        window.alert('Registration went successful');
        window.location.replace(window.location.origin);
      })

      .catch(() => window.alert('Please carefully check all fields'));
  };
}

export function userLogout(token) {
  return (dispatch) => {
    axios
      .get(
        `https://picsart-bootcamp-2020-api.herokuapp.com/api/v1/users/logout`,
        {
          headers: {
            token: token,
          },
        }
      )
      .then((response) => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }

        return response;
      })
      .then(() => {
        client.removeToken();
        console.log('successfully logged out');
      })
      .catch(() => window.alert('There was a problem logging out'));
  };
}

export function userInfo(token) {
  return (dispatch) => {
    axios
      .get(`https://picsart-bootcamp-2020-api.herokuapp.com/api/v1/users`, {
        headers: {
          token: token,
        },
      })
      .then((response) => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }

        return response;
      })
      .then((response) => dispatch(userFetchDataSuccess(response.data)))

      .catch(() => window.alert('Error getting user info'));
  };
}
export function userUpdate(data, token) {
  const strData = JSON.stringify(data);
  return (dispatch) => {
    axios
      .put(
        `https://picsart-bootcamp-2020-api.herokuapp.com/api/v1/users/update`,
        strData,
        {
          headers: {
            token: token,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        if (response.status !== 200) {
          dispatch(loginError(true));
          throw Error(response.statusText);
        }

        return response;
      })
      .then((response) => {
        dispatch(userFetchDataSuccess(response.data));
        window.alert('Update went successful');
        window.location.replace(window.location.origin);
      })

      .catch(() => window.alert('Please carefully check all fields'));
  };
}

export function userReact(bool, id, token, category) {
  const data = {
    type: bool ? 'like' : 'unlike',
  };
  const strData = JSON.stringify(data);
  return (dispatch) => {
    dispatch(itemsAreLoading(true));
    axios
      .post(
        `https://picsart-bootcamp-2020-api.herokuapp.com/api/v1/${category}/${id}/voting`,
        strData,
        {
          headers: {
            token: token,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }
        dispatch(itemsAreLoading(false));

        return response;
      })
      .then((response) => {})

      .catch((response) => window.alert(response.data));
  };
}
