import React, { useState, useEffect, useRef } from "react";
import "../css/test.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Quick from "../components/Quick/Quick";

function Test() {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(questions.length).fill(-1)
  ); // 선택된 답변을 저장하는 배열, 초기값은 -1
  const [selectedScores, setSelectedScores] = useState(
    Array(questions.length).fill(null)
  ); // 선택된 답변의 점수를 저장하는 배열, 초기값은 null
  const [selectedAnswersText, setSelectedAnswersText] = useState(
    Array(questions.length).fill("")
  ); // "B+questionIndex" 형식으로 선택된 답변을 저장하는 배열, 초기값은 ""
  const scrollRef = useRef(null);

  useEffect(() => {
    fetchTestQuestions();
  }, []);

  const fetchTestQuestions = async () => {
    try {
      const response = await fetch("/career-test");
      const data = await response.json();

      let score = 1; // 각 질문의 처음 답변에 대해서만 1씩 증가하는 변수
      const updatedQuestions = data.map((question) => ({
        ...question,
        answers: question.answers.map((answer, index) => ({
          ...answer,
          answerScore: index < 2 ? score++ : answer.answerScore, // 처음 두 개의 답변에 대해서만 1씩 증가하는 로직
        })),
      }));

      setQuestions(updatedQuestions);
      setSelectedAnswers(Array(updatedQuestions.length).fill(-1));
      setSelectedScores(Array(updatedQuestions.length).fill(null));
    } catch (error) {
      console.error("Error fetching career test questions:", error);
    }
  };

  const handleAnswerSelection = (questionIndex, answerIndex, answerScore) => {
    console.log(
      "Selected answer:",
      questions[questionIndex].answers[answerIndex]
    );
    setSelectedAnswersText((prevState) => {
      const newState = [...prevState];
      newState[questionIndex] = `B${questionIndex + 1}`;
      return newState;
    });

    setSelectedScores((prevState) => {
      const newState = [...prevState];
      newState[questionIndex] = answerScore;
      return newState;
    });
  };

  const submitTest = async () => {
    try {
      const response = await fetch("/submit-career-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedAnswers), // 선택된 답변을 서버로 전송
      });
      const data = await response.json();
      console.log("Test result:", data);
      // 여기서 결과를 처리하거나, 결과 페이지로 이동하는 등의 작업을 수행할 수 있습니다.
    } catch (error) {
      console.error("Error submitting career test:", error);
    }
  };

  const selectedAnswersLineArray = selectedScores.map(
    (score, index) => `${selectedAnswersText[index]}=${score}`
  );

  const selectedAnswersLine = selectedAnswersLineArray.join(" ");

  const [response, setResponse] = useState(null);

  const handleSubmit = async () => {
    const unansweredQuestionIndex = selectedScores.findIndex(
      (score) => score === null
    );
    if (unansweredQuestionIndex !== -1) {
      alert(
        `선택되지 않은 질문이 있습니다. 질문 ${
          unansweredQuestionIndex + 1
        }으로 이동합니다.`
      );
      const unansweredQuestionRef = document.getElementById(
        `question${unansweredQuestionIndex}`
      );
      if (unansweredQuestionRef) {
        unansweredQuestionRef.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apikey: "92a66e624117c92a3fd4ee8379ee5a00",
        qestrnSeq: "6",
        trgetSe: "100208",
        gender: "100323",
        grade: "2",
        startDtm: Date.now(),
        answers: `${selectedAnswersLine}`,
      }),
    };

    try {
      const response = await fetch("/submit-career-test", requestOptions);
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.error("Error submitting career test result:", error);
    }
  };

  const resetTest = () => {
    setSelectedAnswers(Array(questions.length).fill(-1));
    setSelectedScores(Array(questions.length).fill(null));
    setSelectedAnswersText(Array(questions.length).fill(""));
    setResponse(null);
  };

  return (
    <>
      <Header />
      <div className="test-container">
        <h1>직업 적성검사</h1>
        <div className="test_title">
          <p>
            직업에 관련한 다양한 가치 중에서 어떤 가치를 주요하게 만족시키고
            싶은지 알아볼 수 있습니다.
            <br /> 각 번호에 있는 두 가지 가치 중에 자신에게 더 중요한 가치에
            표시하세요.
          </p>
        </div>
        {questions.map((question, index) => (
          <div
            key={`question${index}`}
            id={`question${index}`}
            className="question-container"
          >
            <h6>
              <span>{index + 1}</span> {question.question}
            </h6>{" "}
            {/* 질문 앞에 질문 순서 번호 추가 */}
            <ul>
              <div className="answer-buttons">
                {question.answers.slice(0, 2).map((answer, answerIndex) => (
                  <button
                    key={answerIndex}
                    className={
                      selectedScores[index] === answer.answerScore
                        ? "selected"
                        : ""
                    }
                    onClick={() =>
                      handleAnswerSelection(
                        index,
                        answerIndex,
                        answer.answerScore
                      )
                    } // 버튼 클릭 시 해당 답변의 점수 전달
                  >
                    {answer.answerText}
                  </button>
                ))}
              </div>
            </ul>
            <div className="ps">
              <p>
                {question.answers[0].answerText} :{" "}
                {question.answers[2].answerText}
                <br />
                {question.answers[1].answerText} :{" "}
                {question.answers[3].answerText}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="result-center">
        <div className="result-request">
          <div className="result-buttons">
            <button onClick={handleSubmit}>결과 요청 하기</button>
            {response && (
              <a
                href={response.RESULT.url}
                target="_blank"
                rel="noopener noreferrer"
                className="result-link"
                onClick={resetTest}
              >
                검사 결과 보러가기
              </a>
            )}
          </div>
        </div>
      </div>
      <Quick />
      <Footer />
    </>
  );
}

export default Test;
