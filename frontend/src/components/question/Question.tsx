import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { fetchQuestions } from "../../features/question/questionSlice"
import { Box, Button, Flex, Stack } from "@chakra-ui/react"
import Answers from "../answers/Answers"
import QuestionStartPage from "../../pages/QuestionStartPage"

const Question = (props: any) => {
  const [questionList, setQuestionList] = useState<any>([])
  const [questionIndex, setQuestionIndex] = useState<any>(0)
  const [selectedAnswerList, setSelectedAnswerList] = useState<any>([])
  const [startQuiz, setStartQuiz] = useState(false)
  const [background, setBackground] = useState('')
  const [highlightAns, setHighlightAns] = useState('')

  const question = useAppSelector((state) => state.question.questions)

  const startedQuiz = () => {
    console.log('i was clicked')
    setStartQuiz(true)
    setQuestionList(question)
    console.log(questionList);
  }

  const nextQuestion = () => {
    setQuestionIndex(questionIndex + 1)
  }

  const prevQuestion = () => {
    setQuestionIndex(questionIndex - 1)
  }

  const selectAnswer = (answer: any) => {
    console.log(answer);
    setHighlightAns(answer)

    if (selectedAnswerList.length > 0 && selectedAnswerList.includes(answer)) {
     setSelectedAnswerList(selectedAnswerList.filter((item: any) => { return item !== answer }))
    } else {
     setSelectedAnswerList([...selectedAnswerList, answer])
    }

    // setClickedText('')
    console.log(selectedAnswerList)
  }

  useEffect(() => {
    console.log(selectedAnswerList);
  }, [selectedAnswerList, highlightAns])

  return (

    !startQuiz ? <QuestionStartPage startedQuiz={startedQuiz} /> :
      <div>
        <h3>{questionList[questionIndex].question}</h3>
        {questionList[questionIndex].options.map((option: any) => (
          <Box backgroundColor={selectedAnswerList.includes(option._id) ? 'green' : ''}><Answers itemID={option._id} onSelected={selectAnswer} answer={option.option} /></Box>
        ))}
        <Stack direction='row-reverse' justifyContent='space-between'>
          <Button onClick={nextQuestion}>Next Question</Button>
          <Button onClick={prevQuestion}>Previous Question</Button>
        </Stack>
      </div>
  )
}

export default Question
