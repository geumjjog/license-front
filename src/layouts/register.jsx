import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../css/register.css";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [member, setMember] = useState({
    memberName: "",
    username: "",
    password: "",
    email: "",
    domain: "",
    phoneNum: "",
    socialNum1: "",
    socialNum2: "",
  });

  const [userPasswordCheck, setUserPasswordCheck] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isNameValid, setIsNameValid] = useState(true);
  const [randomInitial, setRandomInitial] = useState("");

  // 이메일 중복확인
  const [isEmailCheckButtonDisabled, setIsEmailCheckButtonDisabled] =
    useState(false);
  const checkEmail = async (event) => {
    event.preventDefault();
    // 추가적인 유효성 검사가 필요하다면 여기에 추가
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(member.email + member.domain)) {
      alert("올바른 이메일 형식이 아닙니다.");
      return;
    }
    try {
      // 적절한 엔드포인트와 데이터를 사용
      const response = await axios.post("/checkEmail", {
        email: member.email,
        domain: member.domain,
      });

      // 응답에 따라 처리
      if (response.data === "Exist") {
        alert("해당 이메일은 이미 사용중입니다.");
      } else if (response.data === "Empty") {
        alert("이메일을 입력하세요.");
      } else {
        alert(response.data);
        setIsEmailCheckButtonDisabled(true);
      }
    } catch (error) {
      console.log("데이터 전송 중 오류 발생: ", error);
    }
  };
  const [isEmailCheckButton2Disabled, setIsEmailCheckButton2Disabled] =
    useState(false);
  const checkMemberEmail = async (event) => {
    event.preventDefault();
    if (!isEmailCheckButtonDisabled) {
      alert("이메일 중복확인 해주세요.");
      return;
    }
    // 추가적인 유효성 검사가 필요하다면 여기에 추가

    try {
      alert(
        "해당 이메일로 인증코드를 전송합니다.\n 최대 1분이 소요될 수 있습니다.\n 전송 완료시 전송 완료 창이 나옵니다."
      );
      // 적절한 엔드포인트와 데이터를 사용
      const response = await axios.post("/checkMemberEmail", {
        email: member.email,
        domain: member.domain,
      });
      console.log(response.data);
      if (response.data === "Success") {
        alert(
          "해당 이메일로 인증 코드를 전송했습니다.\n" +
            "아래 입력칸에 입력해주세요."
        );
      } else {
      }
    } catch (error) {
      console.log("데이터 전송 중 오류 발생: ", error);
    }
  };
  const [isEmailCheckButton3Disabled, setIsEmailCheckButton3Disabled] =
    useState(false);
  const checkCodeSand = async (event) => {
    event.preventDefault();
    if (!randomInitial) {
      alert("코드를 입력해주세요.");
      return;
    }
    // 추가적인 유효성 검사가 필요하다면 여기에 추가

    try {
      // 적절한 엔드포인트와 데이터를 사용
      const response = await axios.post("/checkCode", {
        email: member.email,
        domain: member.domain,
        randomInitial: randomInitial,
      });
      console.log(response.data + "080");
      if (response.data === "이메일 인증에 성공하였습니다.") {
        setIsEmailCheckButton2Disabled(true);
        setIsEmailCheckButton3Disabled(true);
        alert(
          "이메일 인증이 완료되었습니다. \n모든 필드를 채우고 회원가입 버튼을 눌러주세요."
        );
      } else {
        alert("코드를 확인해주세요.");
      }
    } catch (error) {
      console.log("데이터 전송 중 오류 발생: ", error);
    }
  };

  const handleChange = (field, value) => {
    if (field === "username") {
      const usernameRegex = /^[a-zA-Z0-9]{6,12}$/;
      const isInputValid = value.trim() !== "" && usernameRegex.test(value); // 빈 값이 아닌지와 정규식을 통한 유효성 검사
      setIsUsernameValid(isInputValid);
    }
    if (field === "password") {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
      setIsPasswordValid(passwordRegex.test(value));
    }
    if (field === "memberName") {
      // 이름은 한글로만 이루어지고, 2~5글자
      const nameRegex = /^[가-힣]{2,5}$/;
      setIsNameValid(nameRegex.test(value));
    }

    setMember({ ...member, [field]: value });
  };

  const handleDomainChange = (event) => {
    const selectedDomain = event.target.value;
    setMember({ ...member, domain: selectedDomain });
  };

  const formatPhoneNumber = (phoneNumber) => {
    // 전화번호 형식 변환 (000-0000-0000)
    return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  };

  const handlePhoneNumChange = (event) => {
    // 입력된 값에서 숫자만 추출
    const newValue = event.target.value.replace(/[^0-9]/g, "");
    // 최대 11자리까지만 받음
    const truncatedValue = newValue.slice(0, 11);
    // 형식 적용하여 state 업데이트
    setMember({ ...member, phoneNum: formatPhoneNumber(truncatedValue) });
  };
  // 주민번호 유효성검사
  const handleSocialNum1Change = (event) => {
    // 입력된 값에서 숫자만 추출
    const newValue = event.target.value.replace(/[^0-9]/g, "");
    // 최대 6자리까지만 받음
    const truncatedValue = newValue.slice(0, 6);

    // 형식 및 유효성 검사
    if (truncatedValue.length === 6) {
      const year = parseInt(truncatedValue.substring(0, 2), 10);
      const month = parseInt(truncatedValue.substring(2, 4), 10);
      const day = parseInt(truncatedValue.substring(4, 6), 10);

      // 연도는 00~99 사이의 값이어야 함
      if (year < 0 || year > 99) {
        alert("올바른 연도 형식이 아닙니다.");
        return;
      }

      // 월은 1~12 사이의 값이어야 함
      if (month < 1 || month > 12) {
        alert("올바른 월 형식이 아닙니다.");
        return;
      }

      // 일은 1~31 사이의 값이어야 함 (해당 월에 따라 조정 필요)
      if (day < 1 || day > 31) {
        alert("올바른 일 형식이 아닙니다.");
        return;
      }
    }

    // 형식 적용하여 state 업데이트
    setMember((prevMember) => ({ ...prevMember, socialNum1: truncatedValue }));
  };

  const handleSocialNum2Change = (event) => {
    // 입력된 값에서 숫자만 추출
    const newValue = event.target.value.replace(/[^0-9]/g, "");
    // 최대 7자리까지만 받음
    const truncatedValue = newValue.slice(0, 1);

    // 형식 및 유효성 검사
    if (truncatedValue.length === 1) {
      const firstDigit = parseInt(truncatedValue.charAt(0), 10);

      // 첫 번째 숫자는 1~4 사이의 값이어야 함
      if (firstDigit < 1 || firstDigit > 4) {
        alert("뒷자리 첫 번째 숫자는 1~4까지만 가능합니다.");
        return;
      }
    }

    // 형식 적용하여 state 업데이트
    setMember((prevMember) => ({ ...prevMember, socialNum2: truncatedValue }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // 이름 유효성 검사
    if (!isNameValid) {
      alert("이름은 한글로 2~5글자 사이여야 합니다.");
      return;
    }
    if (!isCheckButtonDisabled) {
      alert("ID 중복확인 해주세요.");
      return;
    }
    if (!isEmailCheckButtonDisabled) {
      alert("이메일 중복확인 해주세요.");
      return;
    }
    // 비밀번호 일치 여부 확인
    if (member.password !== userPasswordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!isPasswordValid) {
      alert(
        "비밀번호는 최소 8자리, 대문자1, 소문자1, 숫자1로 이루어져야 합니다. (!@#$%^&* 만 가능)"
      );
      return;
    }
    if (!isEmailCheckButton3Disabled) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }
    if (
      !member.memberName ||
      !member.username ||
      !member.password ||
      !member.email ||
      !member.phoneNum
    ) {
      alert("모든 필드를 채워주세요.");
      return;
    }

    // 전화번호 유효성 검사
    const phoneRegex = /^(010|011)\d{8}$/;
    if (!phoneRegex.test(member.phoneNum.replace(/-/g, ""))) {
      alert("올바른 전화번호 형식이 아닙니다.");
      return;
    }

    try {
      // axios를 사용하여 서버로 데이터 전송
      const response = await axios.post("/join", member);
      // 추가적으로 서버로부터의 응답을 처리하거나 상태를 업데이트할 수 있음
      if (response.data === "ok") {
        console.log(response.data);
        alert(response.data);
        navigate("/");
      } else {
        alert(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log("Error sending data: ", error);
    }
    console.log("폼 제출됨:", member);
  };

  // 아이디 중복검사
  const [isCheckButtonDisabled, setIsCheckButtonDisabled] = useState(false);
  const checkId = async (event) => {
    event.preventDefault();
    // 아이디 유효성 검사
    if (!isUsernameValid) {
      alert("아이디는 영문과 숫자로 이루어진 6~12글자여야 합니다.");
      return;
    }
    try {
      // axios를 사용하여 서버로 데이터 전송
      const response = await axios.post("/checkId", member);
      console.log(response.data);
      // 추가적으로 서버로부터의 응답을 처리하거나 상태를 업데이트할 수 있음
      if (response.data === "Exist") {
        console.log(response.data);
        alert("이미 존재하는 아이디입니다.");
      } else if (response.data === "Empty") {
        console.log(response.data);
        alert("아이디를 입력하세요.");
      } else {
        alert(response.data);
        console.log(response.data);
        setIsCheckButtonDisabled(true);
      }
    } catch (error) {
      console.log("Error sending data: ", error);
    }
  };

  return (
    <div className="register_container">
      <div className="header__logo">
        <Link to="/" className="logo">
          <img src="images/logo.png" alt="로고" />
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <div className="id_check">
                  <div className="basic_input">
                    <input
                      type="text"
                      onChange={(event) =>
                        handleChange("username", event.target.value)
                      }
                      value={member.username}
                      required
                    />
                    <label>아이디를 입력하세요</label>
                  </div>
                  <button
                    className="id_btn"
                    onClick={checkId}
                    disabled={isCheckButtonDisabled}
                  >
                    중복확인
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="basic_input">
                  <input
                    type="password"
                    onChange={(event) =>
                      handleChange("password", event.target.value)
                    }
                    value={member.password}
                    required
                  />
                  <label>비밀번호를 입력하세요</label>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="basic_input">
                  <input
                    type="password"
                    onChange={(event) =>
                      setUserPasswordCheck(event.target.value)
                    }
                    value={userPasswordCheck}
                    required
                  />
                  <label>비밀번호 확인</label>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="basic_input">
                  <input
                    type="text"
                    onChange={(event) =>
                      handleChange("memberName", event.target.value)
                    }
                    value={member.memberName}
                    required
                  />
                  <label>이름을 입력하세요</label>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="rrn1_input">
                  <input
                    type="text"
                    onChange={handleSocialNum1Change}
                    value={member.socialNum1}
                    required
                  />
                  <label>주민번호를 입력하세요</label>
                </div>
                <span style={{ fontWeight: "bold" }}>-&nbsp;</span>
                <input
                  className="rrn2_input"
                  style={{ fontWeight: "bold" }}
                  type="text"
                  onChange={handleSocialNum2Change}
                  value={member.socialNum2}
                />
                <div className="star">******</div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="basic_input">
                  <input
                    type="text"
                    onChange={handlePhoneNumChange}
                    value={member.phoneNum}
                    required
                  />
                  <label>전화번호를 입력하세요</label>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="email_input">
                  <input
                    type="text"
                    onChange={(event) =>
                      handleChange("email", event.target.value)
                    }
                    value={member.email}
                    required
                  />
                  <label>이메일을 입력하세요</label>
                  <span>@</span>
                  <select
                    name="domain"
                    onChange={handleDomainChange}
                    value={member.domain}
                  >
                    <option value="">이메일 선택</option>
                    <option value="@naver.com">naver.com</option>
                    <option value="@gmail.com">gmail.com</option>
                    <option value="@daum.net">daum.net</option>
                  </select>
                </div>
                <button
                  className="email_btn"
                  onClick={checkEmail}
                  disabled={isEmailCheckButtonDisabled}
                >
                  이메일 중복확인
                </button>
                <button
                  className="email_btn"
                  onClick={checkMemberEmail}
                  disabled={isEmailCheckButton2Disabled}
                >
                  인증코드받기
                </button>
                <div className="check_input">
                  <input
                    className="basic_input"
                    type="text"
                    onChange={(event) => setRandomInitial(event.target.value)}
                    value={randomInitial}
                    disabled={isEmailCheckButton3Disabled}
                    style={{
                      width: "150px",
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                  />
                  <button
                    className="check_btn"
                    onClick={checkCodeSand}
                    disabled={isEmailCheckButton3Disabled}
                  >
                    코드 확인
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <button className="signup" type="submit">
          가입하기
        </button>
      </form>
    </div>
  );
};

export default Register;
