export enum Type {
  LOGIN_START = "LOGIN_START",
  LOGIN_ERROR = "LOGIN_ERROR",
  LOGIN_CLEAN = "LOGIN_CLEAN",
}

export interface State {
  loading: boolean;
  error: string;
}

interface ActionStart {
  type: Type.LOGIN_START;
}

interface ActionError {
  type: Type.LOGIN_ERROR;
  payload: {
    error: string;
  };
}

interface ActionClean {
  type: Type.LOGIN_CLEAN;
}

export type Action = ActionStart | ActionError | ActionClean;

export const INITIAL_LOGIN_STATE = {
  loading: false,
  error: "",
};

export const loginReducer = (
  state: State = INITIAL_LOGIN_STATE,
  action: Action
) => {
  switch (action.type) {
    case Type.LOGIN_START:
      console.log("LOGIN_START");
      return {
        ...state,
        error: "",
        loading: true,
      };
    case Type.LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error:
          action.payload.error ||
          "Problem with reading error, propably wrong login details",
      };
    case Type.LOGIN_CLEAN:
      return INITIAL_LOGIN_STATE;
    default:
      return state;
  }
};
