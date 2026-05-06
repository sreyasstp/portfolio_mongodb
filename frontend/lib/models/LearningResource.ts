import mongoose, { Schema, Document } from 'mongoose'

export interface ILearningResource extends Document {
  title: string
  slug: string
  description?: string
  file_path?: string
  file_name?: string
  file_type?: string
  file_size?: number
  thumbnail?: string
  type: string
  access_level: string
  status: string
  download_count: number
  is_featured: boolean
  tags: string[]
  category?: { name: string; slug: string; color: string }
}

const LearningResourceSchema = new Schema<ILearningResource>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  file_path: String,
  file_name: String,
  file_type: String,
  file_size: Number,
  thumbnail: String,
  type: { type: String, default: 'guide' },
  access_level: { type: String, default: 'FREE' },
  status: { type: String, default: 'published' },
  download_count: { type: Number, default: 0 },
  is_featured: { type: Boolean, default: false },
  tags: [String],
  category: {
    name: String,
    slug: String,
    color: String,
  },
}, { timestamps: true })

export const LearningResource = mongoose.models.LearningResource ?? mongoose.model<ILearningResource>('LearningResource', LearningResourceSchema)
