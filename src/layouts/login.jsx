import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import kakao from "../img/kakao_login_large_narrow.png";
import naver from "../img/btnG.png";
import google from "../img/web_light_rd_na.png";
import "../css/login.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // axios를 사용하여 서버로 데이터 전송
      const response = await axios.post("/login", { username, password });
      const token = response.headers.authorization.split(" ")[1];

      // 추가적으로 서버로부터의 응답을 처리하거나 상태를 업데이트할 수 있음
      if (response) {
        // 토큰을 로컬 스토리지에 저장
        localStorage.setItem("token", token);
        console.log("로그인 성공");
        console.log(token);
        // 로그인 성공
        alert("로그인 성공");
        navigate("/");
        // 토큰으로 username, role 가져오기
        // const responseC = await axios.post("/getIdRole", null, {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   });
        // if(responseC.data.result === "Success"){
        //     console.log(responseC.data.result)
        //     console.log(responseC.data.member.username)
        //     console.log(responseC.data.member.memberName)
        //     console.log(responseC.data.member.email)
        //     console.log(responseC.data.member.phoneNum)
        //     console.log(responseC.data.member.role)
        // }else {
        //     console.log(responseC.data.result)
        // }
      } else {
        // 로그인 실패
        alert("로그인 실패. 아이디 또는 비밀번호를 확인해주세요.");
      }
    } catch (error) {
      alert("로그인 실패. 아이디 또는 비밀번호를 확인해주세요.");
      console.log("Error sending data: ", error);
    }
  };

  return (
    <div className="login_container">
      <div class="login-form">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div class="int-area">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              name="id"
              id="id"
              autocomplete="off"
              required
            />
            <label for="id">USER NAME</label>
          </div>
          <div class="int-area">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="pw"
              id="pw"
              autocomplete="off"
              required
            />
            <label for="pw">PASSWORD</label>
          </div>
          <div class="btn-area">
            <button id="btn" type="submit">
              LOGIN
            </button>
          </div>
        </form>
        <div class="caption">
          <Link to="/findid">Forgot Id?</Link>
          <Link to="findpassword">Forgot Password?</Link>
          <Link to="/register">회원가입</Link>
        </div>
        <div className="social">
          <a href="http://localhost:8080/oauth2/authorization/kakao">
            <img src={kakao} alt="카카오" />
          </a>
          <a href="http://localhost:8080/oauth2/authorization/naver">
            <img src={naver} alt="네이버" />
          </a>
          <a href="http://localhost:8080/oauth2/authorization/google">
            <img src={google} alt="구글" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
