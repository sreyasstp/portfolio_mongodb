import mongoose, { Schema, Document } from 'mongoose'

const LessonSchema = new Schema({
  slug: String,
  title: String,
  objective_index: Number,
  content: Schema.Types.Mixed,
  sort_order: Number,
}, { _id: true })

const SectionSchema = new Schema({
  section_key: { type: String, required: true },
  title: String,
  weight: Number,
  description: String,
  objectives: [String],
  subtopics: [String],
  sort_order: Number,
  lessons: [LessonSchema],
}, { _id: false })

const ReferenceSchema = new Schema({
  title: String,
  url: String,
  category: String,
  description: String,
  sort_order: Number,
}, { _id: false })

export interface IExamGuide extends Document {
  slug: string
  exam_code: string
  title: string
  short_title: string
  level: string
  description: string
  questions: number
  passing_score: number
  duration: number
  cost_usd: number
  experience: string
  official_url: string
  prerequisites?: string[]
  sort_order: number
  is_active: boolean
  sections: Array<{
    section_key: string
    title: string
    weight: number
    description: string
    objectives: string[]
    subtopics: string[]
    sort_order: number
    lessons: Array<{
      _id: mongoose.Types.ObjectId
      slug: string
      title: string
      objective_index: number
      content: any
      sort_order: number
    }>
  }>
  references: Array<{
    title: string
    url: string
    category: string
    description: string
    sort_order: number
  }>
}

const ExamGuideSchema = new Schema<IExamGuide>({
  slug: { type: String, required: true, unique: true },
  exam_code: String,
  title: String,
  short_title: String,
  level: String,
  description: String,
  questions: Number,
  passing_score: Number,
  duration: Number,
  cost_usd: Number,
  experience: String,
  official_url: String,
  prerequisites: [String],
  sort_order: Number,
  is_active: { type: Boolean, default: true },
  sections: [SectionSchema],
  references: [ReferenceSchema],
}, { timestamps: true })

export const ExamGuide = mongoose.models.ExamGuide ?? mongoose.model<IExamGuide>('ExamGuide', ExamGuideSchema)
