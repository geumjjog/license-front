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

    useEffect(() => {
        const fetchBoardDetails = async () => {
          try {
            const response = await axios.get(`/board/boardView/${boardSeq}`);
            setBoard(response.data);
          } catch (error) {
            console.error('Error fetching board details:을마ㅣㄴ으리ㅏㅓ아아각', error);
          }
        };
    
        fetchBoardDetails();
      }, [boardSeq]);

      if (!board) {
        return <div>Loading...</div>;
    }
    

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
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            name="title"
            value={board.title}
            readOnly
            className="styled-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="file">첨부파일</label>
          <input
            type="text"
            id="file"
            name="file"
            value={board.file}
            readOnly
            className="styled-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            name="content"
            value={board.content}
            readOnly
            className="styled-textarea"
          ></textarea>
        </div>
      </form>
      <div className="button-group">
        <Link to="/이전페이지">
          <button type="button" className="button cancel">
            이전으로
          </button>
        </Link>
      </div>
    </div>
        <Footer />
        </>
    );
};

export default BoardView;
