import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
export const LoginContext = createContext();
LoginContext.displayName = "LoginContextName";

const LoginContextProvider = ({ children }) => {
  // 로그인 여부, 로그아웃 함수
  const [isLogin, setLogin] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  const navigate = useNavigate();

  // 토큰 만료 여부를 확인하는 함수
  const isTokenExpired = (token) => {
    if (!token) return true;
    const expirationDate = jwtDecode(token).exp;
    const currentTimestamp = Math.floor(new Date().getTime() / 1000);
    return expirationDate < currentTimestamp;
  };

  const [member, setMember] = useState("");

  const updateUser = (role) => {
    setMember(role);
  };
  // 토큰을 체크하고 만료되었을 경우 로그아웃
  useEffect(() => {
    updateUser();
  }, []);

  const logout = () => {
    setLogin(false);
    localStorage.removeItem("accessToken");
    setUserInfo(null);
    alert("로그아웃 되었습니다");
    navigate("/");
  };

  return (
    <LoginContext.Provider value={{ updateUser }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
