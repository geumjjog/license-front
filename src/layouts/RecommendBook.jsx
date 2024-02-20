import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../css/RecomendBook.css";
import axios from "axios";

const RecommendBook = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    // 검색 버튼을 클릭할 때 실행되는 함수
    // 예시로 검색어를 콘솔에 출력하고 RecomendBookDetail 페이지로 이동하는 부분입니다.
    console.log("Search Term:", searchTerm);

    // RecomendBookDetail 페이지로 이동
    navigate(`/RecommendBookDetail?search=${searchTerm}`);
  };

  const handleKeyDown = (e) => {
    // 엔터 키를 눌렀을 때 실행되는 함수
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <>
      <Header />
      <hr />
      <div className="recommendBook">
        <div className="rmd_title">
          <h1>나에게 맞는 문제집 찾기</h1>
        </div>
        <div id="recommend_search">
          <img src="/images/logo.png" alt="Logo" className="logo" />
          <input
            type="text"
            placeholder="관심있는 자격증 이름을 검색하세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSearch}>검색</button>
        </div>
        <div className="explain">
          <span>
            검색창에 자격증 이름을 입력하시면 입력하신 자격증에 관련된 문제집이
            추천순으로 문제집을 확인하실 수 있습니다.
          </span>
          <br />
          <span>
            YES24, 교보문고, 알라딘에서 추천하는 문제집을 순서대로 보실 수
            있으며, 가격비교까지 가능합니다.
          </span>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RecommendBook;
