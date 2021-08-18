import { UserContextAction } from "./actions";
import { getCurrentUser } from "../authentication/getCurrentUser";

export interface ReducerState {
  user: string | undefined;
}

export const startingState: ReducerState = {
  user: getCurrentUser(),
};

export type Action = {
  type: UserContextAction;
  user?: string;
};

function resetContext(): ReducerState {
  return startingState;
}

function setCurrentUser(user: string | undefined, state: ReducerState) {
  return { ...state, user };
}

export const reducer = (state: ReducerState, action: Action): ReducerState => {
  switch (action.type) {
    case UserContextAction.LOGIN:
    case UserContextAction.LOGOUT:
      return setCurrentUser(action.user, state);
    default:
      return state;
  }
};
