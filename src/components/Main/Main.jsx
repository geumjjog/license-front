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

const Main = () => {
  const [currentIndex, setCurrentIndex] = useState();
  function handleChange(index) {
    setCurrentIndex(index);
  }

  const [listData, setListData] = useState([]);
  useEffect(() => {
      const fetchList = async () => {
          try {
              const responseList = await axios.get('/license/list');
              const responseListData = responseList.data;
              setListData(responseListData);
          } catch (error) {
              console.error('Error fetching info:', error);
          }
      };
    
      fetchList();
    }, []);



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
                <a href="#">
                  <FontAwesomeIcon id="icon" icon={faClipboard} />
                  적성검사
                </a>
              </li>
              <li>
                <a href="#">
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
                <a href="#">
                  <FontAwesomeIcon id="icon" icon={faComments} />
                  자유게시판
                </a>
              </li>
            </ul>
            <div id="notice">
              <div>
                <h3>공지사항</h3>
                <a href="#">
                  더보기
                  <FontAwesomeIcon icon={faChevronRight} />
                </a>
              </div>
              <a href="#">공지사항에서 가져오는 데이터</a>
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
          {listData && listData.map(item => {
                if (item.jmcd === "1320") {
                    return (
                        <Card key={item.jmcd}>
                            <Card.Body>
                                <Card.Title>{item.jmfldnm}</Card.Title>
                                <Card.Text>시험명 | 시험이름</Card.Text>
                                <Card.Text>접수일 | 00.00.00</Card.Text>
                                <Card.Text>시험일 | 00.00.00</Card.Text>
                                <Card.Link href={`/detail/${encodeURIComponent(item.jmfldnm)}`} id="border">
                                    <span>상세보기</span>
                                </Card.Link>
                            </Card.Body>
                        </Card>
                    );
                } else {
                    return null;
                }
            })}
          
          {listData && listData.map(item => {
                if (item.jmcd === "0752") {
                    return (
                        <Card key={item.jmcd}>
                            <Card.Body>
                                <Card.Title>{item.jmfldnm}</Card.Title>
                                <Card.Text>시험명 | 시험이름</Card.Text>
                                <Card.Text>접수일 | 00.00.00</Card.Text>
                                <Card.Text>시험일 | 00.00.00</Card.Text>
                                <Card.Link href={`/detail/${encodeURIComponent(item.jmfldnm)}`} id="border">
                                    <span>상세보기</span>
                                </Card.Link>
                            </Card.Body>
                        </Card>
                    );
                } else {
                    return null;
                }
            })}

            {listData && listData.map(item => {
                if (item.jmcd === "7780") {
                    return (
                        <Card key={item.jmcd}>
                            <Card.Body>
                                <Card.Title>{item.jmfldnm}</Card.Title>
                                <Card.Text>시험명 | 시험이름</Card.Text>
                                <Card.Text>접수일 | 00.00.00</Card.Text>
                                <Card.Text>시험일 | 00.00.00</Card.Text>
                                <Card.Link href={`/detail/${encodeURIComponent(item.jmfldnm)}`} id="border">
                                    <span>상세보기</span>
                                </Card.Link>
                            </Card.Body>
                        </Card>
                    );
                } else {
                    return null;
                }
            })}

            {listData && listData.map(item => {
                if (item.jmcd === "7798") {
                    return (
                        <Card key={item.jmcd}>
                            <Card.Body>
                                <Card.Title>{item.jmfldnm}</Card.Title>
                                <Card.Text>시험명 | 시험이름</Card.Text>
                                <Card.Text>접수일 | 00.00.00</Card.Text>
                                <Card.Text>시험일 | 00.00.00</Card.Text>
                                <Card.Link href={`/detail/${encodeURIComponent(item.jmfldnm)}`} id="border">
                                    <span>상세보기</span>
                                </Card.Link>
                            </Card.Body>
                        </Card>
                    );
                } else {
                    return null;
                }
            })}

          </div>

          <div id="section3">

            {listData && listData.map(item => {
                if (item.jmcd === "7795") {
                    return (
                        <Card key={item.jmcd}>
                            <Card.Body>
                                <Card.Title>{item.jmfldnm}</Card.Title>
                                <Card.Text>시험명 | 시험이름</Card.Text>
                                <Card.Text>접수일 | 00.00.00</Card.Text>
                                <Card.Text>시험일 | 00.00.00</Card.Text>
                                <Card.Link href={`/detail/${encodeURIComponent(item.jmfldnm)}`} id="border">
                                    <span>상세보기</span>
                                </Card.Link>
                            </Card.Body>
                        </Card>
                    );
                } else {
                    return null;
                }
            })}

            {listData && listData.map(item => {
                if (item.jmcd === "2301") {
                    return (
                        <Card key={item.jmcd}>
                            <Card.Body>
                                <Card.Title>{item.jmfldnm}</Card.Title>
                                <Card.Text>시험명 | 시험이름</Card.Text>
                                <Card.Text>접수일 | 00.00.00</Card.Text>
                                <Card.Text>시험일 | 00.00.00</Card.Text>
                                <Card.Link href={`/detail/${encodeURIComponent(item.jmfldnm)}`} id="border">
                                    <span>상세보기</span>
                                </Card.Link>
                            </Card.Body>
                        </Card>
                    );
                } else {
                    return null;
                }
            })}

            {listData && listData.map(item => {
                if (item.jmcd === "0622") {
                    return (
                        <Card key={item.jmcd}>
                            <Card.Body>
                                <Card.Title>{item.jmfldnm}</Card.Title>
                                <Card.Text>시험명 | 시험이름</Card.Text>
                                <Card.Text>접수일 | 00.00.00</Card.Text>
                                <Card.Text>시험일 | 00.00.00</Card.Text>
                                <Card.Link href={`/detail/${encodeURIComponent(item.jmfldnm)}`} id="border">
                                    <span>상세보기</span>
                                </Card.Link>
                            </Card.Body>
                        </Card>
                    );
                } else {
                    return null;
                }
            })}

            {listData && listData.map(item => {
                if (item.jmcd === "1240") {
                    return (
                        <Card key={item.jmcd}>
                            <Card.Body>
                                <Card.Title>{item.jmfldnm}</Card.Title>
                                <Card.Text>시험명 | 시험이름</Card.Text>
                                <Card.Text>접수일 | 00.00.00</Card.Text>
                                <Card.Text>시험일 | 00.00.00</Card.Text>
                                <Card.Link href={`/detail/${encodeURIComponent(item.jmfldnm)}`} id="border">
                                    <span>상세보기</span>
                                </Card.Link>
                            </Card.Body>
                        </Card>
                    );
                } else {
                    return null;
                }
            })}
          </div>
        </div>
      </div>
      <div id="banner1">
        <div id="container">
          <Link to="/book">
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
