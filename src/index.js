import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client"; // react-dom/client에서 createRoot 가져오기
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./layouts/login";
import Register from "./layouts/register";
import Workbook from "./layouts/workbook";
import Calendar from "./layouts/calendar";
import Support from "./layouts/support";
import Book from "./layouts/Book";
import Board from "./layouts/Board";
import LicensePage from "./layouts/LicensePage";
import DetailPage from "./layouts/DetailPage";
import DataPage from "./layouts/DataPage";
import LoginCallback from "./oauth/Logincallback";
import FindId from "./layouts/FindId";
import Test from "./layouts/test";
import MyPage from "./layouts/MyPage";
import NotFound from "./layouts/NotFound";
import FindPwd from "./layouts/FindPwd";
import DateTest from "./layouts/datetest";
import MbtiPage from "./layouts/MbtiPage";
import AdminRoute from "./roleRoute/AdminRoute";
import RecommendBook from "./layouts/RecommendBook";
import RecommendBookDetail from "./layouts/RecommendBookDetail";
import EditMember from "./layouts/EditMember";
import BoardWrite from "./layouts/BoardWrite";
import BoardView from "./layouts/BoardView";

const root = document.getElementById("root");

// createRoot를 사용하여 렌더링 시작
const rootElement = createRoot(root); // react-dom/client에서 createRoot 사용
rootElement.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/workbook" element={<Workbook />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/support" element={<Support />} />
      <Route path="/book" element={<Book />} />
      <Route path="/community" element={<Board />} />
      <Route path="/license" element={<LicensePage />} />
      <Route path="/detail/:jmfldnm" element={<DetailPage />} />
      <Route path="/data" element={<DataPage />} />
      <Route path="/login/callback" element={<LoginCallback />} />
      <Route path="/findid" element={<FindId />} />
      <Route path="/test" element={<Test />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/*" element={<NotFound />} />
      <Route path="/login/findpassword" element={<FindPwd />} />
      <Route path="/datetest" element={<DateTest />} />
      <Route path="/mbti" element={<MbtiPage />} />
      {/* admin */}
      <Route path="/admin" element={<AdminRoute />} />
      <Route path="/editMember/:username" element={<EditMember />} />
      <Route path="/book/:jmfldnm" element={<Book />} />
      <Route path="/RecommendBook" element={<RecommendBook />} />
      <Route path="/RecommendBookDetail" element={<RecommendBookDetail />} />
      <Route path="/BoardWrite" element={<BoardWrite />} />
      <Route path="/BoardView/:boardSeq" element={<BoardView />} />
    </Routes>
  </BrowserRouter>
);
