import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  createContext,
} from "react";
import axios from "axios";
import { isUndefined } from "util";

const authContext = createContext();
const AuthContextProvider = (props) => {
  const [loggedInState, setLoggedInState] = useState({
    isLoggedIn: undefined,
    user: null,
    isLoading: false,
  });

  const getLoggedIn = useCallback(async () => {
    const loggedInStateRes = await axios.get(
      "http://localhost:9000/api/v1/auth/isLoggedIn",
      { withCredentials: true }
    );
    setLoggedInState({
      ...loggedInState,
      isLoading: false,
      isLoggedIn: loggedInStateRes.data.isLoggedIn,
      user: loggedInStateRes.data.user,
    });
  }, [loggedInState]);

  useEffect(() => {
    getLoggedIn();
  }, [getLoggedIn]);
  return (
    <authContext.Provider value={{ loggedInState, getLoggedIn }}>
      {props.children}
    </authContext.Provider>
  );
};

export default authContext;
export { AuthContextProvider };
