import { setLoginStatus } from "reducers/loginStatusReducer";
import { storeUser } from "reducers/userReducer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAccessTokenFromRefreshToken,
  getCurrentUser,
  validateToken,
} from "services/managerAuth";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
} from "services/localStorage";
import { axiosForLibraryAPI } from "services/axios";
import useAPI from "hooks/useApi";
import { getRule } from "services/manager";
import { setRuleSystem } from "reducers/ruleReducer";

const AutoLogin = () => {
  const loginStatus = useSelector((state) => state.loginStatus);
  const rule = useSelector((state) => state.rule);
  const getRuleRequest = useAPI({ queryFn: getRule });
  const dispatch = useDispatch();
  const login = () => {
    let { isChecking, isLogin } = loginStatus;
    if (!isChecking) return;
    isChecking = false;
    console.log("refresh token:", getRefreshToken());
    if (validateToken(getRefreshToken())) {
      if (!validateToken(getAccessToken())) {
        console.log("Get new token with refresh token", getRefreshToken());
        getAccessTokenFromRefreshToken()
          .then((res) => {
            isLogin = true;
            getCurrentUser().then((res) => dispatch(storeUser(res.data.data)));
          })
          .catch((err) => {
            isLogin = false;
            clearTokens();
          })
          .finally(() => dispatch(setLoginStatus({ isLogin, isChecking })));
        return;
      }
      console.log("use old token", getAccessToken());

      axiosForLibraryAPI.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${getAccessToken()}`;
      getCurrentUser()
        .then((res) => {
          isLogin = true;
          dispatch(storeUser(res.data.data));
        })
        .catch((err) => {
          isLogin = false;
          removeAccessToken();
          return login();
        })
        .finally(() => dispatch(setLoginStatus({ isLogin, isChecking })));
      return;
    }
    clearTokens();
    dispatch(setLoginStatus({ isLogin, isChecking }));
  };
  useEffect(() => {
    login();
    if (loginStatus.isLogin && !rule) {
      getRuleRequest
        .run()
        .then((res) => {
          dispatch(setRuleSystem(res));
        })
        .catch((err) => {});
    }
  }, [loginStatus]);
};

export default AutoLogin;
