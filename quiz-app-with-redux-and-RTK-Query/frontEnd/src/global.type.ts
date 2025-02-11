export type TQuizQuestion = {
  _id: string;
  question: string;
  options: string[];
  correctAnswer: string;
};

export type TQuiz = {
  _id: string;
  title: string;
  description?: string;
  questions: TQuizQuestion[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};
