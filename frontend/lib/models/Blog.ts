import mongoose, { Schema, Document } from 'mongoose'

export interface IBlog extends Document {
  title: string
  slug: string
  excerpt: string
  content: string
  featured_image?: string
  tags: string[]
  status: string
  is_featured: boolean
  reading_time: number
  view_count: number
  published_at?: Date
  category?: { name: string; slug: string; color: string }
  author: { name: string; avatar?: string; headline?: string }
  seo_title?: string
  seo_description?: string
}

const BlogSchema = new Schema<IBlog>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: String,
  content: String,
  featured_image: String,
  tags: [String],
  status: { type: String, default: 'published' },
  is_featured: { type: Boolean, default: false },
  reading_time: { type: Number, default: 5 },
  view_count: { type: Number, default: 0 },
  published_at: Date,
  category: {
    name: String,
    slug: String,
    color: String,
  },
  author: {
    name: { type: String, default: 'Sreyas' },
    avatar: String,
    headline: String,
  },
  seo_title: String,
  seo_description: String,
}, { timestamps: true })

export const Blog = mongoose.models.Blog ?? mongoose.model<IBlog>('Blog', BlogSchema)
