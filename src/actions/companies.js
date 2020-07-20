import axios from 'axios';

import {
  itemsAreLoading,
  itemsFetchDataSuccess,
  itemsHaveError,
} from './items';

export function getCompanies() {
  return (dispatch) => {
    dispatch(itemsAreLoading(true));

    axios
      .get(`https://picsart-bootcamp-2020-api.herokuapp.com/api/v1/companies`)
      .then((response) => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }

        dispatch(itemsAreLoading(false));

        return response;
      })
      .then((response) => dispatch(itemsFetchDataSuccess(response.data)))

      .catch(() => dispatch(itemsHaveError(true)));
  };
}
