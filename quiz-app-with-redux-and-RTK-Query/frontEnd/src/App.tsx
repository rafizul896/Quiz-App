import AddQuiz from "./home/AddQuiz";
import AllQuiz from "./home/AllQuiz";
import Question from "./home/Question";
import QuizSummary from "./home/QuizSummary";
import { useAppSelector } from "./redux/hooks";

const App = () => {
  const { quizComplete } = useAppSelector((state) => state.quiz);

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-center text-6xl md:text-9xl font-medium  my-12">
        Quiz app
      </h3>
      <AddQuiz />
      <AllQuiz />
      {quizComplete ? <QuizSummary /> : <Question />}
    </div>
  );
};

export default App;
