import axios from 'axios';

export function teamsFetchDataSuccess(teams) {
  return {
    type: 'TEAMS_FETCH_DATA_SUCCESS',
    teams,
  };
}

export function getTeams(token) {
  return (dispatch) => {
    axios
      .get(`https://picsart-bootcamp-2020-api.herokuapp.com/api/v1/teams`, {
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
      })
      .then((response) => {
        if (response.status !== 200) {
          console.log(response.status);
          throw Error(response.statusText);
        }

        return response;
      })
      .then((response) => dispatch(teamsFetchDataSuccess(response.data)))
      .then((response) => console.log(response.data))

      .catch(() => window.alert('Error getting teams list'));
  };
}
