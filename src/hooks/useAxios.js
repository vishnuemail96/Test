import { useContext, useEffect } from "react";
import api, { attachInterceptors } from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const useAxios = () => {
  const { auth, setAuth } = useContext(AuthContext);

  useEffect(() => {
    attachInterceptors(() => auth, setAuth);
  }, [auth]);

  return api;
};

export default useAxios;
