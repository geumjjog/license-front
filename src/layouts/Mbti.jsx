import React, { Component } from "react";
import { questions } from "./question";
import { mbtiTypes } from "./mbtiTypes";
import { Link } from "react-router-dom";
import "../css/Mbti.css";

class MBTI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: 0,
      answers: [],
      showResult: false,
      mbtiType: "",
      recommendedJob: "",
      recommendedLicense1: "",
      recommendedLicense2: "",
      recommendedLicense3: "",
      recommendedLicense4: "",
    };
  }

  handleNextQuestion = (answer) => {
    // 선택된 답변을 저장하는 부분
    const { currentQuestion, answers } = this.state;
    answers[currentQuestion] = answer;
    this.setState({ answers: answers });
    console.log(answer);
    if (currentQuestion < questions.length - 1) {
      // 다음 질문으로 이동
      this.setState({ currentQuestion: currentQuestion + 1 });
    } else {
      // MBTI 유형 계산
      const mbtiType = this.calculateMbtiType();
      // MBTI 유형에 따른 결과 표시
      const result = mbtiTypes[mbtiType];
      this.setState({
        showResult: true,
        mbtiType: result.type,
        desc: result.desc,
        recommendedJob: result.job,
        recommendedLicense1: result.license1,
        recommendedLicense2: result.license2,
        recommendedLicense3: result.license3,
        recommendedLicense4: result.license4,
      });
    }
  };

  calculateMbtiType = () => {
    // Calculate MBTI type
    let countI = 0;
    let countE = 0;
    let countS = 0;
    let countN = 0;
    let countT = 0;
    let countF = 0;
    let countJ = 0;
    let countP = 0;

    for (let i = 0; i < questions.length; i++) {
      const answerKey = this.state.answers[i]; // 선택된 옵션의 key 값

      // 각 유형 알파벳 count
      for (let j = 0; j < answerKey.length; j++) {
        const letter = answerKey[j];
        switch (letter) {
          case "I":
            countI++;
            break;
          case "E":
            countE++;
            break;
          case "S":
            countS++;
            break;
          case "N":
            countN++;
            break;
          case "T":
            countT++;
            break;
          case "F":
            countF++;
            break;
          case "J":
            countJ++;
            break;
          case "P":
            countP++;
            break;
          default:
            break;
        }
      }
    }

    console.log(countI, countE, countS, countN, countT, countF, countJ, countP); // count 결과 출력

    let mbtiType = "";
    if (countI > countE) mbtiType += "I";
    else mbtiType += "E";
    if (countS > countN) mbtiType += "S";
    else mbtiType += "N";
    if (countT > countF) mbtiType += "T";
    else mbtiType += "F";
    if (countJ > countP) mbtiType += "J";
    else mbtiType += "P";

    return mbtiType;
  };

  handleRestartTest = () => {
    this.setState({
      currentQuestion: 0,
      answers: [],
      showResult: false,
      mbtiType: "",
      desc: "",
      recommendedJob: "",
      recommendedLicense1: "",
      recommendedLicense2: "",
      recommendedLicense3: "",
      recommendedLicense4: "",
    });
  };

  render() {
    const {
      currentQuestion,
      showResult,
      mbtiType,
      desc,
      recommendedJob,
      recommendedLicense1,
      recommendedLicense2,
      recommendedLicense3,
      recommendedLicense4,
    } = this.state;
    return (
      <div className="Mbti-container">
        <div className="Mbti">
          <div className="container text-center">
            <div className="card">
              <div className="card-header">
                <h2>MBTI 성향 테스트</h2>
              </div>
              <div className="card-body">
                {!showResult && (
                  <div id="question">
                    <p>{`Q${currentQuestion + 1}. ${
                      questions[currentQuestion].question
                    }`}</p>
                    {Object.entries(questions[currentQuestion].options).map(
                      ([key, value]) => (
                        <div className="form-check" key={key}>
                          <input
                            className="form-check-input"
                            type="radio"
                            name={`question${currentQuestion}`}
                            id={`question${currentQuestion}${key}`}
                            value={key}
                            onChange={() => this.handleNextQuestion(key)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`question${currentQuestion}${key}`}
                          >
                            {value}
                          </label>
                        </div>
                      )
                    )}
                  </div>
                )}
                {showResult && (
                  <div id="result">
                    <h3>{`당신의 MBTI 유형은 ${mbtiType}입니다.`}</h3>
                    <p>{`${desc}`}</p>
                    <h4>추천 자격증</h4>
                    <p>
                      <Link to={`/detail/${recommendedLicense1}`}>
                        {`${recommendedLicense1} `}&nbsp;&nbsp;
                      </Link>
                      <Link to={`/detail/${recommendedLicense2}`}>
                        {`${recommendedLicense2} `}&nbsp;&nbsp;
                      </Link>
                      <Link to={`/detail/${recommendedLicense3}`}>
                        {`${recommendedLicense3} `}&nbsp;&nbsp;
                      </Link>
                      <Link
                        to={`/detail/${recommendedLicense4}`}
                      >{`${recommendedLicense4}`}</Link>
                    </p>
                    <button
                      className="mbti-btn"
                      onClick={this.handleRestartTest}
                    >
                      다시 검사하기
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MBTI;
