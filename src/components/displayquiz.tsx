import  { useEffect, useState } from "react";
import { QuestionDisplay } from "./questionDisplay";
import Result from "./displayResult";
import { QuestionType } from "../utils/types";
import { decodeHTML } from "../utils/functions";
import { questionsList } from "../utils/constants";

const DisplayQuiz = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isQuizComplete, setIsQuizComplete] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [isFetching, setIsFetching] = useState(false);
  const handleAnswer = (answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answer;
    setSelectedAnswers(newAnswers);
    setError("");
  };

  const handleNext = () => {
    if (!selectedAnswers[currentQuestion]) {
      setError("Please select an answer before proceeding.");
      return;
    }
    if (
      selectedAnswers[currentQuestion] ===
      questions[currentQuestion].correctAnswer
    ) {
      setScore((prevScore) => prevScore + 1);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsQuizComplete(true);
    }
  };

  const handlePrev = () => {
    setError("");
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const fetchQuestions = async () => {
    setIsFetching(true);

    const response = await fetch(
      "https://opentdb.com/api.php?amount=10&type=multiple"
    );
    const data = await response.json();
    const formattedQuestions = data?.results?.map((item: any) => ({
      questionText: decodeHTML(item.question),
      options: [...item.incorrect_answers, item.correct_answer]
        .map(decodeHTML)
        .sort(() => Math.random() - 0.5),
      correctAnswer: item.correct_answer,
    }));

    if (formattedQuestions) {
      setQuestions(formattedQuestions);
    } else {
      setQuestions((prev) => [...prev, ...questionsList]);
    }
    setIsFetching(false);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="quiz-container">
      {!isQuizComplete ? (
        <>
          {!isFetching ? (
            <>
              <QuestionDisplay
                question={questions[currentQuestion]}
                onAnswerSelect={handleAnswer}
                selectedAnswer={selectedAnswers[currentQuestion]}
                error={error}
              />
              <button onClick={handlePrev} disabled={currentQuestion === 0}>
                Previous
              </button>
              <button onClick={handleNext}>
                {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
              </button>
            </>
          ) : (
            "Loading ...."
          )}
        </>
      ) : (
        <>
          <Result score={score} totalQuestions={questions.length} />
          <button
            className="try_btn"
            onClick={() => {
              fetchQuestions();
              setSelectedAnswers([]);
              setIsQuizComplete(false);
              setCurrentQuestion(0);
              setScore(0);
            }}
          >
            Try Again
          </button>
        </>
      )}
    </div>
  );
};

export default DisplayQuiz;
