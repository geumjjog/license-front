import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../css/EditMember.css";

const EditMember = () => {
  const { username } = useParams();
  const [memberInfo, setMemberInfo] = useState({
    memberName: "",
    email: "",
    phoneNum: "",
    membership: "",
    warning: "",
  });

  useEffect(() => {
    fetchMemberInfo();
  }, []);

  const fetchMemberInfo = async () => {
    try {
      const response = await axios.get(`/getMemberInfoByUsername/${username}`);
      setMemberInfo(response.data.member);
      console.log(response.data.member);
    } catch (error) {
      console.error("Error fetching member info:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("이전 상태:", memberInfo); // 변경 전 상태 출력
    setMemberInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log("변경 후 상태:", memberInfo); // 변경 후 상태 출력
  };

  useEffect(() => {
    console.log(memberInfo); // memberInfo 상태가 변경될 때마다 값을 콘솔에 출력
  }, [memberInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/updateMember/${username}`, {
        memberName: memberInfo.memberName,
        email: memberInfo.email,
        membership: memberInfo.membership,
      });
      alert("회원 정보가 성공적으로 수정되었습니다.");
      toHome();
    } catch (error) {
      console.error("Error updating member info:", error);
    }
  };

  const toHome = () => {
    window.location.href = "/admin"; // 페이지 이동
  };

  return (
    <>
      <Header />
      <hr />
      <div className="editm-container">
        <h1>회원 정보 수정</h1>
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>
                  <div className="user_check">
                    <div className="basic_input">
                      <input
                        type="text"
                        name="username"
                        value={memberInfo.username}
                        required
                      />
                      <label>아이디*</label>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="user_check">
                    <div className="basic_input">
                      <input
                        type="text"
                        name="memberName"
                        value={memberInfo.memberName}
                        onChange={handleInputChange}
                      />
                      <label>이름</label>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="email_input">
                    <input type="email" name="email" value={memberInfo.email} />
                    <label>이메일*</label>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="basic_input">
                    <input
                      type="text"
                      name="membership"
                      value={memberInfo.membership}
                      onChange={handleInputChange}
                    />
                    <label>회원유형</label>
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
      <Footer />
    </>
  );
};

export default EditMember;
