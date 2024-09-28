type ResultProps = {
  score: number;
  totalQuestions: number;
};

const Result = ({ score, totalQuestions }: ResultProps) => {
  return (
    <div>
      <h2>Here is your Final Quiz Score</h2>
      <p>
        {score} / {totalQuestions}
      </p>
    </div>
  );
};

export default Result;
