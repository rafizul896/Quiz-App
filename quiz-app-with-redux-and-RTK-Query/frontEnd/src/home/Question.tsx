import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { setAnswer } from "@/redux/features/quiz/quizSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import QuizControl from "./QuizControl";

const Question = () => {
  const dispatch = useAppDispatch();

  const { question, currentQuestionIndex, userAnswers } = useAppSelector(
    (state) => state.quiz
  );

  const currentQuestion = question[currentQuestionIndex];
  const currentAnswer = userAnswers[currentQuestionIndex];

  const handleAnswesChange = (answer: string) => {
    dispatch(setAnswer({ questionIndex: currentQuestionIndex, answer }));
  };

  return (
    <div>
      {question.length > 0 && (
        <div className="flex justify-center">
          <Card className="w-[350px] md:w-[450px]">
            <CardHeader>
              <CardTitle>{currentQuestion?.question}</CardTitle>
              <CardDescription>
                Question {currentQuestionIndex + 1} of {question?.length}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {currentQuestion?.options.map((option, index) => (
                <Button
                  onClick={() => handleAnswesChange(option)}
                  className="w-full mt-5"
                  size={"lg"}
                  key={index}
                  variant={option === currentAnswer ? "default" : "outline"}
                >
                  {option}
                </Button>
              ))}
            </CardContent>
            <CardFooter>
              <QuizControl />
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Question;
