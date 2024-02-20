import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import imageData from "./data";
import "./Main.css";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faClipboard,
  faBookmark,
  faIdCard,
  faComments,
  faChevronRight,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import Quick from "../Quick/Quick";

const renderSlides = imageData.map((image, index) => (
  <div
    key={index}
    onClick={() => {
      window.location.href = image.href;
    }}
    style={{ cursor: "pointer" }}
  >
    <img src={image.src} alt={image.alt} />
  </div>
));

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

const Main = () => {
  const [currentIndex, setCurrentIndex] = useState();
  function handleChange(index) {
    setCurrentIndex(index);
  }

  const [dateList, setDateList] = useState([]);
  useEffect(() => {
    const fetchDate = async () => {
      try {
        const responseList = await axios.get("/license/date");
        const responseDateList = responseList.data;
        setDateList(responseDateList);
      } catch (error) {
        console.error("Error fetching info:", error);
      }
    };

    fetchDate();
  }, []);

  const [listData, setListData] = useState([]);
  useEffect(() => {
    const fetchList = async () => {
      try {
        const responseList = await axios.get("/license/list");
        const responseListData = responseList.data;
        setListData(responseListData);
        console.log(responseListData);
      } catch (error) {
        console.error("Error fetching info:", error);
      }
    };

    fetchList();
  }, []);

  const currentDate = new Date();

  const [boardList, setBoardList] = useState([]);
  const [selectedButton, setSelectedButton] = useState("notice");
  useEffect(() => {
    const fetchBoardList = async () => {
      try {
        const response = await axios.get('/board/boardList');
        setBoardList(response.data);
      } catch (error) {
        console.error('Error fetching board list:', error);
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
  const noticeData = filteredDatas.filter((board) => board.defaultValue === "notice");

  return (
    <>
      <div id="main1">
        <div id="container">
          <div className="flex justify-center items-center carousel">
            <Carousel
              showStatus={false}
              showIndicators={false}
              showArrows={true}
              autoPlay={true}
              infiniteLoop={true}
              showThumbs={false}
              selectedItem={imageData[currentIndex]}
              onChange={handleChange}
            >
              {renderSlides}
            </Carousel>
          </div>

          <div id="serve_menu">
            <ul>
              <li>
                <Link to="/calendar">
                  <FontAwesomeIcon id="icon" icon={faCalendarDays} />
                  자격증일정
                </Link>
              </li>
              <li>
                <a href="/mbti">
                  <FontAwesomeIcon id="icon" icon={faClipboard} />
                  적성검사
                </a>
              </li>
              <li>
                <a href="/license">
                  <FontAwesomeIcon id="icon" icon={faIdCard} />
                  자격증정보
                </a>
              </li>
              <li>
                <Link to="/support">
                  <FontAwesomeIcon id="icon" icon={faBookmark} />
                  지원제도
                </Link>
              </li>
              <li>
                <a href="/community">
                  <FontAwesomeIcon id="icon" icon={faComments} />
                  자유게시판
                </a>
              </li>
            </ul>
            <div id="notice">
              <div>
                <h3>공지사항</h3>
                <a href="/community">
                  더보기
                  <FontAwesomeIcon icon={faChevronRight} />
                </a>
              </div>
              {noticeData.map((board) => (
            <React.Fragment key={board.boardSeq}>
              <li className="list_container">
                <div className="text-container">
                  <Link to={`/BoardView/${board.boardSeq}`}>
                    <span>{board.boardSeq}</span>
                    <span style={{ fontSize: '15px'}}>{board.boardTitle}</span>
                  </Link>
                </div>
              </li>
              <hr />
            </React.Fragment>
          ))}
            </div>
          </div>
        </div>
      </div>
      <div id="banner1">
        <div id="container">
          <Link to="/test">
            <p>
              나에게 맞는 자격증은 뭐가 있을까? <span>CLICK</span>
            </p>
          </Link>
        </div>
      </div>
      <div id="main2">
        <div id="container">
          <div id="section1">
            <h1>자격증 맛보기</h1>
            <div id="morelicen">
              <Link to="/license">
                자격증 더보기
                <FontAwesomeIcon id="icon" icon={faAngleRight} />
              </Link>
            </div>
          </div>
          <div id="section2">
            {listData
              .filter((item) => item.jmcd === "1320")
              .map((item, index) => (
                <div key={index}>
                  <Card key={item.jmcd}>
                    {dateList
                      .filter(
                        (date) =>
                          date.description.includes(item.seriesnm) &&
                          new Date(date.docregstartdt) > currentDate
                      )
                      .sort(
                        (a, b) =>
                          new Date(a.docregstartdt) - new Date(b.docregstartdt)
                      )
                      .slice(0, 1) // 가장 가까운 데이터 하나만 가져오기
                      .map((date, index) => (
                        <div key={index}>
                          <Card.Body>
                            <Card.Title>{item.jmfldnm}</Card.Title>
                            <Card.Text>시험명 | {date.description}</Card.Text>
                            <Card.Text>
                              접수일 | {formatDate(date.docregstartdt)} ~{" "}
                              {formatDate(date.docregenddt)}
                            </Card.Text>
                            <Card.Text>
                              시험일 | {formatDate(date.docexamdt)}
                            </Card.Text>
                            <Card.Link
                              href={`/detail/${encodeURIComponent(
                                item.jmfldnm
                              )}`}
                              id="border"
                            >
                              <span>상세보기</span>
                            </Card.Link>
                          </Card.Body>
                        </div>
                      ))}
                  </Card>
                </div>
              ))}

            {listData
              .filter((item) => item.jmcd === "0752")
              .map((item, index) => (
                <div key={index}>
                  <Card key={item.jmcd}>
                    {dateList
                      .filter(
                        (date) =>
                          date.description.includes(item.seriesnm) &&
                          new Date(date.docregstartdt) > currentDate
                      )
                      .sort(
                        (a, b) =>
                          new Date(a.docregstartdt) - new Date(b.docregstartdt)
                      )
                      .slice(0, 1) // 가장 가까운 데이터 하나만 가져오기
                      .map((date, index) => (
                        <div key={index}>
                          <Card.Body>
                            <Card.Title>{item.jmfldnm}</Card.Title>
                            <Card.Text>시험명 | {date.description}</Card.Text>
                            <Card.Text>
                              접수일 | {formatDate(date.docregstartdt)} ~{" "}
                              {formatDate(date.docregenddt)}
                            </Card.Text>
                            <Card.Text>
                              시험일 | {formatDate(date.docexamdt)}
                            </Card.Text>
                            <Card.Link
                              href={`/detail/${encodeURIComponent(
                                item.jmfldnm
                              )}`}
                              id="border"
                            >
                              <span>상세보기</span>
                            </Card.Link>
                          </Card.Body>
                        </div>
                      ))}
                  </Card>
                </div>
              ))}

            {listData
              .filter((item) => item.jmcd === "7780")
              .map((item, index) => (
                <div key={index}>
                  <Card key={item.jmcd}>
                    {dateList
                      .filter(
                        (date) =>
                          date.description.includes(item.seriesnm) &&
                          new Date(date.docregstartdt) > currentDate
                      )
                      .sort(
                        (a, b) =>
                          new Date(a.docregstartdt) - new Date(b.docregstartdt)
                      )
                      .slice(0, 1) // 가장 가까운 데이터 하나만 가져오기
                      .map((date, index) => (
                        <div key={index}>
                          <Card.Body>
                            <Card.Title>{item.jmfldnm}</Card.Title>
                            <Card.Text>시험명 | {date.description}</Card.Text>
                            <Card.Text>
                              접수일 | {formatDate(date.docregstartdt)} ~{" "}
                              {formatDate(date.docregenddt)}
                            </Card.Text>
                            <Card.Text>
                              시험일 | {formatDate(date.docexamdt)}
                            </Card.Text>
                            <Card.Link
                              href={`/detail/${encodeURIComponent(
                                item.jmfldnm
                              )}`}
                              id="border"
                            >
                              <span>상세보기</span>
                            </Card.Link>
                          </Card.Body>
                        </div>
                      ))}
                  </Card>
                </div>
              ))}
          </div>

          <div id="section3">
            {listData
              .filter((item) => item.jmcd === "2974")
              .map((item, index) => (
                <div key={index}>
                  <Card key={item.jmcd}>
                    {dateList
                      .filter(
                        (date) =>
                          date.description.includes(item.seriesnm) &&
                          new Date(date.docregstartdt) > currentDate
                      )
                      .sort(
                        (a, b) =>
                          new Date(a.docregstartdt) - new Date(b.docregstartdt)
                      )
                      .slice(0, 1) // 가장 가까운 데이터 하나만 가져오기
                      .map((date, index) => (
                        <div key={index}>
                          <Card.Body>
                            <Card.Title>{item.jmfldnm}</Card.Title>
                            <Card.Text>시험명 | {date.description}</Card.Text>
                            <Card.Text>
                              접수일 | {formatDate(date.docregstartdt)} ~{" "}
                              {formatDate(date.docregenddt)}
                            </Card.Text>
                            <Card.Text>
                              시험일 | {formatDate(date.docexamdt)}
                            </Card.Text>
                            <Card.Link
                              href={`/detail/${encodeURIComponent(
                                item.jmfldnm
                              )}`}
                              id="border"
                            >
                              <span>상세보기</span>
                            </Card.Link>
                          </Card.Body>
                        </div>
                      ))}
                  </Card>
                </div>
              ))}

            {listData
              .filter((item) => item.jmcd === "7795")
              .map((item, index) => (
                <div key={index}>
                  <Card key={item.jmcd}>
                    {dateList
                      .filter(
                        (date) =>
                          date.description.includes(item.seriesnm) &&
                          new Date(date.docregstartdt) > currentDate
                      )
                      .sort(
                        (a, b) =>
                          new Date(a.docregstartdt) - new Date(b.docregstartdt)
                      )
                      .slice(0, 1) // 가장 가까운 데이터 하나만 가져오기
                      .map((date, index) => (
                        <div key={index}>
                          <Card.Body>
                            <Card.Title>{item.jmfldnm}</Card.Title>
                            <Card.Text>시험명 | {date.description}</Card.Text>
                            <Card.Text>
                              접수일 | {formatDate(date.docregstartdt)} ~{" "}
                              {formatDate(date.docregenddt)}
                            </Card.Text>
                            <Card.Text>
                              시험일 | {formatDate(date.docexamdt)}
                            </Card.Text>
                            <Card.Link
                              href={`/detail/${encodeURIComponent(
                                item.jmfldnm
                              )}`}
                              id="border"
                            >
                              <span>상세보기</span>
                            </Card.Link>
                          </Card.Body>
                        </div>
                      ))}
                  </Card>
                </div>
              ))}

            {listData
              .filter((item) => item.jmcd === "1240")
              .map((item, index) => (
                <div key={index}>
                  <Card key={item.jmcd}>
                    {dateList
                      .filter(
                        (date) =>
                          date.description.includes(item.seriesnm) &&
                          new Date(date.docregstartdt) > currentDate
                      )
                      .sort(
                        (a, b) =>
                          new Date(a.docregstartdt) - new Date(b.docregstartdt)
                      )
                      .slice(0, 1) // 가장 가까운 데이터 하나만 가져오기
                      .map((date, index) => (
                        <div key={index}>
                          <Card.Body>
                            <Card.Title>{item.jmfldnm}</Card.Title>
                            <Card.Text>시험명 | {date.description}</Card.Text>
                            <Card.Text>
                              접수일 | {formatDate(date.docregstartdt)} ~{" "}
                              {formatDate(date.docregenddt)}
                            </Card.Text>
                            <Card.Text>
                              시험일 | {formatDate(date.docexamdt)}
                            </Card.Text>
                            <Card.Link
                              href={`/detail/${encodeURIComponent(
                                item.jmfldnm
                              )}`}
                              id="border"
                            >
                              <span>상세보기</span>
                            </Card.Link>
                          </Card.Body>
                        </div>
                      ))}
                  </Card>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div id="banner1">
        <div id="container">
          <Link to="/RecommendBook">
            <p>
              문제집 찾기 <span>CLICK</span>
            </p>
          </Link>
        </div>
      </div>
      <Quick />
    </>
  );
};

export default Main;
