import React, {useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../css/BoardWrite.css";
import axios from 'axios';
import { Link } from 'react-router-dom';

const BoardModify = () => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

   
  // ... (이전 코드)

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
     // 파일이 존재하는 경우에만 FormData에 추가
     if (file) {
      formData.append('file', file);
    } else {
      formData.append('file', 'null'); // 파일이 없을 경우 'null' 전송
    }
    
    // 회원 정보도 FormData에 추가
    formData.append('memberId', member.id);

    // BoardWrite API로 데이터 전송
    const response = await axios.post('/board/boardWrite', formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data', // 파일 업로드 시 필요
      },
    });

    // 성공 시 처리
    console.log('Board write success:', response.data);
  } catch (error) {
    console.error('Error writing board:', error);
  }
};

// ... (이전 코드)


  const handleReset = () => {
    setTitle('');
    setContent('');
    setFile(null);
  };

  //멤버정보 불러오기
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
          setMember({
            memberNum: response.data.currentMember.memberNum,
            memberName: response.data.currentMember.memberName,
            password: "",
            email: response.data.currentMember.email,
            domain: "",
            phoneNum: response.data.currentMember.phoneNum,
            id: response.data.currentMember.username,
          });
        }
      } catch (error) {
        console.error("Error fetching member info:", error);
      }
    };
    fetchMemberInfo();
  }, []);

  

  return (
    <>
    <Header />
    <hr />
    <div className="form-container">
      <h2>COMMUNITY 게시글 수정</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="styled-input"
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="styled-input"
        />
        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="styled-textarea"
        ></textarea>
        <div className="button-group">
          <button type="button" className="button cancel" onClick={handleReset}>취소</button>
          <Link to="/community"><button type="submit" className="button">확인</button></Link>
        </div>
      </form>
    </div>
    <Footer />
    </>
  );
};
export default BoardModify;