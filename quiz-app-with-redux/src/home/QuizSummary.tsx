import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAppSelector } from "@/redux/hooks";

const getPerformance = (percentage: number) => {
  if (percentage >= 90) {
    return { rating: "Excellent", color: "bg-green-800" };
  } else if (percentage >= 50) {
    return { rating: "Good", color: "bg-yellow-500" };
  } else if (percentage >= 30) {
    return { rating: "Needs Improvement", color: "bg-orange-500" };
  } else {
    return { rating: "Poor", color: "bg-red-500" };
  }
};


const QuizSummary = () => {
  const { question, userAnswers } = useAppSelector((state) => state.quiz);

  const correctAnswersCount = question.reduce((count, qna, index) => {
    return qna.correctAnswer === userAnswers[index] ? count + 1 : count;
  }, 0);

  const correctPercentage = parseFloat(
    ((correctAnswersCount / question.length) * 100).toFixed()
  );

  const incorrectAnswersCount = question.length - correctAnswersCount;

  const { rating, color } = getPerformance(correctPercentage);

  return (
    <div className="flex justify-center mt-7">
      <Card className="w-[350px] md:w-[450px]">
        <CardHeader>Quiz summary</CardHeader>
        <CardContent>
        <h3 className="text-xl font-medium mb-4 ">
          You got {correctAnswersCount} out of {question.length} correct!
        </h3>

        {/* Progress Bar */}
        <div className="mb-4">
          <Progress  value={correctPercentage} className={`h-4 rounded-full ${color} `}  />
          <div className="flex justify-between mt-2">
            <span className="text-sm">{correctPercentage}%</span>
            <span className="text-sm">Performance: {rating}</span>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-4">
          <p className="text-sm">
            <strong>Incorrect Answers:</strong> {incorrectAnswersCount}
          </p>
          
        </div>

        <div className="mt-4">
          <p className="text-sm">Great job! Keep practicing to improve your performance.</p>
        </div>
      </CardContent>
      </Card>
    </div>
  );
};

export default QuizSummary;
