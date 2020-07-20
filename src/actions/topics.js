import axios from 'axios';
import { itemsAreLoading } from './items';

export function topicsFetchDataSuccess(topics) {
  return {
    type: 'TOPICS_FETCH_DATA_SUCCESS',
    topics,
  };
}

export function getTopics(token) {
  return (dispatch) => {
    axios
      .get(`https://picsart-bootcamp-2020-api.herokuapp.com/api/v1/topics`, {
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
      .then((response) => dispatch(topicsFetchDataSuccess(response.data)))
      .then((response) => console.log(response.data))

      .catch(() => window.alert('Error getting topics list'));
  };
}

export function addTopics(data, token) {
  const body = { title: data };
  const strData = JSON.stringify(body);
  return (dispatch) => {
    axios
      .post(
        `https://picsart-bootcamp-2020-api.herokuapp.com/api/v1/topics`,
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

        return response;
      })

      .catch((response) => window.alert(response.statusText));
  };
}

export function deleteTopics(token, id) {
  return (dispatch) => {
    dispatch(itemsAreLoading(true));
    axios
      .delete(
        `https://picsart-bootcamp-2020-api.herokuapp.com/api/v1/topics/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            token: token,
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

      .catch(() => window.alert('Error deleting topic'));
  };
}
