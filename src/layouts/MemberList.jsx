// MemberList.js

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { removeAccessCookie, removeRefreshCookie } from "../Cookie/cookie";
import axios from "axios";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../css/MemberList.css";

const MemberList = () => {
  const [members, setMembers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const pagingBlock = 5;

  useEffect(() => {
    fetchMemberList();
  }, [currentPage]);

  const fetchMemberList = async () => {
    try {
      const response = await axios.get("admin/memberlist");
      setMembers(response.data.content);
    } catch (error) {
      console.error("Error fetching member list:", error);
    }
  };

  const deleteMember = async (memberNum) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`/deleteMember/${memberNum}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      if (response.data === "Success") {
        removeAccessCookie();
        removeRefreshCookie();
        alert("회원탈퇴 성공");
        fetchMemberList(); // 회원 목록을 다시 불러와 UI를 업데이트
      }
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  const totalPages = Math.ceil(members.length / itemsPerPage);

  const visiblePages = Array.from(
    { length: Math.min(pagingBlock, totalPages) },
    (_, index) =>
      index + Math.floor((currentPage - 1) / pagingBlock) * pagingBlock + 1
  ).filter((page) => page <= totalPages);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - pagingBlock, 1));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + pagingBlock, totalPages));
  };

  return (
    <>
      <Header />
      <div className="memberlist_controller">
        <h1>회원관리</h1>
        <table>
          <thead>
            <tr>
              <th>이름</th>
              <th>ID</th>
              <th>Email</th>
              <th>전화번호</th>
              <th>회원유형</th>
              <th>관리</th>
              <th>수정</th>
            </tr>
          </thead>
          <tbody>
            {members
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map(
                (member) =>
                  // username이 null이 아닌 경우에만 해당 행을 렌더링
                  member.username !== null &&
                  member.membership !== "관리자" && (
                    <tr key={member.memberNum}>
                      <td>{member.memberName}</td>
                      <td>{member.username}</td>
                      <td>{member.email}</td>
                      <td>{member.phoneNum}</td>
                      <td>{member.membership}</td>
                      <td>
                        <a
                          className="delete"
                          onClick={() => deleteMember(member.memberNum)}
                        >
                          탈퇴
                        </a>
                      </td>
                      <td>
                        <Link
                          className="edmit"
                          to={`/editMember/${member.username}`}
                        >
                          수정
                        </Link>
                      </td>
                    </tr>
                  )
              )}
          </tbody>
        </table>
        <div className="paging">
          {currentPage > pagingBlock && (
            <button className="ml-btn" onClick={handlePrev}>
              이전
            </button>
          )}
          {visiblePages.map((page) => (
            <button
              className="ml-btn"
              key={page}
              onClick={() => handlePageChange(page)}
              disabled={page === currentPage}
            >
              {page}
            </button>
          ))}
          {totalPages > pagingBlock && (
            <button className="ml-btn" onClick={handleNext}>
              다음
            </button>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MemberList;
