import { Card } from "@/components/ui/card";
import { TQuiz, TQuizQuestion } from "@/global.type";
import { useGetAllQuizQuery } from "@/redux/api/quizApi";
import { setQuiz } from "@/redux/features/quiz/quizSlice";
import { useAppDispatch } from "@/redux/hooks";

const AllQuiz = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetAllQuizQuery(undefined);

  if (isLoading) {
    return <p>Loading...!</p>;
  }

  const handleSetQuiz = (quiz: TQuizQuestion[]) => {
    dispatch(setQuiz({ quiz }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {data?.map((quiz: TQuiz, index: string) => (
        <Card
          onClick={() => handleSetQuiz(quiz.questions)}
          key={index}
          className="p-2 md:p-4 cursor-pointer"
        >
          <h1>{quiz?.title}</h1>
          <p>{quiz?.description}</p>
        </Card>
      ))}
    </div>
  );
};

export default AllQuiz;
