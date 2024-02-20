import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIdCard,
  faClipboard,
  faBookOpen,
  faFileZipper,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import "./Quick.css";

const Quick = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className={`quick-menu ${isScrolled ? "scrolled" : ""}`}>
        <div className="quickmenu">
          <ul>
            <li>
              <Link to="/license">
                <FontAwesomeIcon id="icon" icon={faIdCard} />
                자격증정보
              </Link>
            </li>
            <li>
              <a href="/mbti">
                <FontAwesomeIcon id="icon" icon={faClipboard} />
                성향검사
              </a>
            </li>
            <li>
              <Link to="/workbook">
                <FontAwesomeIcon id="icon" icon={faFileZipper} />
                기출문제
              </Link>
            </li>
            <li>
              <Link to="/RecommendBook">
                <FontAwesomeIcon id="icon" icon={faBookOpen} />
                교재추천
              </Link>
            </li>
            <li>
              <button onClick={scrollToTop}>
                <FontAwesomeIcon id="icon" icon={faArrowUp} />맨 위로
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Quick;
