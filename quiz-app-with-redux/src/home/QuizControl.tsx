import { Button } from "@/components/ui/button";
import {
  completeQuize,
  nextQuestion,
  previousQuestion,
} from "@/redux/features/quiz/quizSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const QuizControl = () => {
  const dispatch = useAppDispatch();
  const { currentQuestionIndex, question, userAnswers } = useAppSelector(
    (state) => state.quiz
  );

  const handleNextQuestion = () => {
    dispatch(nextQuestion());
  };

  const handlePreQuestion = () => {
    dispatch(previousQuestion());
  };

  const handleComplete = () => {
    dispatch(completeQuize());
  };

  return (
    <div className="flex justify-between w-full mt-4">
      <Button
        disabled={currentQuestionIndex === 0}
        onClick={handlePreQuestion}
        variant="outline"
      >
        Previous
      </Button>
      {currentQuestionIndex < question.length - 1 ? (
        <Button
          disabled={userAnswers[currentQuestionIndex] === null}
          onClick={handleNextQuestion}
        >
          Next
        </Button>
      ) : (
        <Button
          disabled={userAnswers[currentQuestionIndex] === null}
          onClick={handleComplete}
        >
          Complete Quiz
        </Button>
      )}
    </div>
  );
};

export default QuizControl;
