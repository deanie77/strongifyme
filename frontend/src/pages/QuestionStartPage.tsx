import { Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { fetchQuestions } from '../features/question/questionSlice'
import { useAppDispatch, useAppSelector } from '../app/hooks';

const QuestionStartPage = (props: any) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchQuestions())
    }, [])

    const handleClick = () => {
        props.startedQuiz()
    }

    return (
        <Button onClick={handleClick}>Start Quiz</Button>
    )
}

export default QuestionStartPage