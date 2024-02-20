import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Dropdown from "./dropdown";
import "../css/dropdown.css";
import "../css/support.css";
import axios from "axios";
import NES from "../img/국민취업제도.jpeg";
import NTQ from "../img/국가기술자격시험.jpeg";
import NTLC from "../img/국민내일배움카드.jpeg";
import YHDSA from "../img/청년주택드림청약통장.jpeg";
import JFYSF from "../img/일자리채움청년지원금.png";
import Quick from "../components/Quick/Quick";

const Support = () => {
  const [dropdownVisibility1, setDropdownVisibility1] = useState(false);
  const [dropdownVisibility2, setDropdownVisibility2] = useState(false);
  const [dropdownVisibility3, setDropdownVisibility3] = useState(false);
  const [dropdownVisibility4, setDropdownVisibility4] = useState(false);
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const [data3, setData3] = useState(null);
  const [data4, setData4] = useState(null);
  const [data5, setData5] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/support");
        setData1(response.data.section1);
        setData2(response.data.section2);
        setData3(response.data.section3);
        setData4(response.data.section4);
        setData5(response.data.section5);
      } catch (error) {
        console.error("Error : ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <hr className="hr" />
      <div id="support-container">
        <div id="category">
          <Tabs
            defaultActiveKey="국민취업지원제도"
            id="justify-tab-example"
            className="mb-3"
            justify
          >
            <Tab eventKey="국민취업지원제도" title="국민취업지원제도">
              <div className="img-container">
                <a
                  href="https://www.kua.go.kr/uaptm010/selectMain.do"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={NES} alt="국민취업지원제도" />
                </a>
              </div>
              <button
                id="down_btn"
                onClick={() => setDropdownVisibility1(!dropdownVisibility1)}
              >
                {dropdownVisibility1 ? "정책요약 ▲" : "정책요약 ▼"}
              </button>
              <Dropdown visibility={dropdownVisibility1}>
                <ul>
                  <li>
                    <span>{data1.li_title0} : </span>
                    {data1.li_cont0}
                  </li>
                  <li>
                    <span>{data1.li_title1} : </span>
                    {data1.li_cont1}
                  </li>
                  <li>
                    <span>{data1.li_title2} : </span>
                    {data1.li_cont2}
                  </li>
                  <li>
                    <span>{data1.li_title3} : </span>
                    {data1.li_cont3}
                  </li>
                  <li>
                    <span>{data1.li_title4} : </span>
                    {data1.li_cont4}
                  </li>
                  <li>
                    <span>{data1.li_title5} : </span>
                    {data1.li_cont5}
                  </li>
                  <li>
                    <span>{data1.li_title6} : </span>
                    {data1.li_cont6}
                  </li>
                </ul>
              </Dropdown>
              <button
                id="down_btn"
                onClick={() => setDropdownVisibility2(!dropdownVisibility2)}
              >
                {dropdownVisibility2 ? "신청자격 ▲" : "신청자격 ▼"}
              </button>
              <Dropdown visibility={dropdownVisibility2}>
                <ul>
                  <li>
                    <span>{data1.li_title7} : </span>
                    {data1.li_cont7}
                  </li>
                  <li>
                    <span>{data1.li_title8} : </span>
                    {data1.li_cont8}
                  </li>
                  <li>
                    <span>{data1.li_title9} : </span>
                    {data1.li_cont9}
                  </li>
                  <li>
                    <span>{data1.li_title10} : </span>
                    {data1.li_cont10}
                  </li>
                  <li>
                    <span>{data1.li_title11} : </span>
                    {data1.li_cont11}
                  </li>
                  <li>
                    <span>{data1.li_title12} : </span>
                    {data1.li_cont12}
                  </li>
                  <li>
                    <span>{data1.li_title13} : </span>
                    {data1.li_cont13}
                  </li>
                  <li>
                    <span>{data1.li_title14} : </span>
                    {data1.li_cont14}
                  </li>
                </ul>
              </Dropdown>
              <button
                id="down_btn"
                onClick={() => setDropdownVisibility3(!dropdownVisibility3)}
              >
                {dropdownVisibility3 ? "신청방법 ▲" : "신청방법 ▼"}
              </button>
              <Dropdown visibility={dropdownVisibility3}>
                <ul>
                  <li>
                    <span>{data1.li_title15} : </span>
                    {data1.li_cont15}
                  </li>
                  <li>
                    <span>{data1.li_title16} : </span>
                    {data1.li_cont16}
                  </li>
                  <li>
                    <span>{data1.li_title17} : </span>
                    {data1.li_cont17}
                  </li>
                  <li>
                    <span>{data1.li_title18} : </span>
                    {data1.li_cont18}
                  </li>
                </ul>
              </Dropdown>
              <button
                id="down_btn"
                onClick={() => setDropdownVisibility4(!dropdownVisibility4)}
              >
                {dropdownVisibility4 ? "기타 ▲" : "기타 ▼"}
              </button>
              <Dropdown visibility={dropdownVisibility4}>
                <ul>
                  <li>
                    <span>{data1.li_title19} : </span>
                    {data1.li_cont19}
                  </li>
                  <li>
                    <span>{data1.li_title20} : </span>
                    {data1.li_cont20}
                  </li>
                  <li>
                    <span>{data1.li_title21} : </span>
                    {data1.li_cont21}
                  </li>
                  <li>
                    <span>{data1.li_title22} : </span>
                    {data1.li_cont22}
                  </li>
                  <li>
                    <span>{data1.li_title23} : </span>
                    {data1.li_cont23}
                  </li>
                  <li>
                    <span>{data1.li_title24} : </span>
                    {data1.li_cont24}
                  </li>
                </ul>
              </Dropdown>
            </Tab>
            <Tab
              eventKey="청년도전 지원사업"
              title="국가기술자격시험 응시료 지원"
            >
              <div className="img-container">
                <a
                  href="https://www.q-net.or.kr/man001.do?gSite=Q"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={NTQ} alt="국가기술자격시험" />
                </a>
              </div>
              <button
                id="down_btn"
                onClick={() => setDropdownVisibility1(!dropdownVisibility1)}
              >
                {dropdownVisibility1 ? "정책요약 ▲" : "정책요약 ▼"}
              </button>
              <Dropdown visibility={dropdownVisibility1}>
                <ul>
                  <li>
                    <span>{data2.li_title0} : </span>
                    {data2.li_cont0}
                  </li>
                  <li>
                    <span>{data2.li_title1} : </span>
                    {data2.li_cont1}
                  </li>
                  <li>
                    <span>{data2.li_title2} : </span>
                    {data2.li_cont2}
                  </li>
                  <li>
                    <span>{data2.li_title3} : </span>
                    {data2.li_cont3}
                  </li>
                  <li>
                    <span>{data2.li_title4} : </span>
                    {data2.li_cont4}
                  </li>
                  <li>
                    <span>{data2.li_title5} : </span>
                    {data2.li_cont5}
                  </li>
                  <li>
                    <span>{data2.li_title6} : </span>
                    {data2.li_cont6}
                  </li>
                </ul>
              </Dropdown>
              <button
                id="down_btn"
                onClick={() => setDropdownVisibility2(!dropdownVisibility2)}
              >
                {dropdownVisibility2 ? "신청자격 ▲" : "신청자격 ▼"}
              </button>
              <Dropdown visibility={dropdownVisibility2}>
                <ul>
                  <li>
                    <span>{data2.li_title7} : </span>
                    {data2.li_cont7}
                  </li>
                  <li>
                    <span>{data2.li_title8} : </span>
                    {data2.li_cont8}
                  </li>
                  <li>
                    <span>{data2.li_title9} : </span>
                    {data2.li_cont9}
                  </li>
                  <li>
                    <span>{data2.li_title10} : </span>
                    {data2.li_cont10}
                  </li>
                  <li>
                    <span>{data2.li_title11} : </span>
                    {data2.li_cont11}
                  </li>
                  <li>
                    <span>{data2.li_title12} : </span>
                    {data2.li_cont12}
                  </li>
                  <li>
                    <span>{data2.li_title13} : </span>
                    {data2.li_cont13}
                  </li>
                  <li>
                    <span>{data2.li_title14} : </span>
                    {data2.li_cont14}
                  </li>
                </ul>
              </Dropdown>
              <button
                id="down_btn"
                onClick={() => setDropdownVisibility3(!dropdownVisibility3)}
              >
                {dropdownVisibility3 ? "신청방법 ▲" : "신청방법 ▼"}
              </button>
              <Dropdown visibility={dropdownVisibility3}>
                <ul>
                  <li>
                    <span>{data2.li_title15} : </span>
                    {data2.li_cont15}
                  </li>
                  <li>
                    <span>{data2.li_title16} : </span>
                    {data2.li_cont16}
                  </li>
                  <li>
                    <span>{data2.li_title17} : </span>
                    {data2.li_cont17}
                  </li>
                  <li>
                    <span>{data2.li_title18} : </span>
                    {data2.li_cont18}
                  </li>
                </ul>
              </Dropdown>
              <button
                id="down_btn"
                onClick={() => setDropdownVisibility4(!dropdownVisibility4)}
              >
                {dropdownVisibility4 ? "기타 ▲" : "기타 ▼"}
              </button>
              <Dropdown visibility={dropdownVisibility4}>
                <ul>
                  <li>
                    <span>{data2.li_title19} : </span>
                    {data2.li_cont19}
                  </li>
                  <li>
                    <span>{data2.li_title20} : </span>
                    {data2.li_cont20}
                  </li>
                  <li>
                    <span>{data2.li_title21} : </span>
                    {data2.li_cont21}
                  </li>
                  <li>
                    <span>{data2.li_title22} : </span>
                    {data2.li_cont22}
                  </li>
                  <li>
                    <span>{data2.li_title23} : </span>
                    {data2.li_cont23}
                  </li>
                  <li>
                    <span>{data2.li_title24} : </span>
                    {data2.li_cont24}
                  </li>
                </ul>
              </Dropdown>
            </Tab>
            <Tab eventKey="청년동행카드" title="국민내일배움카드">
              <div className="img-container">
                <a
                  href="https://www.hrd.go.kr/hrdp/gi/pgiao/PGIAO0302D.do?svcMngnId=13535&svno=P0165&pageIndex=1&lawordFormatSeqNo=&gover=1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={NTLC} alt="국가기술자격시험" />
                </a>
              </div>
              <button
                id="down_btn"
                onClick={() => setDropdownVisibility1(!dropdownVisibility1)}
              >
                {dropdownVisibility1 ? "정책요약 ▲" : "정책요약 ▼"}
              </button>
              <Dropdown visibility={dropdownVisibility1}>
                <ul>
                  <li>
                    <span>{data3.li_title0} : </span>
                    {data3.li_cont0}
                  </li>
                  <li>
                    <span>{data3.li_title1} : </span>
                    {data3.li_cont1}
                  </li>
                  <li>
                    <span>{data3.li_title2} : </span>
                    {data3.li_cont2}
                  </li>
                  <li>
                    <span>{data3.li_title3} : </span>
                    {data3.li_cont3}
                  </li>
                  <li>
                    <span>{data3.li_title4} : </span>
                    {data3.li_cont4}
                  </li>
                  <li>
                    <span>{data3.li_title5} : </span>
                    {data3.li_cont5}
                  </li>
                  <li>
                    <span>{data3.li_title6} : </span>
                    {data3.li_cont6}
                  </li>
                </ul>
              </Dropdown>
              <button
                id="down_btn"
                onClick={() => setDropdownVisibility2(!dropdownVisibility2)}
              >
                {dropdownVisibility2 ? "신청자격 ▲" : "신청자격 ▼"}
              </button>
              <Dropdown visibility={dropdownVisibility2}>
                <ul>
                  <li>
                    <span>{data3.li_title7} : </span>
                    {data3.li_cont7}
                  </li>
                  <li>
                    <span>{data3.li_title8} : </span>
                    {data3.li_cont8}
                  </li>
                  <li>
                    <span>{data3.li_title9} : </span>
                    {data3.li_cont9}
                  </li>
                  <li>
                    <span>{data3.li_title10} : </span>
                    {data3.li_cont10}
                  </li>
                  <li>
                    <span>{data3.li_title11} : </span>
                    {data3.li_cont11}
                  </li>
                  <li>
                    <span>{data3.li_title12} : </span>
                    {data3.li_cont12}
                  </li>
                  <li>
                    <span>{data3.li_title13} : </span>
                    {data3.li_cont13}
                  </li>
                  <li>
                    <span>{data3.li_title14} : </span>
                    {data3.li_cont14}
                  </li>
                </ul>
              </Dropdown>
              <button
                id="down_btn"
                onClick={() => setDropdownVisibility3(!dropdownVisibility3)}
              >
                {dropdownVisibility3 ? "신청방법 ▲" : "신청방법 ▼"}
              </button>
              <Dropdown visibility={dropdownVisibility3}>
                <ul>
                  <li>
                    <span>{data3.li_title15} : </span>
                    {data3.li_cont15}
                  </li>
                  <li>
                    <span>{data3.li_title16} : </span>
                    {data3.li_cont16}
                  </li>
                  <li>
                    <span>{data3.li_title17} : </span>
                    {data3.li_cont17}
                  </li>
                  <li>
                    <span>{data3.li_title18} : </span>
                    {data3.li_cont18}
                  </li>
                </ul>
              </Dropdown>
              <button
                id="down_btn"
                onClick={() => setDropdownVisibility4(!dropdownVisibility4)}
              >
                {dropdownVisibility4 ? "기타 ▲" : "기타 ▼"}
              </button>
              <Dropdown visibility={dropdownVisibility4}>
                <ul>
                  <li>
                    <span>{data3.li_title19} : </span>
                    {data3.li_cont19}
                  </li>
                  <li>
                    <span>{data3.li_title20} : </span>
                    {data3.li_cont20}
                  </li>
                  <li>
                    <span>{data3.li_title21} : </span>
                    {data3.li_cont21}
                  </li>
                  <li>
                    <span>{data3.li_title22} : </span>
                    {data3.li_cont22}
                  </li>
                  <li>
                    <span>{data3.li_title23} : </span>
                    {data3.li_cont23}
                  </li>
                  <li>
                    <span>{data3.li_title24} : </span>
                    {data3.li_cont24}
                  </li>
                </ul>
              </Dropdown>
            </Tab>
            <Tab eventKey="청년추가" title="청년주택드림청약통장">
              <div className="img-container">
                <a
                  href="https://www.jobaba.net/sprtPlcy/info/view2020.do?seq=12025&cntType=O"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={YHDSA} alt="청년주택드림청약통장" />
                </a>
              </div>
              <button
                id="down_btn"
                onClick={() => setDropdownVisibility1(!dropdownVisibility1)}
              >
                {dropdownVisibility1 ? "정책요약 ▲" : "정책요약 ▼"}
              </button>
              <Dropdown visibility={dropdownVisibility1}>
                <ul>
                  <li>
                    <span>{data4.li_title0} : </span>
                    {data4.li_cont0}
                  </li>
                  <li>
                    <span>{data4.li_title1} : </span>
                    {data4.li_cont1}
                  </li>
                  <li>
                    <span>{data4.li_title2} : </span>
                    {data4.li_cont2}
                  </li>
                  <li>
                    <span>{data4.li_title3} : </span>
                    {data4.li_cont3}
                  </li>
                  <li>
                    <span>{data4.li_title4} : </span>
                    {data4.li_cont4}
                  </li>
                  <li>
                    <span>{data4.li_title5} : </span>
                    {data4.li_cont5}
                  </li>
                  <li>
                    <span>{data4.li_title6} : </span>
                    {data4.li_cont6}
                  </li>
                </ul>
              </Dropdown>
              <button
                id="down_btn"
                onClick={() => setDropdownVisibility2(!dropdownVisibility2)}
              >
                {dropdownVisibility2 ? "신청자격 ▲" : "신청자격 ▼"}
              </button>
              <Dropdown visibility={dropdownVisibility2}>
                <ul>
                  <li>
                    <span>{data4.li_title7} : </span>
                    {data4.li_cont7}
                  </li>
                  <li>
                    <span>{data4.li_title8} : </span>
                    {data4.li_cont8}
                  </li>
                  <li>
                    <span>{data4.li_title9} : </span>
                    {data4.li_cont9}
                  </li>
                  <li>
                    <span>{data4.li_title10} : </span>
                    {data4.li_cont10}
                  </li>
                  <li>
                    <span>{data4.li_title11} : </span>
                    {data4.li_cont11}
                  </li>
                  <li>
                    <span>{data4.li_title12} : </span>
                    {data4.li_cont12}
                  </li>
                  <li>
                    <span>{data4.li_title13} : </span>
                    {data4.li_cont13}
                  </li>
                  <li>
                    <span>{data4.li_title14} : </span>
                    {data4.li_cont14}
                  </li>
                </ul>
              </Dropdown>
              <button
                id="down_btn"
                onClick={() => setDropdownVisibility3(!dropdownVisibility3)}
              >
                {dropdownVisibility3 ? "신청방법 ▲" : "신청방법 ▼"}
              </button>
              <Dropdown visibility={dropdownVisibility3}>
                <ul>
                  <li>
                    <span>{data4.li_title15} : </span>
                    {data4.li_cont15}
                  </li>
                  <li>
                    <span>{data4.li_title16} : </span>
                    {data4.li_cont16}
                  </li>
                  <li>
                    <span>{data4.li_title17} : </span>
                    {data4.li_cont17}
                  </li>
                  <li>
                    <span>{data4.li_title18} : </span>
                    {data4.li_cont18}
                  </li>
                </ul>
              </Dropdown>
              <button
                id="down_btn"
                onClick={() => setDropdownVisibility4(!dropdownVisibility4)}
              >
                {dropdownVisibility4 ? "기타 ▲" : "기타 ▼"}
              </button>
              <Dropdown visibility={dropdownVisibility4}>
                <ul>
                  <li>
                    <span>{data4.li_title19} : </span>
                    {data4.li_cont19}
                  </li>
                  <li>
                    <span>{data4.li_title20} : </span>
                    {data4.li_cont20}
                  </li>
                  <li>
                    <span>{data4.li_title21} : </span>
                    {data4.li_cont21}
                  </li>
                  <li>
                    <span>{data4.li_title22} : </span>
                    {data4.li_cont22}
                  </li>
                  <li>
                    <span>{data4.li_title23} : </span>
                    {data4.li_cont23}
                  </li>
                  <li>
                    <span>{data4.li_title24} : </span>
                    {data4.li_cont24}
                  </li>
                </ul>
              </Dropdown>
            </Tab>
            <Tab eventKey="지원금" title="일자리채움청년지원금">
              <div className="img-container">
                <a
                  href="https://www.jobaba.net/sprtPlcy/info/view2020.do?seq=12025&cntType=O"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={JFYSF} alt="일자리채움청년지원금" />
                </a>
              </div>
              <button
                id="down_btn"
                onClick={() => setDropdownVisibility1(!dropdownVisibility1)}
              >
                {dropdownVisibility1 ? "정책요약 ▲" : "정책요약 ▼"}
              </button>
              <Dropdown visibility={dropdownVisibility1}>
                <ul>
                  <li>
                    <span>{data5.li_title0} : </span>
                    {data5.li_cont0}
                  </li>
                  <li>
                    <span>{data5.li_title1} : </span>
                    {data5.li_cont1}
                  </li>
                  <li>
                    <span>{data5.li_title2} : </span>
                    {data5.li_cont2}
                  </li>
                  <li>
                    <span>{data5.li_title3} : </span>
                    {data5.li_cont3}
                  </li>
                  <li>
                    <span>{data5.li_title4} : </span>
                    {data5.li_cont4}
                  </li>
                  <li>
                    <span>{data5.li_title5} : </span>
                    {data5.li_cont5}
                  </li>
                  <li>
                    <span>{data5.li_title6} : </span>
                    {data5.li_cont6}
                  </li>
                </ul>
              </Dropdown>
              <button
                id="down_btn"
                onClick={() => setDropdownVisibility2(!dropdownVisibility2)}
              >
                {dropdownVisibility2 ? "신청자격 ▲" : "신청자격 ▼"}
              </button>
              <Dropdown visibility={dropdownVisibility2}>
                <ul>
                  <li>
                    <span>{data5.li_title7} : </span>
                    {data5.li_cont7}
                  </li>
                  <li>
                    <span>{data5.li_title8} : </span>
                    {data5.li_cont8}
                  </li>
                  <li>
                    <span>{data5.li_title9} : </span>
                    {data5.li_cont9}
                  </li>
                  <li>
                    <span>{data5.li_title10} : </span>
                    {data5.li_cont10}
                  </li>
                  <li>
                    <span>{data5.li_title11} : </span>
                    {data5.li_cont11}
                  </li>
                  <li>
                    <span>{data5.li_title12} : </span>
                    {data5.li_cont12}
                  </li>
                  <li>
                    <span>{data5.li_title13} : </span>
                    {data5.li_cont13}
                  </li>
                  <li>
                    <span>{data5.li_title14} : </span>
                    {data5.li_cont14}
                  </li>
                </ul>
              </Dropdown>
              <button
                id="down_btn"
                onClick={() => setDropdownVisibility3(!dropdownVisibility3)}
              >
                {dropdownVisibility3 ? "신청방법 ▲" : "신청방법 ▼"}
              </button>
              <Dropdown visibility={dropdownVisibility3}>
                <ul>
                  <li>
                    <span>{data5.li_title15} : </span>
                    {data5.li_cont15}
                  </li>
                  <li>
                    <span>{data5.li_title16} : </span>
                    {data5.li_cont16}
                  </li>
                  <li>
                    <span>{data5.li_title17} : </span>
                    {data5.li_cont17}
                  </li>
                  <li>
                    <span>{data5.li_title18} : </span>
                    {data5.li_cont18}
                  </li>
                </ul>
              </Dropdown>
              <button
                id="down_btn"
                onClick={() => setDropdownVisibility4(!dropdownVisibility4)}
              >
                {dropdownVisibility4 ? "기타 ▲" : "기타 ▼"}
              </button>
              <Dropdown visibility={dropdownVisibility4}>
                <ul>
                  <li>
                    <span>{data5.li_title19} : </span>
                    {data5.li_cont19}
                  </li>
                  <li>
                    <span>{data5.li_title20} : </span>
                    {data5.li_cont20}
                  </li>
                  <li>
                    <span>{data5.li_title21} : </span>
                    {data5.li_cont21}
                  </li>
                  <li>
                    <span>{data5.li_title22} : </span>
                    {data5.li_cont22}
                  </li>
                  <li>
                    <span>{data5.li_title23} : </span>
                    {data5.li_cont23}
                  </li>
                  <li>
                    <span>{data5.li_title24} : </span>
                    {data5.li_cont24}
                  </li>
                </ul>
              </Dropdown>
            </Tab>
          </Tabs>
        </div>
      </div>
      <Quick />
      <Footer />
    </>
  );
};

export default Support;
