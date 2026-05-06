import mongoose, { Schema, Document } from 'mongoose'

export interface IExtension extends Document {
  title: string
  slug: string
  short_description: string
  description?: string
  version: string
  magento_versions: string[]
  file_path?: string
  file_name?: string
  file_size?: number
  thumbnail?: string
  screenshots?: string[]
  type: string
  license: string
  status: string
  is_featured: boolean
  github_url?: string
  packagist_url?: string
  demo_url?: string
  documentation_url?: string
  download_count: number
  rating: number
  tags: string[]
  changelog?: string
  category?: { name: string; slug: string; color: string }
}

const ExtensionSchema = new Schema<IExtension>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  short_description: String,
  description: String,
  version: String,
  magento_versions: [String],
  file_path: String,
  file_name: String,
  file_size: Number,
  thumbnail: String,
  screenshots: [String],
  type: { type: String, default: 'extension' },
  license: { type: String, default: 'FREE' },
  status: { type: String, default: 'published' },
  is_featured: { type: Boolean, default: false },
  github_url: String,
  packagist_url: String,
  demo_url: String,
  documentation_url: String,
  download_count: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  tags: [String],
  changelog: String,
  category: {
    name: String,
    slug: String,
    color: String,
  },
}, { timestamps: true })

export const Extension = mongoose.models.Extension ?? mongoose.model<IExtension>('Extension', ExtensionSchema)
