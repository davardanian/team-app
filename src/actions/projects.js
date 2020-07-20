import axios from 'axios';

export function projectsFetchDataSuccess(projects) {
  return {
    type: 'PROJECTS_FETCH_DATA_SUCCESS',
    projects,
  };
}

export function getProjects(token) {
  return (dispatch) => {
    axios
      .get(`https://picsart-bootcamp-2020-api.herokuapp.com/api/v1/projects`, {
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
      .then((response) => dispatch(projectsFetchDataSuccess(response.data)))
      .then((response) => console.log(response.data))

      .catch(() => window.alert('Error getting projects list'));
  };
}
