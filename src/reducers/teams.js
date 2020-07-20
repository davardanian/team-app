export function teams(state = [], action) {
  switch (action.type) {
    case 'TEAMS_FETCH_DATA_SUCCESS':
      return action.teams;

    default:
      return state;
  }
}
