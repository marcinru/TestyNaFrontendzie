import React, { Dispatch, useReducer } from "react";
import { Action, reducer, ReducerState, startingState } from "./reducers";

type UserProviderProps = {
  children: React.ReactNode;
  value?: UserContextInterface;
};

export interface UserContextInterface {
  dispatch?: Dispatch<Action>;
  state: ReducerState;
}

const UserContext =
  React.createContext<UserContextInterface | undefined>(undefined);

const UserProvider = ({ children, ...props }: UserProviderProps) => {
  const [state, dispatch] = useReducer(reducer, startingState);
  const value = { state, dispatch };
  return (
    <UserContext.Provider value={value} {...props}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

const withUserProvider = <T, _>(
  WrappedComponent: React.ComponentType<T>,
): React.FC<T> => {
  return (props: T) => {
    return (
      <UserProvider>
        <WrappedComponent {...(props as T)} />;
      </UserProvider>
    );
  };
};

export { UserProvider, useUser, withUserProvider };
