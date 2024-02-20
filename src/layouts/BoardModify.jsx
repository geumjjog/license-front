import React, {useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../css/BoardWrite.css";
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BoardModify = () => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const { boardSeq } = useParams();
  const [board, setBoard] = useState({ boardTitle: '', boardContents: '' });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    const fetchBoardDetails = async () => {
      try {
        const response = await axios.get(`/board/boardView/${boardSeq}`);
        setBoard(response.data);
        setTitle(response.data.boardTitle);
        setContent(response.data.boardContents);
      } catch (error) {
        console.error('Error fetching board details', error);
      }
    };

    fetchBoardDetails();
  }, [boardSeq]);
  // ... (이전 코드)

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (file) {
      formData.append('file', file);
    }

    const response = await axios.post(`/board/update?boardSeq=${boardSeq}`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    
    console.log('Board write success:', response.data);
    window.location.href = `/BoardView/${boardSeq}`;
  } catch (error) {
    console.error('Error writing board:', error);
  }
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


const handleReset = () => {
  setTitle(board ? board.boardTitle : ''); 
  setContent(board ? board.boardContents : ''); 
  setFile(null);
};

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
        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="styled-textarea"
        ></textarea>
        <div className="button-group">
          <button type="button" className="button cancel" onClick={handleReset}>취소</button>
          <button type="submit" className="button" >확인</button>
        </div>
      </form>
    </div>
    <Footer />
    </>
  );
};
export default BoardModify;