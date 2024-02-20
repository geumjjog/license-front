import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import axios from "axios";
import "../css/RecommendBookDetail.css";
import Quick from "../components/Quick/Quick";

const RecommendBookDetail = () => {
  // 현재 페이지의 위치 정보를 가져오기
  const location = useLocation();

  // URL에서 쿼리 문자열 추출
  const searchParams = new URLSearchParams(location.search);

  // searchParams.get('search')를 사용하여 검색어 가져오기
  const searchTerms = searchParams.get("search");
  console.log("검색어 : ", searchTerms);
  // URL을 생성하고 GET 요청을 보냄
  // fetch(`detail/books?search=${searchTerms}`)
  //   .then(response => response.json())
  //   .then(data => {
  //     // 서버로부터 받은 데이터를 처리
  //     console.log('받은 데이터:', data);
  //   })
  //   .catch(error => {
  //     console.error('에러 발생:', error);
  //   });

  const [bookData, setBookData] = useState(null);

  useEffect(() => {
    // URL을 생성하고 GET 요청을 보냄
    fetch(`detail/books?search=${searchTerms}`)
      .then((response) => response.json())
      .then((data) => {
        // 받은 데이터를 상태에 저장
        setBookData(data);

        // YES24에 해당하는 도서 분류
        const yes24Books = data.filter(
          (book) => book.defaultColumn === "YES24"
        );
        setOriginalYes24Data(yes24Books);
        setYes24Data(yes24Books);
        setFilteredYes24Data(yes24Books);

        // KYOBO에 해당하는 도서 분류
        const kyoboBooks = data.filter(
          (book) => book.defaultColumn === "KYOBO"
        );
        setOriginalKyoboData(kyoboBooks);
        setKyoboData(kyoboBooks);
        setFilteredKyoboData(kyoboBooks);

        // ALADIN에 해당하는 도서 분류
        const aladinBooks = data.filter(
          (book) => book.defaultColumn === "ALADIN"
        );
        setOriginalAladinData(aladinBooks);
        setAladinData(aladinBooks);
        setFilteredAladinData(aladinBooks);
      })
      .catch((error) => {
        console.error("에러 발생:", error);
      });
  }, [searchTerms]);

  // 초기 상태 설정
  const [originalAladinData, setOriginalAladinData] = useState([]);
  const [originalKyoboData, setOriginalKyoboData] = useState([]);
  const [originalYes24Data, setOriginalYes24Data] = useState([]);
  // 검색어 관련 상태 설정
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // 각 도서 목록의 현재 상태와 필터된 상태 설정
  const [yes24Data, setYes24Data] = useState([]);
  const [filteredYes24Data, setFilteredYes24Data] = useState([]);

  const [kyoboData, setKyoboData] = useState([]);
  const [filteredKyoboData, setFilteredKyoboData] = useState([]);

  const [aladinData, setAladinData] = useState([]);
  const [filteredAladinData, setFilteredAladinData] = useState([]);
  // 현재 선택된 카테고리 상태 및 업데이트 함수
  const [selectedCategory, setSelectedCategory] = useState("YES24");
  // 현재 페이지 상태 및 업데이트 함수

  // 검색어 초기화 및 페이지 리셋 함수
  const resetSearch = async () => {
    setSearchTerm("");
    setCurrentPage(1);

    try {
      switch (selectedCategory) {
        case "YES24":
          const yes24Books = originalYes24Data.filter(
            (book) => book.defaultColumn === "YES24"
          );
          setYes24Data(yes24Books);
          break;
        case "KYOBO":
          const kyoboBooks = originalKyoboData.filter(
            (book) => book.defaultColumn === "KYOBO"
          );
          setKyoboData(kyoboBooks);
          break;
        case "ALADIN":
          const aladinBooks = originalAladinData.filter(
            (book) => book.defaultColumn === "ALADIN"
          );
          setAladinData(aladinBooks);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error filtering books:", error);
    }
  };

  // 검색어를 입력하고 엔터를 눌렀을 때 검색 실행
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("Enter key pressed. Calling handleSearch...");
      handleSearch(searchTerm);
    }
  };

  //검색 결과 필터링하는 함수
  const filterResults = (data, searchTerm) => {
    return data.filter((item) =>
      item.bookName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleSearch = (term) => {
    try {
      setCurrentPage(1);

      // Filter data based on the selected category
      switch (selectedCategory) {
        case "YES24":
          const filteredYes24Data = originalYes24Data.filter((book) =>
            book.bookName.toLowerCase().includes(term.toLowerCase())
          );
          setYes24Data(filteredYes24Data);
          break;
        case "KYOBO":
          const filteredKyoboData = originalKyoboData.filter((book) =>
            book.bookName.toLowerCase().includes(term.toLowerCase())
          );
          setKyoboData(filteredKyoboData);
          break;
        case "ALADIN":
          const filteredAladinData = originalAladinData.filter((book) =>
            book.bookName.toLowerCase().includes(term.toLowerCase())
          );
          setAladinData(filteredAladinData);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error filtering books:", error);
    }
  };

  // 검색어 또는 페이지 변경 시 도서 목록 필터링 useEffect
  useEffect(() => {
    const filterData = (data, setSearchData) => {
      const filteredData = data.filter((book) =>
        book.bookName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchData(filteredData);
    };

    // 검색어 또는 페이지 변경 시 각 도서 목록 필터링
    filterData(originalYes24Data, setFilteredYes24Data);
    filterData(originalKyoboData, setFilteredKyoboData);
    filterData(originalAladinData, setFilteredAladinData);

    // 페이지 변경 시 현재 페이지로 돌아오도록 설정
    setCurrentPage(1);
  }, [searchTerm, originalYes24Data, originalKyoboData, originalAladinData]);

  // 페이지 변경 시 검색어 유지하기 및 스크롤 위치 유지
  const handlePageChange = (pageNumber, event) => {
    event.preventDefault(); // 브라우저의 기본 동작 방지
    setCurrentPage(pageNumber);
  };

  // 이전 페이지로 이동하는 함수
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 다음 페이지로 이동하는 함수
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // 카테고리 변경 시 호출되는 함수
  const handleCategoryChange = async (categoryId) => {
    setSelectedCategory(categoryId);

    try {
      const response = await axios.get("/detail/books");
      const data = response.data;

      // 도서 정보를 defaultColumn 값으로 분류하여 상태에 추가
      const yes24Books = data.filter((book) => book.defaultColumn === "YES24");
      setYes24Data(yes24Books);

      const kyoboBooks = data.filter((book) => book.defaultColumn === "KYOBO");
      setKyoboData(kyoboBooks);

      const aladinBooks = data.filter(
        (book) => book.defaultColumn === "ALADIN"
      );
      setAladinData(aladinBooks);
    } catch (error) {
      console.error("Error fetching book data:", error);
    }

    setCurrentPage(1); // 페이지 초기화
  };

  //

  // // 도서 목록 가져오는 useEffect
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("/detail/books");
  //       const data = response.data;

  //       // 도서 정보를 defaultColumn 값으로 분류하여 상태에 추가
  //       const yes24Books = data.filter((book) => book.defaultColumn === "YES24");
  //       setOriginalYes24Data(yes24Books);
  //       setYes24Data(yes24Books);
  //       setFilteredYes24Data(yes24Books);

  //       const kyoboBooks = data.filter((book) => book.defaultColumn === "KYOBO");
  //       setOriginalKyoboData(kyoboBooks);
  //       setKyoboData(kyoboBooks);
  //       setFilteredKyoboData(kyoboBooks);

  //       const aladinBooks = data.filter((book) => book.defaultColumn === "ALADIN");
  //       setOriginalAladinData(aladinBooks);
  //       setAladinData(aladinBooks);
  //       setFilteredAladinData(aladinBooks);
  //     } catch (error) {
  //       console.error("Error fetching book data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [searchTerms]);

  useEffect(() => {
    // 페이지가 로드될 때 스크롤 위치를 복원합니다.
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
    }

    return () => {
      // 컴포넌트가 언마운트 되기 전에 스크롤 위치를 저장합니다.
      sessionStorage.setItem("scrollPosition", window.scrollY.toString());
    };
  }, [currentPage]); // 의존성 배열에 currentPage를 추가하여 페이지 번호가 변경될 때마다 이펙트를 실행합니다

  // 페이지당 보여줄 아이템 수
  const itemsPerPage = 10;

  // 현재 페이지에 해당하는 데이터 추출
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const getCurrentData = () => {
    switch (selectedCategory) {
      case "YES24":
        return filteredYes24Data;
      case "KYOBO":
        return filteredKyoboData;
      case "ALADIN":
        return filteredAladinData;
      default:
        return [];
    }
  };
  const currentData = getCurrentData().slice(indexOfFirstItem, indexOfLastItem);
  // 총 페이지 수 계산
  const totalPages = Math.ceil(getCurrentData().length / itemsPerPage);
  // 페이지 번호 배열 생성
  const pageRange = 5; // 좌우에 몇 페이지까지 보여줄 것인지 설정
  const middlePage = Math.ceil(pageRange / 2);

  let startPage, endPage;

  if (totalPages <= pageRange) {
    // 전체 페이지 수가 pageRange 이하인 경우 모든 페이지 보여주기
    startPage = 1;
    endPage = totalPages;
  } else {
    // 전체 페이지 수가 pageRange 이상인 경우 현재 페이지를 중심으로 좌우에 pageRange 페이지만 보여주기
    if (currentPage <= middlePage) {
      startPage = 1;
      endPage = pageRange;
    } else if (currentPage + middlePage - 1 >= totalPages) {
      startPage = totalPages - pageRange + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - middlePage + 1;
      endPage = currentPage + middlePage - 1;
    }
  }

  // 페이지 번호 배열 생성
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <Header />
      <hr />
      <div id="board_container">
        <div id="contents">
          <div id="title">
            <h2>자격증 도서 추천</h2>
          </div>
          <div id="rank">
            {/* YES24 도서 목록의 첫 번째 도서 출력 */}
            {yes24Data.length > 0 && (
              <div className="card-container">
                <Card
                  key={1}
                  style={{
                    width: "18rem",
                    backgroundColor: "#a8cfeb",
                    borderColor: "#7a95a8",
                  }}
                >
                  <Card.Title className="card-category">YES24</Card.Title>
                  <Card.Img
                    variant="top"
                    src={yes24Data[0].imageName}
                    style={{ width: "180px", height: "200px" }}
                  />
                  <Card.Body>
                    <Card.Title>
                      <span>{yes24Data[0].bookName}</span>
                    </Card.Title>
                    <Card.Text className="card-text-custom">
                      {yes24Data[0].bookPrice} <span className="small">원</span>
                    </Card.Text>
                    <a
                      href={yes24Data[0].viewDetail}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button style={{ backgroundColor: "#7a95a8" }}>
                        자세히보기
                      </button>
                    </a>
                  </Card.Body>
                </Card>
              </div>
            )}

            {/* Kyobo 도서 목록의 첫 번째 도서 출력 */}
            {kyoboData.length > 0 && (
              <div className="card-container">
                <Card
                  key={2}
                  style={{
                    width: "18rem",
                    backgroundColor: "#a8cfeb",
                    borderColor: "#7a95a8",
                  }}
                >
                  <Card.Title className="card-category">KYOBO</Card.Title>
                  <Card.Img
                    variant="top"
                    src={kyoboData[0].imageName}
                    style={{ width: "180px", height: "200px" }}
                  />
                  <Card.Body>
                    <Card.Title>
                      <span>{kyoboData[0].bookName}</span>
                    </Card.Title>
                    <Card.Text className="card-text-custom">
                      {kyoboData[0].bookPrice} <span className="small">원</span>
                    </Card.Text>
                    <a
                      href={kyoboData[0].viewDetail}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button style={{ backgroundColor: "#7a95a8" }}>
                        자세히보기
                      </button>
                    </a>
                  </Card.Body>
                </Card>
              </div>
            )}

            {/* Aladin 도서 목록의 첫 번째 도서 출력 */}
            {aladinData.length > 0 && (
              <div className="card-container">
                <Card
                  key={3}
                  style={{
                    width: "18rem",
                    backgroundColor: "#a8cfeb",
                    borderColor: "#7a95a8",
                  }}
                >
                  <Card.Title className="card-category">ALADIN</Card.Title>
                  <Card.Img
                    variant="top"
                    src={aladinData[0].imageName}
                    style={{ width: "180px", height: "200px" }}
                  />
                  <Card.Body>
                    <Card.Title>
                      <span>{aladinData[0].bookName}</span>
                    </Card.Title>
                    <Card.Text className="card-text-custom">
                      {aladinData[0].bookPrice}{" "}
                      <span className="small">원</span>
                    </Card.Text>
                    <a
                      href={aladinData[0].viewDetail}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button style={{ backgroundColor: "#7a95a8" }}>
                        자세히보기
                      </button>
                    </a>
                  </Card.Body>
                </Card>
              </div>
            )}
          </div>
        </div>
        <div id="search">
          <div id="searchbox">
            <input
              type="search"
              placeholder="자격증명을 입력해주세요"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{ height: "45px", verticalAlign: "middle" }}
            />
            <button
              type="button"
              onClick={() => handleSearch(searchTerm)}
              style={{
                backgroundColor: "#7a95a8",
                verticalAlign: "middle",
                marginBottom: "10px",
              }}
            >
              <FontAwesomeIcon id="icon" icon={faMagnifyingGlass} />
            </button>
          </div>
          <button
            type="button"
            onClick={resetSearch}
            style={{ backgroundColor: "#7a95a8" }}
            className="returnBtn"
          >
            <FontAwesomeIcon icon={faRotateLeft} />
          </button>
          <div id="result">
            <div id="re_title">
              <h3>검색결과</h3>
            </div>
            {/* 카테고리 바 */}
            <div id="category-bar">
              <Button
                variant={selectedCategory === "YES24" ? "info" : "outline-info"}
                onClick={() => handleCategoryChange("YES24")}
              >
                YES24
              </Button>{" "}
              <Button
                variant={selectedCategory === "KYOBO" ? "info" : "outline-info"}
                onClick={() => handleCategoryChange("KYOBO")}
              >
                교보문고
              </Button>{" "}
              <Button
                variant={
                  selectedCategory === "ALADIN" ? "info" : "outline-info"
                }
                onClick={() => handleCategoryChange("ALADIN")}
              >
                알라딘
              </Button>{" "}
            </div>
            <hr />
            <div id="re_contents">
              <input type="hidden" value={0} />
              {currentData.length === 0 && searchTerm !== "" ? (
                <div id="no-results-message">
                  <p>검색 결과가 없습니다.</p>
                </div>
              ) : (
                <ul className="your-component">
                  {currentData.map((item) => (
                    <React.Fragment key={item.id}>
                      <li>
                        <a
                          href={item.viewDetail}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={item.imageName}
                            alt="이미지 설명"
                            className="left-image"
                          />
                        </a>
                        <div className="text-container">
                          <h3>{item.bookName}</h3>
                          <p>
                            Price : <span>{item.bookPrice} 원 </span>
                          </p>
                        </div>
                        <a
                          href={item.viewDetail}
                          className="detail-link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          자세히 보기
                        </a>
                      </li>
                      <hr />
                    </React.Fragment>
                  ))}
                </ul>
              )}

              <div id="pagination">
                <ul className="pagination">
                  {/* 이전(prev) 버튼 */}
                  <li>
                    <a onClick={goToPrevPage} href="#">
                      이전
                    </a>
                  </li>

                  {/* 페이지 숫자들 */}
                  {pageNumbers.map((number) => (
                    <li
                      key={number}
                      className={number === currentPage ? "active" : ""}
                    >
                      <a onClick={(e) => handlePageChange(number, e)} href="#">
                        {number}
                      </a>
                    </li>
                  ))}

                  {/* 다음(next) 버튼 */}
                  <li>
                    <a onClick={goToNextPage} href="#">
                      다음
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Quick />
      <Footer />
    </>
  );
};

export default RecommendBookDetail;
