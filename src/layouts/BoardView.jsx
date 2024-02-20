import React, {useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../css/BoardWrite.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const BoardView = () => {
    
    const { boardSeq } = useParams();
    const [board, setBoard] = useState(null);
    console.log(boardSeq);

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

    useEffect(() => {
        const fetchBoardDetails = async () => {
          try {
            const response = await axios.get(`/board/boardView/${boardSeq}`);
            setBoard(response.data);
          } catch (error) {
            console.error('Error fetching board details', error);
          }
        };
    
        fetchBoardDetails();
      }, [boardSeq]);

      


      if (!board) {
        return <div>Loading...</div>;
    }
    const handleDelete = async () => {
      try {
        await axios.get(`/board/board_delete/${boardSeq}`);
        // 게시글 삭제 후 이전 페이지로 이동하거나 다른 작업을 수행할 수 있습니다.
        window.location.href = "/community";
      } catch (error) {
        console.error("Error deleting board", error);
      }
    };

    const isSameUser = member.id === board.boardUsername;

    return (
        <>
        <Header />
        <h3>COMMUNITY 글</h3>
        <hr />
        <div className="board-view-container">
      <h2>게시글 보기</h2>
      <form>
        <div className="form-group">
          <label htmlFor="boardSeq">게시글 번호</label>
          <input
            type="text"
            id="boardSeq"
            name="boardSeq"
            value={board.boardSeq}
            readOnly
            className="styled-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="comment">작성자</label>
          <input
            type="text"
            id="comment"
            name="comment"
            value={board.boardComment}
            readOnly
            className="styled-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            name="title"
            value={board.boardTitle}
            readOnly
            className="styled-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            name="content"
            value={board.boardContents}
            readOnly
            className="styled-textarea"
          ></textarea>
        </div>
      </form>
      <div className="button-group">
        <Link to="/community">
          <button type="button" className="button cancel">
            이전으로
          </button>
        </Link>

        {(isSameUser || member.id === "admin123") && (
          <button type="button" className="button modify"><Link to={`/BoardModify/${board.boardSeq}`}>
          <h3>수정</h3>
        </Link></button>
        )}


        {(isSameUser || member.id === "admin123") && (
          <button type="button" className="button delete" onClick={handleDelete}>
            삭제
          </button>
        )}
      </div>
    </div>
        <Footer />
        </>
    );
};

export default BoardView;