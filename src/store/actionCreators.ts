import { GET_ALCOHOL, ADD_ALCOHOL } from './actionTypes';

export const getAlcohol = (): Get => ({
  type: GET_ALCOHOL,
});

export const addAlcohol = (alcohol: Alcohol): AlcoholAction => {
  const action: AlcoholAction = {
    type: ADD_ALCOHOL,
    alcohol,
  };
  return action;
};
