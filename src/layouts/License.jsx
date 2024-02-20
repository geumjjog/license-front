// 페이징 처리해서 하는 법

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/License.css";

const License = () => {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedSearchTerm, setAppliedSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const pagingBlock = 10;
  const serviceKey =
    "8RQmmNMbqQKZO06m6d44ZNTJv55aWC7ld4cj5de9n14a6o3tbFOrn/F3Aa5cVQzRVlpUr2nt2J9sjnqrnD2KLA==";

  const [categories, setCategories] = useState({
    largeCategory: "",
    mediumCategory: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl =
          "/api/service/rest/InquiryListNationalQualifcationSVC/getList";
        const response = await axios.get(apiUrl, {
          params: {
            serviceKey: serviceKey,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [serviceKey]);

  useEffect(() => {
    if (
      data &&
      data.response &&
      data.response.body &&
      data.response.body.items
    ) {
      const largeCategories = Array.from(
        new Set(data.response.body.items.item.map((item) => item.obligfldnm))
      );
      setCategories((prevCategories) => ({
        ...prevCategories,
        largeCategories,
      }));
    }
  }, [data]);

  useEffect(() => {
    if (
      data &&
      data.response &&
      data.response.body &&
      data.response.body.items
    ) {
      const filteredItems = data.response.body.items.item.filter(
        (item) =>
          item.jmfldnm.includes(appliedSearchTerm) &&
          (!categories.largeCategory ||
            item.obligfldnm === categories.largeCategory) &&
          (!categories.mediumCategory ||
            item.mdobligfldnm === categories.mediumCategory) &&
          (!categories.grade || item.seriesnm === categories.grade)
      );
      setFilteredData(filteredItems);
    }
  }, [data, appliedSearchTerm, categories]);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleApplySearch = () => {
    setAppliedSearchTerm(searchTerm);
    setCurrentPage(1);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleApplySearch();
    }
  };

  const getCurrentPageData = () => {
    if (!filteredData) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil((filteredData?.length || 0) / itemsPerPage);

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
      <hr />
      <div className="centered-container">
        <h1>자격증 검색</h1>
        <div className="menu-container">
          <div className="search-container">
            <input
              type="text"
              placeholder="검색어 입력"
              value={searchTerm}
              onChange={handleSearchTermChange}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleApplySearch}>검색</button>
          </div>

          <div className="dropdown-container">
            <select
              value={categories.largeCategory}
              onChange={(e) =>
                setCategories({
                  ...categories,
                  largeCategory: e.target.value,
                  mediumCategory: "",
                })
              }
            >
              <option value="">대분류 선택</option>
              {categories.largeCategories &&
                Array.from(new Set(categories.largeCategories)).map(
                  (category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  )
                )}
            </select>

            <select
              value={categories.mediumCategory}
              onChange={(e) =>
                setCategories({ ...categories, mediumCategory: e.target.value })
              }
              disabled={
                !categories.largeCategory || categories.largeCategory === ""
              } // 대분류 선택 전이거나 빈 값인 경우 비활성화
            >
              <option value="">중분류 선택</option>
              {data?.response?.body?.items?.item
                .filter((item) => item.obligfldnm === categories.largeCategory)
                .map((item) => item.mdobligfldnm)
                .filter((value, index, self) => self.indexOf(value) === index)
                .map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
            </select>

            <select
              value={categories.grade}
              onChange={(e) =>
                setCategories({ ...categories, grade: e.target.value })
              }
              disabled={!categories.largeCategory || !categories.mediumCategory}
            >
              <option value="">등급</option>
              {data?.response?.body?.items?.item
                .filter(
                  (item) =>
                    item.obligfldnm === categories.largeCategory &&
                    item.mdobligfldnm === categories.mediumCategory
                )
                .map((item) => item.seriesnm)
                .filter((value, index, self) => self.indexOf(value) === index) // 중복 제거
                .map((seriesnm) => (
                  <option key={seriesnm} value={seriesnm}>
                    {seriesnm}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="LicenseList">
          {filteredData ? (
            <>
              {filteredData.length > 0 ? (
                <ul>
                  {getCurrentPageData().map((item) => (
                    <li key={item.jmcd}>
                      <Link
                        to={{
                          pathname: `/detail/${encodeURIComponent(
                            item.jmfldnm
                          )}`,
                          state: {
                            jmcd: item.jmcd,
                            seriescd: item.seriescd,
                          },
                        }}
                      >
                        <span className="link-text">
                          {item.jmfldnm} &nbsp;
                          {item.jmcd && (
                            <span className="company">한국산업인력공단</span>
                          )}
                        </span>
                        <br />
                        {item.jmcd && <p>{item.qualgbnm}</p>}
                        {item.jmcd && (
                          <p>
                            {item.obligfldnm}, {item.mdobligfldnm}
                          </p>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>검색 결과가 없습니다.</p>
              )}
              <div class="page-container">
                {currentPage > pagingBlock && (
                  <button onClick={handlePrev}>이전</button>
                )}
                {visiblePages.map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    disabled={page === currentPage}
                  >
                    {page}
                  </button>
                ))}
                {totalPages > pagingBlock && (
                  <button onClick={handleNext}>다음</button>
                )}
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default License;
