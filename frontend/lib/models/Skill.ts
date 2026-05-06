import mongoose, { Schema, Document } from 'mongoose'

export interface ISkill extends Document {
  name: string
  slug: string
  category: string
  proficiency: number
  is_featured: boolean
  sort_order: number
  icon?: string
}

const SkillSchema = new Schema<ISkill>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  proficiency: { type: Number, default: 0 },
  is_featured: { type: Boolean, default: false },
  sort_order: { type: Number, default: 0 },
  icon: String,
}, { timestamps: true })

export const Skill = mongoose.models.Skill ?? mongoose.model<ISkill>('Skill', SkillSchema)
