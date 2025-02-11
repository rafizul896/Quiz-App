import { quizData } from "@/home/quizData";
import { createSlice } from "@reduxjs/toolkit";

interface TQuizSlice {
  question: typeof quizData;
  currentQuestionIndex: number;
  userAnswers: (string | null)[];
  quizComplete: boolean;
}

const initialState: TQuizSlice = {
  question: quizData,
  currentQuestionIndex: 0,
  userAnswers: Array(quizData.length).fill(null),
  quizComplete: false,
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setAnswer: (state, action) => {
      const { questionIndex, answer } = action.payload;
      state.userAnswers[questionIndex] = answer;
    },
    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.question.length - 1) {
        state.currentQuestionIndex += 1;
      }
    },
    previousQuestion: (state) => {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
      }
    },
    completeQuize: (state) => {
      state.quizComplete = true;
    },
  },
});

export default quizSlice.reducer;
export const { setAnswer, nextQuestion, previousQuestion, completeQuize } = quizSlice.actions;
