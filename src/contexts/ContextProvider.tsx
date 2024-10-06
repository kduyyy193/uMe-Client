import { ReactNode, createContext, useContext, useState } from "react";

import { IUser } from "interfaces/IUser";
import { KEY_TOKEN, KEY_USER } from "configs/auth";

type IContextProps = {
  user: IUser;
  token: string | null;
  setToken: (token: string | null) => void;
  setUser: (user: IUser) => void;
  logout: () => void;
};

const StateContext = createContext<IContextProps>({
  user: {},
  token: null,
  setToken: () => {
    //
  },
  setUser: () => {
    //
  },
  logout: () => {
    //
  },
});

type ContextProviderProps = {
  children: ReactNode;
};

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [user, setUser] = useState<IUser>({});
  const [token, setToken] = useState(localStorage.getItem(KEY_TOKEN));

  const _setToken = (token: string | null) => {
    if (token) {
      setToken(token);
      localStorage.setItem(KEY_TOKEN, token);
    }
  };

  const logout = () => {
    setUser({});
    setToken(null);
    localStorage.removeItem(KEY_TOKEN);
    localStorage.removeItem(KEY_USER);
  };

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        setUser,
        setToken: _setToken,
        logout,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
