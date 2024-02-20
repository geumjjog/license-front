import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../css/MyPage.css";
import { useNavigate, Link } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [member, setMember] = useState({
    memberNum: "",
    memberName: "",
    username: "",
    password: "",
    email: "",
    domain: "",
    phoneNum: "",
    socialNum1: "",
    socialNum2: "",
  });
  const [memberInfo, setMemberInfo] = useState({});
  const [userPasswordCheck, setUserPasswordCheck] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isPasswordDisabled, setIsPasswordDisabled] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        const response = await axios.post("/getMemberInfo", null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.result === "Success") {
          setMemberInfo({
            memberNum: response.data.currentMember.memberNum,
            memberName: response.data.currentMember.memberName,
            password: "",
            email: response.data.currentMember.email,
            domain: "",
            phoneNum: response.data.currentMember.phoneNum,
            id: response.data.currentMember.username,
          });
          setMember({
            memberNum: response.data.currentMember.memberNum,
            memberName: response.data.currentMember.memberName,
            password: "",
            email: response.data.currentMember.email,
            domain: "",
            phoneNum: response.data.currentMember.phoneNum,
            id: response.data.currentMember.username,
          });
          if (
            response.data.currentMember.socialType === "GOOGLE" ||
            response.data.currentMember.socialType === "KAKAO" ||
            response.data.currentMember.socialType === "NAVER"
          ) {
            setUserId(
              response.data.currentMember.socialType + " 로그인 회원입니다."
            );
            setIsPasswordDisabled(true);
          } else {
            setUserId(response.data.currentMember.username);
          }
        }
      } catch (error) {
        console.error("Error fetching member info:", error);
      }
    };
    fetchMemberInfo();
    setUserPasswordCheck("");
  }, []);

  const [listStar, setListStar] = useState([]);
  useEffect(() => {
    const fetchStar = async () => {
      try {
        const responseList = await axios.get("/license/star");
        const responseListData = responseList.data;
        setListStar(responseListData);
      } catch (error) {
        console.error("Error fetching info:", error);
      }
    };

    fetchStar();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 창 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (field, value) => {
    if (field === "password") {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
      setIsPasswordValid(passwordRegex.test(value));
    }
    if (field === "memberName") {
      if (!value.trim()) {
        // 이름이 공백인 경우
        setIsNameValid(false);
      } else {
        // 이름이 공백이 아닌 경우에는 한글로만 이루어지고, 2~5글자인지 검사
        const nameRegex = /^[가-힣]{2,5}$/;
        setIsNameValid(nameRegex.test(value));
      }
    }
    setMember({ ...member, [field]: value });
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    // 이름 유효성 검사

    if (member.password !== "" || userPasswordCheck !== "") {
      if (!isPasswordDisabled) {
        if (!isPasswordValid) {
          alert(
            "비밀번호는 최소 8자리, 대문자1, 소문자1, 숫자1로 이루어져야 합니다. (!@#$%^&* 만 가능)"
          );
          return;
        }
        // 비밀번호 일치 여부 확인
        if (member.password !== userPasswordCheck) {
          alert("비밀번호가 일치하지 않습니다.");
          return;
        }
      }
    }
    if (memberInfo.memberName !== member.memberName) {
      console.log(memberInfo.memberName);
      console.log(member.memberName);
      if (!isNameValid) {
        alert("이름은 한글로 2~5글자 사이여야 합니다.");
        return;
      }
      alert("회원 이름이 변경되었습니다.\n회원정보를 수정하시겠습니까?");
    } else if (memberInfo.password !== member.password) {
      alert("비밀번호가 변경되었습니다.\n회원정보를 수정하시겠습니까?");
    } else if (memberInfo.phoneNum !== member.phoneNum) {
      const phoneRegex = /^(010|011)\d{8}$/;
      if (
        !phoneRegex.test(
          member.phoneNum === null || member.phoneNum.replace(/-/g, "")
        )
      ) {
        alert("올바른 전화번호 형식이 아닙니다.");
        return;
      }
      alert("전화번호가 변경되었습니다.\n회원정보를 수정하시겠습니까?");
    } else {
      alert("수정된 정보가 없습니다.");
      return;
    }
    try {
      console.log("수정 정보 보내기");
      // axios를 사용하여 서버로 데이터 전송
      const response = await axios.post("/editMemberInfo", member);
      console.log(response.data);
      // 추가적으로 서버로부터의 응답을 처리하거나 상태를 업데이트할 수 있음
      if (response.data === "Success") {
        console.log(response.data);
        alert("회원정보 수정 완료!");
        navigate("/");
      } else if (response.data === "Equal Password") {
        alert("전과 동일한 비밀번호 입니다.");
        return;
      } else {
        alert("실패");
        console.log(response.data);
      }
    } catch (error) {
      console.log("Error sending data: ", error);
    }
    console.log("폼 제출됨:", member);
  };

  const resetEdit = () => {
    setMember({
      memberName: memberInfo.memberName,
      email: memberInfo.email,
      phoneNum: memberInfo.phoneNum,
      password: memberInfo.password,
      username: memberInfo.username,
    });
    setUserPasswordCheck("");
    setIsEmailCheckButtonDisabled(true);
    setIsEmailCheckButton2Disabled(true);
  };

  return (
    <>
      <Header />
      <hr />
      <button className="bookmark_btn" onClick={openModal}>
        자격증 즐겨찾기
      </button>
      <div className="mypagee_container">
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>
                  <div className="id_check">
                    <div className="basic_input">
                      <input type="text" value={member.id} required />
                      <label>아이디</label>
                    </div>
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
                    <label>비밀번호</label>
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
                    <label>이름</label>
                  </div>
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
                    <label>전화번호</label>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="email_input">
                    <input type="text" value={member.email} required />
                    <label>이메일</label>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <button className="editmembr" type="submit">
            회원정보수정
          </button>
        </form>
      </div>

      {isModalOpen && (
        <>
          <div className="modal_background"></div>
          <div className="modal">
            <div className="modal_content">
              <span className="close_btn" onClick={closeModal}>
                &times;
              </span>
              <h2>나의 즐겨찾기 목록</h2>
              {listStar.filter((star) => star.username === member.id).length ===
              0 ? (
                <p>즐겨찾기한 자격증이 없습니다.</p>
              ) : (
                <ul>
                  {listStar.map((star) => {
                    // username이 MyPage의 member.id와 일치하는 경우에만 출력
                    if (star.username === member.id) {
                      return (
                        <li key={star.id}>
                          <Link to={`/detail/${star.jmnm}`}>{star.jmnm}</Link>
                        </li>
                      );
                    }
                    return null;
                  })}
                </ul>
              )}
            </div>
          </div>
        </>
      )}

      <Footer />
    </>
  );
};

export default MyPage;
