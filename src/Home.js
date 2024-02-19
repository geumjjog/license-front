import React from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import Quick from "./components/Quick/Quick";

function Home({ deleteUser }) {
  return (
    <>
      <Header deleteUser={deleteUser} />
      <Main />
      <Quick />
      <Footer />
    </>
  );
}
export default Home;
