import { ADD_ALCOHOL } from './actionTypes';

const initAlcohol: AlcoholState = {
  list: [],
  isLoaded: false,
};

export const alcoholReducer = (state: AlcoholState = initAlcohol, action: AlcoholAction): AlcoholState => {
  switch (action.type) {
    case ADD_ALCOHOL:
      return state;
    default:
      return state;
  }
};
