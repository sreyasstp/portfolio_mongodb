// ─── Enums ────────────────────────────────────────────────────────────────────

export type PublishStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
export type UserRole = 'ADMIN' | 'USER'
export type AccessLevel = 'FREE' | 'REGISTERED' | 'PREMIUM'
export type ResourceType = 'PDF' | 'NOTES' | 'CHEATSHEET' | 'GUIDE' | 'VIDEO' | 'OTHER'
export type ExtensionType = 'EXTENSION' | 'THEME' | 'MODULE' | 'PLUGIN'
export type ExtensionLicense = 'FREE' | 'MIT' | 'COMMERCIAL'

// ─── Common ───────────────────────────────────────────────────────────────────

export interface PaginatorInfo {
  count: number
  currentPage: number
  hasMorePages: boolean
  lastPage: number
  perPage: number
  total: number
  firstItem?: number
  lastItem?: number
}

export interface Category {
  id: string
  name: string
  slug: string
  color: string
  type?: string
  description?: string
}

// ─── User / Auth ──────────────────────────────────────────────────────────────

export interface UserProfile {
  headline?: string
  bio?: string
  location?: string
  website?: string
  github_url?: string
  linkedin_url?: string
  twitter_url?: string
  resume_url?: string
  years_of_experience?: number
  available_for_hire: boolean
}

export interface User {
  id: string
  name: string
  email: string
  avatar: string | null
  role: UserRole
  is_active?: boolean
  profile?: UserProfile
  created_at?: string
  updated_at?: string
}

export interface AuthPayload {
  access_token: string
  token_type: string
  expires_in: number
  user: User
}

// ─── Blog ─────────────────────────────────────────────────────────────────────

export interface BlogAuthor {
  id: string
  name: string
  avatar: string | null
  profile?: Pick<UserProfile, 'headline'>
}

export interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string
  content?: string
  featured_image: string | null
  tags: string[] | null
  status?: PublishStatus
  is_featured: boolean
  reading_time: number
  view_count: number
  seo_title?: string
  seo_description?: string
  published_at: string | null
  author: BlogAuthor
  category: Category | null
  comments_count?: number
  created_at?: string
  updated_at?: string
}

export interface BlogPaginator {
  paginatorInfo: PaginatorInfo
  data: Blog[]
}

// ─── Skill ────────────────────────────────────────────────────────────────────

export interface Skill {
  id: string
  name: string
  slug: string
  icon?: string
  category: string
  proficiency: number
  is_featured: boolean
  sort_order: number
}

// ─── Project ──────────────────────────────────────────────────────────────────

export interface Project {
  id: string
  title: string
  slug: string
  summary: string
  description?: string
  thumbnail: string | null
  gallery?: string[]
  tech_stack: string[] | null
  live_url: string | null
  github_url: string | null
  case_study_url?: string | null
  status?: PublishStatus
  is_featured: boolean
  completed_at?: string | null
  skills?: Skill[]
  categories?: Category[]
  author?: User
  created_at?: string
}

export interface ProjectPaginator {
  paginatorInfo: PaginatorInfo
  data: Project[]
}

// ─── Extension ────────────────────────────────────────────────────────────────

export interface Extension {
  id: string
  title: string
  slug: string
  short_description: string
  description?: string
  version: string
  magento_versions: string[] | null
  file_name?: string | null
  file_size?: number | null
  download_url?: string | null
  thumbnail: string | null
  screenshots?: string[] | null
  type: ExtensionType
  license: ExtensionLicense
  status?: PublishStatus
  is_featured: boolean
  github_url: string | null
  packagist_url?: string | null
  demo_url?: string | null
  documentation_url?: string | null
  download_count: number
  rating: number
  tags: string[] | null
  changelog?: string | null
  author?: User
  category: Category | null
  created_at?: string
  updated_at?: string
}

export interface ExtensionPaginator {
  paginatorInfo: PaginatorInfo
  data: Extension[]
}

// ─── Learning Resource ────────────────────────────────────────────────────────

export interface LearningResource {
  id: string
  title: string
  slug: string
  description: string
  file_name?: string | null
  file_type?: string | null
  file_size?: number | null
  thumbnail: string | null
  type: ResourceType
  access_level: AccessLevel
  status?: PublishStatus
  download_count: number
  is_featured: boolean
  tags: string[] | null
  author?: User
  category: Category | null
  created_at?: string
}

export interface LearningResourcePaginator {
  paginatorInfo: PaginatorInfo
  data: LearningResource[]
}

// ─── Certification ────────────────────────────────────────────────────────────

export interface Certification {
  id: string
  title: string
  slug: string
  issuer: string
  credential_id?: string
  credential_url?: string
  badge_image: string | null
  description?: string
  study_guide?: string
  exam_topics?: string[]
  recommended_resources?: string[]
  issued_at: string
  expires_at?: string | null
  is_active: boolean
  is_featured: boolean
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export interface Download {
  id: string
  downloadable_type: string
  downloadable_id: string
  created_at: string
  extension?: Extension
  resource?: LearningResource
}

export interface Bookmark {
  id: string
  bookmarkable_type: string
  bookmarkable_id: string
  created_at: string
  blog?: Blog
  extension?: Extension
}

export interface DashboardStats {
  total_downloads: number
  total_bookmarks: number
  recent_downloads: Download[]
  recent_bookmarks: Bookmark[]
}
