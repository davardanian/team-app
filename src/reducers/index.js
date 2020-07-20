import { combineReducers } from 'redux';
import { items, itemsHaveError, itemsAreLoading } from './items';
import { user, userHasError, loginError, regError } from './user';

import { topics } from './topics';
import { projects } from './projects';
import { teams } from './teams';

export default combineReducers({
  items,
  itemsHaveError,
  itemsAreLoading,
  user,
  userHasError,
  loginError,
  topics,
  projects,
  teams,
});
