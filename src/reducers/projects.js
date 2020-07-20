export function projects(state = [], action) {
  switch (action.type) {
    case 'PROJECTS_FETCH_DATA_SUCCESS':
      return action.projects;

    default:
      return state;
  }
}
