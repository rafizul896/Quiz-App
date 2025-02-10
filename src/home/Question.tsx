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

const Question = () => {
  const dispatch = useAppDispatch();
  const { question, currentQuestionIndex } = useAppSelector(
    (state) => state.quiz
  );

  const currentQuestion = question[currentQuestionIndex];
  console.log(currentQuestion);

  const handleAnswesChange = (answer: string) => {
    dispatch(setAnswer({ questionIndex: currentQuestionIndex, answer }));
  };

  return (
    <div className="flex justify-center">
      <Card className="w-[350px] md:w-[450px]">
        <CardHeader>
          <CardTitle>{currentQuestion.question}</CardTitle>
          <CardDescription>
            Question {currentQuestionIndex + 1} of {question.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {currentQuestion.options.map((option, index) => (
            <Button
              onClick={() => handleAnswesChange(option)}
              className="w-full mt-5"
              size={"lg"}
              key={index}
            >
              {option}
            </Button>
          ))}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Question;
