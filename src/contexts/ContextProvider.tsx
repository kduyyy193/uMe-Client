import { ReactNode, createContext, useContext, useState } from "react";

import { KEY_TOKEN, KEY_USER } from "configs/auth";
import { getCookie, removeCookie, setCookie } from "react-use-cookie";
import { TUserResponse } from "services/auth/types";

type IContextProps = {
  user: TUserResponse | null;
  token: string | null;
  setToken: (token: string | null) => void;
  setUser: (user: TUserResponse | null) => void;
  logout: () => void;
};

const StateContext = createContext<IContextProps>({
  user: null,
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
  const [user, setUser] = useState<TUserResponse | null>(
    JSON.parse(localStorage.getItem(KEY_USER) || "{}")
  );
  const [token, setToken] = useState(getCookie(KEY_TOKEN));

  const _setToken = (token: string | null) => {
    if (token) {
      setToken(token);
      setCookie(KEY_TOKEN, token);
    }
  };

  const _setUser = (user: TUserResponse | null) => {
    console.log(user);
    if (user) {
      setUser(user);
      localStorage.setItem(KEY_USER, JSON.stringify(user));
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    removeCookie(KEY_TOKEN);
    localStorage.removeItem(KEY_USER);
  };

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        setUser: _setUser,
        setToken: _setToken,
        logout,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
