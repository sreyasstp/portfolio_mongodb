# Portfolio Frontend

Next.js 14 frontend for the portfolio platform. Consumes the Laravel GraphQL API and renders a dark-themed developer portfolio with a blog, Magento 2 extensions library, learning resources, and a user dashboard.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Data Fetching | Apollo Client (GraphQL) |
| Auth State | Zustand + js-cookie |
| Animations | Framer Motion |
| Markdown | react-markdown + rehype |

---

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx                  # Root layout — fonts, theme, Apollo provider
│   ├── globals.css                 # Tailwind base + custom design tokens
│   ├── (public)/                   # Public-facing pages (no auth required)
│   │   ├── page.tsx                # Home — hero, featured projects, skills, blogs
│   │   ├── about/page.tsx          # About me — bio, skills, career timeline
│   │   ├── portfolio/
│   │   │   ├── page.tsx            # All projects grid with search
│   │   │   └── [slug]/page.tsx     # Project detail — gallery, tech stack, skills
│   │   ├── blog/
│   │   │   ├── page.tsx            # Blog listing with search
│   │   │   ├── BlogListClient.tsx
│   │   │   └── [slug]/
│   │   │       ├── page.tsx        # Blog post detail
│   │   │       └── BlogContent.tsx # Markdown renderer
│   │   ├── extensions/
│   │   │   ├── page.tsx            # Extensions listing with type filters
│   │   │   ├── ExtensionsListClient.tsx
│   │   │   └── [slug]/page.tsx     # Extension detail — download, changelog, screenshots
│   │   ├── resources/page.tsx      # Learning resources with type filters
│   │   └── certifications/page.tsx # Adobe/Magento certifications
│   ├── (auth)/                     # Auth pages (unauthenticated only)
│   │   ├── login/
│   │   │   ├── page.tsx
│   │   │   └── LoginForm.tsx       # Email + Google OAuth login
│   │   └── register/
│   │       ├── page.tsx
│   │       └── RegisterForm.tsx
│   ├── dashboard/                  # Protected pages (login required)
│   │   ├── page.tsx                # Dashboard — stats, quick links, profile
│   │   ├── bookmarks/page.tsx      # Saved blogs and extensions
│   │   └── downloads/page.tsx      # Download history
│   └── api/
│       └── auth/callback/route.ts  # Google OAuth redirect handler
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx              # Fixed nav with dropdown, mobile menu, auth state
│   │   ├── Footer.tsx              # Links, social icons, copyright
│   │   └── PublicLayout.tsx        # Navbar + Footer wrapper for public pages
│   ├── sections/                   # Home page sections
│   │   ├── HeroSection.tsx         # Animated hero with stats and CTA
│   │   ├── FeaturedProjects.tsx    # GraphQL-powered featured projects grid
│   │   ├── SkillsSection.tsx       # Skills with animated progress bars
│   │   ├── FeaturedExtensions.tsx  # Featured extensions cards
│   │   ├── FeaturedBlogs.tsx       # Latest blog posts
│   │   └── CTASection.tsx          # Call to action / contact
│   └── ui/
│       ├── BlogCard.tsx            # Reusable blog card
│       └── ExtensionCard.tsx       # Reusable extension card
│
├── lib/
│   ├── apollo/
│   │   ├── client.ts               # Apollo Client setup
│   │   └── provider.tsx            # ApolloProvider wrapper
│   ├── graphql/
│   │   ├── queries/
│   │   │   ├── blog.ts             # GET_BLOGS, GET_BLOG
│   │   │   ├── extensions.ts       # GET_EXTENSIONS, GET_EXTENSION, GET_LEARNING_RESOURCES
│   │   │   └── portfolio.ts        # GET_PROJECTS, GET_PROJECT, GET_SKILLS, GET_CERTIFICATIONS
│   │   └── mutations/
│   │       ├── auth.ts             # LOGIN, REGISTER, LOGOUT
│   │       └── interactions.ts     # TOGGLE_BOOKMARK, TRACK_DOWNLOAD
│   ├── store/
│   │   └── authStore.ts            # Zustand store — user, token, isAuthenticated
│   └── utils.ts                    # cn() helper (clsx + tailwind-merge)
│
├── types/                          # Shared TypeScript types
├── next.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## Design System

Custom dark theme built on Tailwind. Key tokens:

| Token | Value |
|---|---|
| `brand` | `#f80f01` (red) |
| `dark-900` | `#0a0a0a` (background) |
| `glass` | `bg-white/5 border border-white/10 backdrop-blur` |
| `btn-primary` | Brand red button with glow shadow |
| `btn-ghost` | Border button, turns brand on hover |
| `text-gradient` | White-to-white/60 gradient text |
| `shadow-glow` | `0 0 20px rgba(248,15,1,0.3)` |

---

## Setup

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

### Required `.env.local` values

```env
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:8000/graphql
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Available scripts

```bash
npm run dev        # Development server on :3000
npm run build      # Production build
npm run start      # Start production server
npm run lint       # ESLint
npm run type-check # TypeScript check
```
