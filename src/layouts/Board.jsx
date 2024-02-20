import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullhorn,
  faComments,
  faPersonMilitaryPointing,
} from "@fortawesome/free-solid-svg-icons";
import "../css/Board.css";
import { Link } from "react-router-dom";
import Quick from "../components/Quick/Quick";
import axios from "axios";

const Board = () => {
  const [selectedButton, setSelectedButton] = useState("notice");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 한 페이지당 보여줄 아이템 수
  const [boardList, setBoardList] = useState([]);
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
    const fetchBoardList = async () => {
      try {
        const response = await axios.get("/board/boardList");
        setBoardList(response.data);
      } catch (error) {
        console.error("Error fetching board list:", error);
      }
    };

    fetchBoardList();
  }, []);

  const filteredDatas = boardList.filter((board) => {
    switch (selectedButton) {
      case "notice":
        return board.defaultValue === "notice";
      case "freeboard":
        return board.defaultValue === "freeboard";
      default:
        return true;
    }
  });

  // 현재 페이지에 해당하는 데이터 추출
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredDatas.slice(indexOfFirstItem, indexOfLastItem);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(filteredDatas.length / itemsPerPage);

  // 페이지 번호 배열 생성
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  // 페이지 변경 시 호출되는 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
    setCurrentPage(1); // 버튼이 변경되면 페이지를 1로 초기화
  };
  return (
    <>
      <Header />
      <hr className="comu_hr" />
      <div id="Board">
        <div id="community_header">
          <h1>커뮤니티</h1>
        </div>
        <div className="custom_line">
          <hr className="custom-line" />
        </div>
        <div className="container">
          <div id="community-buttons" className="mb-2">
            <Button
              variant="secondary"
              className={`custom-lg-button ${
                selectedButton === "notice" ? "active" : ""
              }`}
              onClick={() => handleButtonClick("notice")}
            >
              <FontAwesomeIcon icon={faBullhorn} className="icon_btn" />
              공지사항
            </Button>{" "}
            <Button
              variant="secondary"
              className={`custom-lg-button ${
                selectedButton === "freeboard" ? "active" : ""
              }`}
              onClick={() => handleButtonClick("freeboard")}
            >
              <FontAwesomeIcon icon={faComments} className="icon_btn" />
              자유게시판
            </Button>{" "}
          </div>
        </div>

        <div className="Board-bottom">
          <div id="re_contents">
            <input type="hidden" value={0} />
            <div className="button-container">
              {member.id && (
                <Link to="/BoardWrite">
                  <button>글쓰기</button>
                </Link>
              )}
            </div>
            <ul className="your-component">
              {currentData.map((board) => (
                <React.Fragment key={board.boardSeq}>
                  <li className="list_container">
                    <div className="text-container">
                      <Link to={`/BoardView/${board.boardSeq}`}>
                        <span style={{ fontSize: "18px", color: "black" }}>
                          {board.boardSeq}
                        </span>
                        <span>&nbsp;</span>
                        <span style={{ fontSize: "20px", color: "#060e7b" }}>
                          {board.boardTitle}
                        </span>
                      </Link>
                    </div>
                    <div className="boardDate">
                      <span>{formatDate(board.boardDate)}</span>
                    </div>
                  </li>
                  <hr />
                </React.Fragment>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="pagination-container">
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <button
                onClick={() => handlePageChange(number)}
                className={`page-link ${
                  currentPage === number ? "active" : ""
                }`}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Quick />
      <Footer />
    </>
  );
};

export default Board;
