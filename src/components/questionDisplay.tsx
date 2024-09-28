import "../styles/card.scss";
import { QuestionType } from "../utils/types";
type QuestionCardProps = {
  question: QuestionType;
  onAnswerSelect: (answer: string) => void;
  selectedAnswer: string | undefined;
  error: string;
};

export const QuestionDisplay = ({
  question,
  onAnswerSelect,
  selectedAnswer,
  error,
}: QuestionCardProps) => {
  return (
    <div className={"question-card"}>
      <h2>{question?.questionText}</h2>
      {question?.options?.map((option, index) => (
        <div key={index} className={"option"}>
          <label>
            <input
              type="radio"
              value={option}
              checked={selectedAnswer === option}
              onChange={() => onAnswerSelect(option)}
            />
            {option}
          </label>
        </div>
      ))}
      {error && <div className={"error"}>{error}</div>}
    </div>
  );
};
