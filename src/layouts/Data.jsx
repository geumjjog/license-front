import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/Data.css";

const Data = () => {
  const [rankData, setRankData] = useState([]);
  useEffect(() => {
    const fetchrank = async () => {
      try {
        const responseRank = await axios.get("/license/rank");
        const responseRankData = responseRank.data;
        setRankData(responseRankData);
      } catch (error) {
        console.error("Error fetching info:", error);
      }
    };

    fetchrank();
  }, []);

  const firstData = rankData
    .filter((item) => item.grdnm === "기사")
    .sort((a, b) => b.examrecptcnt - a.examrecptcnt)
    .slice(0, 10)
    .map((item, index) => ({ ...item, key: `first-${index}` }));

  const secondData = rankData
    .filter((item) => item.grdnm === "기능사")
    .sort((a, b) => b.examrecptcnt - a.examrecptcnt)
    .slice(0, 10)
    .map((item, index) => ({ ...item, key: `second-${index}` }));

  const thirdData = rankData
    .filter((item) => item.grdnm === "산업기사")
    .sort((a, b) => b.examrecptcnt - a.examrecptcnt)
    .slice(0, 10)
    .map((item, index) => ({ ...item, key: `third-${index}` }));
  return (
    <>
      <hr />
      <div className="datapage">
        <div className="data-title">
          <h1>자격증 접수 순위</h1>
        </div>
        <div className="data">
          <div className="data-box">
            <div className="data-name">
              <h3>기사 자격증</h3>
            </div>
            {firstData.map((item, index) => (
              <ul key={item.key}>
                <li>
                  {index + 1}
                  <Link to={`/detail/${encodeURIComponent(item.jmfldnm)}`}>
                    {item.jmfldnm}
                  </Link>
                </li>
              </ul>
            ))}
          </div>

          <div className="data-box">
            <div className="data-name">
              <h3>기능사 자격증</h3>
            </div>
            {secondData.map((item, index) => (
              <ul key={item.key}>
                <li>
                  {index + 1}
                  <Link to={`/detail/${encodeURIComponent(item.jmfldnm)}`}>
                    {item.jmfldnm}
                  </Link>
                </li>
              </ul>
            ))}
          </div>

          <div className="data-box">
            <div className="data-name">
              <h3>산업기사 자격증</h3>
            </div>
            {thirdData.map((item, index) => (
              <ul key={item.key}>
                <li>
                  {index + 1}
                  <Link to={`/detail/${encodeURIComponent(item.jmfldnm)}`}>
                    {item.jmfldnm}
                  </Link>
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Data;
