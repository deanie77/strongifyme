import mongoose, { Document, Schema } from 'mongoose'

export interface IQuestion {
    authorId: mongoose.Types.ObjectId
    question: string
    options: Array<Object>
  }

export interface IQuestionModel extends IQuestion, Document {}

export const QuestionSchema: Schema = new Schema({
    authorId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    question: {
        type: String,
        required: [true, 'Please provide a question']
    },
    options: [
        {option: String}
    ],
},
{timestamps: true}
)

export default mongoose.model<IQuestionModel>('Question', QuestionSchema)