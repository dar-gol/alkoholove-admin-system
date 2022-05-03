type Alcohol = {
  id: number;
  name: string;
  type: string;
};

type AlcoholState = {
  list: Alcohol[];
  isLoaded: boolean;
};

type AlcoholsState = {
  alcohol: AlcoholState;
};

type AlcoholAction = {
  type: 'ADD_ALCOHOL' | 'REMOVE_ALCOHOL' | 'TEST';
  alcohol: Alcohol;
};

type Get = {
  type: 'GET_ALCOHOL';
};
