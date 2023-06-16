import { Request, Response } from "express";
import QuestionModel from "../models/QuestionModel";

export const getQuestions = async (req: Request, res: Response) => {
    try {
        QuestionModel.find()
        .then((data) => {
            res.status(200).json(data)
        })
        .catch(err => {
            throw err
        })
    } catch (error) {
        res.status(400).json(error)
    }
}