import mongoose from 'mongoose'

const MONGODB_URI = 'mongodb+srv://code416:code416@code416.yzuornt.mongodb.net/?retryWrites=true&w=majority'

// ─── Schema Definitions ───────────────────────────────────────────────────────

const SkillSchema = new mongoose.Schema({
  name: String, slug: String, category: String,
  proficiency: { type: Number, default: 0 },
  is_featured: { type: Boolean, default: false },
  sort_order: { type: Number, default: 0 },
  icon: String,
}, { timestamps: true })

const BlogSchema = new mongoose.Schema({
  title: String, slug: { type: String, unique: true }, excerpt: String,
  content: String, featured_image: String, tags: [String],
  status: { type: String, default: 'published' },
  is_featured: { type: Boolean, default: false },
  reading_time: { type: Number, default: 5 },
  view_count: { type: Number, default: 0 },
  published_at: Date,
  category: { name: String, slug: String, color: String },
  author: { name: { type: String, default: 'Sreyas' }, avatar: String, headline: String },
  seo_title: String, seo_description: String,
}, { timestamps: true })

const ExtensionSchema = new mongoose.Schema({
  title: String, slug: { type: String, unique: true }, short_description: String,
  description: String, version: String, magento_versions: [String],
  file_path: String, file_name: String, file_size: Number, thumbnail: String,
  screenshots: [String], type: { type: String, default: 'extension' },
  license: { type: String, default: 'FREE' }, status: { type: String, default: 'published' },
  is_featured: { type: Boolean, default: false },
  github_url: String, packagist_url: String, demo_url: String, documentation_url: String,
  download_count: { type: Number, default: 0 }, rating: { type: Number, default: 0 },
  tags: [String], changelog: String,
  category: { name: String, slug: String, color: String },
}, { timestamps: true })

const LessonSchema = new mongoose.Schema({
  slug: String, title: String, objective_index: Number,
  content: mongoose.Schema.Types.Mixed, sort_order: Number,
}, { _id: true })

const SectionSchema = new mongoose.Schema({
  section_key: { type: String, required: true },
  title: String, weight: Number, description: String,
  objectives: [String], subtopics: [String], sort_order: Number,
  lessons: [LessonSchema],
}, { _id: false })

const ReferenceSchema = new mongoose.Schema({
  title: String, url: String, category: String, description: String, sort_order: Number,
}, { _id: false })

const ExamGuideSchema = new mongoose.Schema({
  slug: { type: String, unique: true }, exam_code: String, title: String,
  short_title: String, level: String, description: String, questions: Number,
  passing_score: Number, duration: Number, cost_usd: Number, experience: String,
  official_url: String, prerequisites: [String], sort_order: Number,
  is_active: { type: Boolean, default: true },
  sections: [SectionSchema], references: [ReferenceSchema],
}, { timestamps: true })

const LearningResourceSchema = new mongoose.Schema({
  title: String, slug: { type: String, unique: true }, description: String,
  file_path: String, file_name: String, file_type: String, file_size: Number,
  thumbnail: String, type: { type: String, default: 'guide' },
  access_level: { type: String, default: 'FREE' }, status: { type: String, default: 'published' },
  download_count: { type: Number, default: 0 }, is_featured: { type: Boolean, default: false },
  tags: [String], category: { name: String, slug: String, color: String },
}, { timestamps: true })

// ─── Models ───────────────────────────────────────────────────────────────────

const Skill = mongoose.model('Skill', SkillSchema)
const Blog = mongoose.model('Blog', BlogSchema)
const Extension = mongoose.model('Extension', ExtensionSchema)
const ExamGuide = mongoose.model('ExamGuide', ExamGuideSchema)
const LearningResource = mongoose.model('LearningResource', LearningResourceSchema)

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

// ─── Seed Data ────────────────────────────────────────────────────────────────

const skillsData = [
  { name: 'Magento 2', category: 'magento', proficiency: 95, is_featured: true },
  { name: 'Adobe Commerce', category: 'magento', proficiency: 90, is_featured: true },
  { name: 'PHP 8.x', category: 'backend', proficiency: 92, is_featured: true },
  { name: 'Laravel', category: 'backend', proficiency: 88, is_featured: true },
  { name: 'MySQL', category: 'backend', proficiency: 85 },
  { name: 'GraphQL', category: 'backend', proficiency: 82 },
  { name: 'Redis', category: 'backend', proficiency: 78 },
  { name: 'React / Next.js', category: 'frontend', proficiency: 80, is_featured: true },
  { name: 'TypeScript', category: 'frontend', proficiency: 78 },
  { name: 'Tailwind CSS', category: 'frontend', proficiency: 90 },
  { name: 'Docker', category: 'devops', proficiency: 75 },
  { name: 'CI/CD (GitHub Actions)', category: 'devops', proficiency: 72 },
  { name: 'AWS (S3, EC2)', category: 'devops', proficiency: 68 },
]

const blogsData = [
  {
    title: 'Magento 2 Plugin System: A Complete Guide',
    slug: 'magento-2-plugin-system-complete-guide',
    excerpt: 'Deep dive into the Magento 2 plugin (interceptor) system. Learn when to use before, around, and after plugins with real-world examples.',
    content: "# Magento 2 Plugin System\n\nPlugins are one of Magento 2's most powerful features...\n\n## Types of Plugins\n\n### Before Plugin\n```php\npublic function beforeGetName(\\Magento\\Catalog\\Model\\Product $subject): array\n{\n    return [];\n}\n```\n\n### Around Plugin\n```php\npublic function aroundGetName(\\Magento\\Catalog\\Model\\Product $subject, callable $proceed): string\n{\n    return strtoupper($proceed());\n}\n```",
    tags: ['magento2', 'php', 'plugins', 'interceptors'],
    status: 'published',
    is_featured: true,
    reading_time: 8,
    published_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    category: { name: 'Magento Development', slug: 'magento-development', color: '#f80f01' },
    author: { name: 'Sreyas', headline: 'Magento 2 Certified Developer' },
  },
]

const extensionsData = [
  {
    title: 'Magento 2 Redis Session Optimizer',
    slug: 'magento-2-redis-session-optimizer',
    short_description: 'Optimize Redis session handling in Magento 2 with automatic TTL management and session locking improvements.',
    description: '## Overview\n\nThis extension optimizes Redis session configuration automatically...\n\n## Installation\n\n```bash\ncomposer require sreyas/redis-session-optimizer\nphp bin/magento module:enable Sreyas_RedisOptimizer\nphp bin/magento setup:upgrade\n```',
    version: '1.2.0',
    magento_versions: ['2.4.6', '2.4.5', '2.4.4'],
    type: 'extension',
    license: 'free',
    status: 'published',
    is_featured: true,
    github_url: 'https://github.com/sreyas/magento2-redis-optimizer',
    tags: ['redis', 'performance', 'session', 'magento2'],
    category: { name: 'Performance', slug: 'performance', color: '#10b981' },
  },
  {
    title: 'Admin Log Viewer',
    slug: 'zeevoc-admin-log-viewer',
    short_description: 'View Magento system.log and exception.log directly in the admin panel — no SSH or server access needed.',
    description: '## Overview\n\nZeevoc_AdminLogViewer lets you read `var/log/system.log` and `var/log/exception.log` from inside the Magento Admin UI.\n\n## Features\n\n- View **system.log** and **exception.log** live\n- Color-coded severity levels\n- Admin menu item under **System → Zeevoc → Log Viewer**\n\n## Installation\n\n```bash\ncp -r AdminLogViewer app/code/Zeevoc/\nphp bin/magento module:enable Zeevoc_AdminLogViewer\nphp bin/magento setup:upgrade\nphp bin/magento cache:clean\n```',
    version: '1.0.0',
    magento_versions: ['2.4.6', '2.4.5', '2.4.4', '2.4.3', '2.3.x'],
    file_path: 'extensions/Zeevoc_AdminLogViewer_1.0.0.zip',
    file_name: 'Zeevoc_AdminLogViewer_1.0.0.zip',
    file_size: 12542,
    type: 'extension',
    license: 'free',
    status: 'published',
    is_featured: true,
    tags: ['admin', 'logs', 'debugging', 'system-log', 'devtools'],
    changelog: JSON.stringify([{ version: '1.0.0', date: '2024-01-01', notes: 'Initial release.' }]),
    category: { name: 'Admin Tools', slug: 'admin-tools', color: '#f80f01' },
  },
  {
    title: 'Advanced Frontend Toolkit',
    slug: 'zeevoc-advanced-frontend',
    short_description: 'A collection of production-ready Magento 2 frontend components — widgets, mixins, PageBuilder blocks, email templates, and a custom full-bleed layout.',
    description: '## Overview\n\nZeevoc_AdvancedFrontend is a reference module and toolkit packed with patterns you\'ll reuse across every Magento 2 project.\n\n## What\'s Included\n\n### Widgets\n- Announcement Banner\n- Trust Badge\n- Back-in-Stock form widget\n\n### JS Components & Mixins\n- price-utils-mixin\n- modal-midnight-mixin\n\n## Installation\n\n```bash\ncp -r AdvancedFrontend app/code/Zeevoc/\nphp bin/magento module:enable Zeevoc_AdvancedFrontend\nphp bin/magento setup:upgrade\nphp bin/magento setup:static-content:deploy\nphp bin/magento cache:clean\n```',
    version: '1.0.0',
    magento_versions: ['2.4.6', '2.4.5', '2.4.4'],
    file_path: 'extensions/Zeevoc_AdvancedFrontend_1.0.0.zip',
    file_name: 'Zeevoc_AdvancedFrontend_1.0.0.zip',
    file_size: 221380,
    type: 'module',
    license: 'free',
    status: 'published',
    is_featured: true,
    tags: ['frontend', 'widgets', 'pagebuilder', 'email', 'layout', 'js-mixins', 'toolkit'],
    changelog: JSON.stringify([{ version: '1.0.0', date: '2024-01-01', notes: 'Initial release.' }]),
    category: { name: 'Frontend', slug: 'frontend', color: '#3b82f6' },
  },
  {
    title: 'Wishlist Report',
    slug: 'zeevoc-wishlist-report',
    short_description: 'Admin panel wishlist report — see which products customers are saving, with customer details, product SKUs, and wishlist counts.',
    description: '## Overview\n\nZeevoc_WishlistReport adds a dedicated Wishlist Report grid to your Magento 2 admin panel.\n\n## Features\n\n- Wishlist grid under Reports → Customers → Wishlist Report\n- See customer name, email, product name, SKU, and date added\n- Filter and sort by any column\n- Export to CSV\n\n## Installation\n\n```bash\ncp -r WishlistReport app/code/Zeevoc/\nphp bin/magento module:enable Zeevoc_WishlistReport\nphp bin/magento setup:upgrade\nphp bin/magento cache:clean\n```',
    version: '1.0.0',
    magento_versions: ['2.4.6', '2.4.5', '2.4.4', '2.4.3', '2.3.x'],
    file_path: 'extensions/Zeevoc_WishlistReport_1.0.0.zip',
    file_name: 'Zeevoc_WishlistReport_1.0.0.zip',
    file_size: 11000,
    type: 'extension',
    license: 'free',
    status: 'published',
    is_featured: true,
    tags: ['wishlist', 'reports', 'admin', 'customers', 'analytics'],
    changelog: JSON.stringify([{ version: '1.0.0', date: '2026-04-17', notes: 'Initial release.' }]),
    category: { name: 'Reporting', slug: 'reporting', color: '#8b5cf6' },
  },
]

const learningResourcesData = [
  {
    title: 'Magento 2 Developer Certification Study Guide',
    slug: 'magento-2-developer-certification-study-guide',
    description: 'Comprehensive study guide covering all topics in the Magento 2 Certified Developer exam.',
    file_type: 'pdf',
    type: 'guide',
    access_level: 'registered',
    status: 'published',
    is_featured: true,
    tags: ['certification', 'study-guide', 'magento2'],
    category: { name: 'Study Guides', slug: 'study-guides', color: '#3b82f6' },
  },
]

// ─── Full Exam Guide Data ─────────────────────────────────────────────────────

const examGuidesData = [
  {
    slug: 'business-practitioner-professional',
    exam_code: 'AD0-E712',
    title: 'Adobe Commerce Business Practitioner Professional',
    short_title: 'Business Practitioner Pro',
    level: 'Professional',
    description: 'Entry-level certification for merchants, business analysts, and eCommerce managers. Validates knowledge of Magento Open Source features, the Adobe Commerce edition differentiators, digital marketing fundamentals, and basic compliance.',
    questions: 50,
    passing_score: 30,
    duration: 100,
    cost_usd: 125,
    experience: '0–12 months hands-on experience with Magento Open Source 2.4.x',
    official_url: 'https://certification.adobe.com/certification/business-practitioner-professional/202',
    sort_order: 0,
    is_active: true,
    sections: [
      {
        section_key: 'core-features',
        title: 'Magento Open Source Core Features',
        weight: 49,
        description: 'The largest section — covers the day-to-day store management capabilities available to every merchant in Magento Open Source.',
        objectives: [
          'Identify the features of Magento Open Source',
          'Distinguish the correct scope and when to use each',
          'Demonstrate knowledge of Catalog Management',
          'Manipulate pricing by using Magento Open Source features',
          'Describe the standard customer journey',
          'Describe the standard order lifecycle',
          'Describe the day-to-day tasks involved in Store maintenance',
          'Explain the different types of content elements and when to use',
        ],
        subtopics: [
          'Website → Store → Store View hierarchy and when each scope applies',
          'Product types: Simple, Configurable, Grouped, Bundle, Virtual, Downloadable — use cases for each',
          'Category management: anchor vs non-anchor, display modes, layered navigation attributes',
          'Pricing: special prices, tier prices, group prices, catalog price rules',
          'Customer journey: browse → cart → checkout → account → reorder',
          'Order lifecycle: Pending → Processing → Complete / Closed / Cancelled / On Hold',
          'Store maintenance: cache flush, indexers, cron, backup, admin logs',
          'Content: CMS Pages, CMS Blocks, Widgets, Page Builder, Dynamic Blocks',
        ],
        sort_order: 0,
        lessons: [],
      },
      {
        section_key: 'adobe-commerce-basics',
        title: 'Adobe Commerce Basics',
        weight: 14,
        description: 'Features exclusive to the paid Adobe Commerce edition that go beyond what Magento Open Source offers.',
        objectives: [
          'Identify the key features available in Adobe Commerce',
          'Identify service Add-ons in Adobe Commerce',
          'Identify hosting options for Adobe Commerce',
        ],
        subtopics: [
          'B2B module: company accounts, shared catalogs, negotiable quotes, purchase orders, requisition lists',
          'Reward points, store credit, and gift registry',
          'Content staging and preview — schedule product and CMS changes in advance',
          'Customer segmentation and dynamic rule-based blocks',
          'Adobe Commerce SaaS services: Live Search, Product Recommendations, Payment Services',
          'Hosting: Adobe Commerce on Cloud (PaaS) vs managed vs self-hosted',
        ],
        sort_order: 1,
        lessons: [],
      },
      {
        section_key: 'digital-marketing',
        title: 'Digital Marketing & eCommerce Fundamentals',
        weight: 24,
        description: 'Core digital marketing knowledge that eCommerce practitioners are expected to know regardless of platform.',
        objectives: [
          'Identify the basic uses of Digital Marketing tools',
          'Explain the basic principles of SEO',
          'Identify the basic uses of common eCommerce tools',
          'Identify the key features of an eCommerce website',
          'Identify the basic eCommerce concepts',
        ],
        subtopics: [
          'Google Analytics 4: sessions, conversions, e-commerce tracking events',
          'Google Tag Manager: trigger/tag concept, dataLayer',
          'SEO basics: meta titles, descriptions, canonical URLs, XML sitemaps, URL rewrites in Magento',
          'Email marketing: transactional emails vs promotional',
          'eCommerce KPIs: CVR, AOV, CLV, cart abandonment rate',
        ],
        sort_order: 2,
        lessons: [],
      },
      {
        section_key: 'compliance-security',
        title: 'Compliance & Security Basics',
        weight: 13,
        description: 'Foundational regulatory and security awareness every merchant must have.',
        objectives: [
          'Understand the basics of compliance for privacy laws and payment security',
          'Identify common security aspects of an Adobe Commerce project',
          'Identify best practices and legal requirements of accessibility compliance',
        ],
        subtopics: [
          'PCI DSS: scope for merchants, SAQ types (A, A-EP, D), tokenisation reducing scope',
          'GDPR / CCPA: right to erasure, data portability, consent',
          'WCAG 2.1 accessibility: Magento Luma\'s AA compliance posture',
          'Two-factor authentication (2FA) enforcement for admin users',
          'Admin hardening: custom admin URL, admin IP allowlist, reCAPTCHA',
        ],
        sort_order: 3,
        lessons: [],
      },
    ],
    references: [
      { title: 'Official Exam Page — AD0-E712', url: 'https://certification.adobe.com/certification/business-practitioner-professional/202', category: 'official', description: 'Schedule the exam, download the official study guide.', sort_order: 0 },
      { title: 'Adobe Commerce Merchant User Guide', url: 'https://experienceleague.adobe.com/docs/commerce-admin/user-guides/home.html', category: 'devdocs', description: 'Full admin reference — catalog, orders, marketing, content.', sort_order: 1 },
      { title: 'B2B for Adobe Commerce', url: 'https://experienceleague.adobe.com/docs/commerce-admin/b2b/guide-overview.html', category: 'devdocs', description: 'Company accounts, shared catalogs, purchase orders reference.', sort_order: 2 },
      { title: 'SwiftOtter BP Pro Prep', url: 'https://swiftotter.com/training/merchant-training/adobe-commerce-business-practitioner-ad0-e712-exam-prep', category: 'training', description: 'Practice exams and study guide for AD0-E712.', sort_order: 3 },
    ],
  },
  {
    slug: 'developer-professional',
    exam_code: 'AD0-E724',
    title: 'Adobe Commerce Developer Professional',
    short_title: 'Developer Pro',
    level: 'Professional',
    description: 'Entry-level backend developer certification. Tests core Magento 2 architecture — module structure, customisation techniques (plugins, preferences, observers), the caching and indexing systems, and Cloud fundamentals.',
    questions: 50,
    passing_score: 39,
    duration: 100,
    cost_usd: 125,
    experience: '0–12 months hands-on Magento 2 backend development',
    official_url: 'https://certification.adobe.com/certification/adobe-commerce-developer-professional-v2/1242',
    sort_order: 1,
    is_active: true,
    sections: [
      {
        section_key: 'architecture',
        title: 'Architecture',
        weight: 52,
        description: 'The majority of the exam — covers the Magento framework internals every developer must understand to build maintainable modules.',
        objectives: [
          'Describe module file structure',
          'Describe Adobe Commerce CLI commands',
          'Describe CRON functionality',
          'Describe index functionality',
          'Explain components (plugin, preference, observers etc.)',
          'Describe the Magento caching system',
          'Describe stores, websites, and store views',
        ],
        subtopics: [
          'Module anatomy: registration.php, module.xml, composer.json, etc/config.xml, etc/di.xml',
          'CLI commands: setup:upgrade, cache:flush, indexer:reindex, setup:static-content:deploy, setup:di:compile',
          'CRON: crontab.xml, cron groups (default vs index)',
          'Indexers: full reindex vs partial, indexer modes (Update on Save vs Schedule)',
          'Plugins (interceptors): before / after / around — sortOrder, disabled flag, area scope',
          'Preferences: full class rewrite in di.xml — when to use vs plugins',
          'Observers: events.xml, EventManagerInterface::dispatch, asynchronous events',
          'Cache types: full_page, block_html, config, layout, translate — tags and invalidation',
        ],
        sort_order: 0,
        lessons: [],
      },
      {
        section_key: 'customizations',
        title: 'Customizations',
        weight: 36,
        description: 'Hands-on customisation across the catalog, checkout, entity layer, and APIs.',
        objectives: [
          'Demonstrate knowledge of how to operate the catalog',
          'Explain check out and sales operations',
          'Manipulate entity types programmatically',
          'Identify API features',
        ],
        subtopics: [
          'Catalog: CategoryRepositoryInterface, ProductRepositoryInterface, SearchCriteria builder pattern',
          'Checkout: quote lifecycle, QuoteManagementInterface, custom totals',
          'Order management: OrderManagementInterface, invoice/shipment/creditmemo services',
          'REST API: route.xml, acl.xml resources, request/response schema',
          'GraphQL: extending schema, resolvers, mutations — basic pattern',
        ],
        sort_order: 1,
        lessons: [],
      },
      {
        section_key: 'cloud',
        title: 'Cloud',
        weight: 12,
        description: 'Core Adobe Commerce Cloud concepts — environment structure, configuration files, and CLI usage.',
        objectives: [
          'Describe Adobe Commerce Cloud architecture',
          'Describe the setup and configuration of Adobe Commerce Cloud',
          'Recall the Adobe Commerce Cloud CLI tool',
        ],
        subtopics: [
          'Cloud environment types: Integration, Staging, Production — branch-per-environment model',
          'Configuration files: .magento.app.yaml, routes.yaml, services.yaml',
          'ECE-tools: build phase, deploy phase, post-deploy',
          'Cloud CLI: magento-cloud environment:ssh, tunnel:open, variable:set',
        ],
        sort_order: 2,
        lessons: [],
      },
    ],
    references: [
      { title: 'Official Exam Page — AD0-E724', url: 'https://certification.adobe.com/certification/adobe-commerce-developer-professional-v2/1242', category: 'official', description: 'Schedule the exam, download the official study guide.', sort_order: 0 },
      { title: 'Adobe Commerce PHP Developer Guide', url: 'https://developer.adobe.com/commerce/php/development/', category: 'devdocs', description: 'Plugins, DI, observers, service contracts — the full backend dev reference.', sort_order: 1 },
      { title: 'magento/magento2 — GitHub', url: 'https://github.com/magento/magento2', category: 'github', description: 'Study core module implementations to understand real patterns.', sort_order: 2 },
      { title: 'SwiftOtter Developer Professional Prep', url: 'https://swiftotter.com/training/developers/professional-developer-ado0-e717-exam-preparation', category: 'training', description: 'Most recommended practice exam and study guide.', sort_order: 3 },
    ],
  },
  {
    slug: 'frontend-developer-professional',
    exam_code: 'AD0-E726',
    title: 'Adobe Commerce Front-End Developer Professional',
    short_title: 'Frontend Dev Pro',
    level: 'Professional',
    description: 'Entry-level frontend certification. Tests theme architecture, Layout XML, LESS styling, JavaScript (RequireJS, KnockoutJS, jQuery), admin theme configuration, and the Magento CLI used in daily frontend workflows.',
    questions: 50,
    passing_score: 33,
    duration: 100,
    cost_usd: 125,
    experience: '0–12 months frontend development on Adobe Commerce 2.4.x',
    official_url: 'https://certification.adobe.com/certification/front-end-developer-professional-new-v2/1247',
    sort_order: 2,
    is_active: true,
    sections: [
      {
        section_key: 'theme-management',
        title: 'Theme Management',
        weight: 16,
        description: 'Understand how Magento resolves static files via the theme fallback hierarchy and how to scaffold a new theme correctly.',
        objectives: [
          'Describe Adobe Commerce theme folder structure',
          'Demonstrate ability to create new or extend existing themes',
          'Demonstrate ability to add custom translation phrases',
        ],
        subtopics: [
          'Theme folder anatomy: registration.php, theme.xml, composer.json, web/, Magento_*/templates/',
          'Theme fallback chain: custom → parent (Luma/Blank) → module → base/lib',
          'Create a custom child theme: theme.xml <parent> declaration',
          'Translation: i18n/en_US.csv in theme folder, CSV format',
        ],
        sort_order: 0,
        lessons: [],
      },
      {
        section_key: 'layout-templates',
        title: 'Layout XML & Templates',
        weight: 23,
        description: 'The XML-driven rendering pipeline that controls page structure.',
        objectives: [
          'Describe the basic layout XML instructions',
          'Describe existing page layouts',
          'Describe the steps for extending and overriding Layout XML',
          'Demonstrate ability to create and customize phtml templates',
        ],
        subtopics: [
          'Layout XML instructions: block, container, referenceBlock, referenceContainer, move, remove',
          'Page layouts: empty, 1column, 2columns-left, 2columns-right, 3columns',
          'Extending layout: add file in theme/Module_Name/layout/ alongside core file (merged)',
          'Overriding layout: place file in theme/Module_Name/layout/override/base/',
          'phtml templates: $block->getChildHtml(), getData(), $escaper->escapeHtml()',
        ],
        sort_order: 1,
        lessons: [],
      },
      {
        section_key: 'styles',
        title: 'Styles',
        weight: 19,
        description: "Magento's LESS preprocessor system.",
        objectives: [
          'Identify the purpose of different LESS files',
          'Describe how to override or extend LESS files',
        ],
        subtopics: [
          'LESS file roles: _module.less, _extend.less, _theme.less',
          'Compiled files: styles-m.less (mobile), styles-l.less (desktop)',
          'Override pattern: replicate file path under theme/Module_Name/web/css/source/',
          'Magento UI LESS library: lib/web/css/source/lib/',
        ],
        sort_order: 2,
        lessons: [],
      },
      {
        section_key: 'javascript',
        title: 'JavaScript',
        weight: 20,
        description: "Client-side behaviour using Magento's AMD module system.",
        objectives: [
          'Demonstrate the usage of RequireJS',
          'Describe the usage of mixins',
          'Describe the usage of Knockout JS',
          'Describe the usage of jQuery widgets',
        ],
        subtopics: [
          'RequireJS: define([deps], factory) and require([deps], callback) — AMD module pattern',
          'Mixins: requirejs-config.js config.mixins — patch a core AMD module without overriding it',
          'KnockoutJS: ko.observable(), ko.observableArray(), ko.computed()',
          'jQuery Widget Factory: $.widget("mage.widgetName", {_create, _on})',
        ],
        sort_order: 3,
        lessons: [],
      },
      {
        section_key: 'admin-configuration',
        title: 'Admin Configuration',
        weight: 12,
        description: 'Using the Commerce admin to apply and manage themes.',
        objectives: [
          'Apply or schedule a theme to a specific scope',
          'Apply design changes to categories, products and CMS pages',
          'Describe steps to customize transactional emails',
        ],
        subtopics: [
          'Theme assignment: Content → Design → Configuration → store-view scope',
          'Schedule a theme change: Design Schedule with date range',
          'Transactional emails: Marketing → Communications → Email Templates',
        ],
        sort_order: 4,
        lessons: [],
      },
      {
        section_key: 'cli',
        title: 'CLI',
        weight: 10,
        description: 'The Magento CLI commands used daily in frontend development workflows.',
        objectives: [
          'Describe the usage of basic bin/Magento commands',
          'Describe additional tools that Commerce Cloud provides',
        ],
        subtopics: [
          'bin/magento setup:static-content:deploy: --area, --theme, --locale, -j (jobs)',
          'bin/magento cache:clean / cache:flush',
          'bin/magento deploy:mode:set developer|production|default',
        ],
        sort_order: 5,
        lessons: [],
      },
    ],
    references: [
      { title: 'Official Exam Page — AD0-E726', url: 'https://certification.adobe.com/certification/front-end-developer-professional-new-v2/1247', category: 'official', description: 'Schedule the exam, download the official study guide.', sort_order: 0 },
      { title: 'Frontend Developer Guide', url: 'https://developer.adobe.com/commerce/frontend-core/guide/', category: 'devdocs', description: 'Full official reference: themes, layouts, LESS, JavaScript.', sort_order: 1 },
      { title: 'Mage2.TV Frontend Courses', url: 'https://mage2.tv', category: 'training', description: 'Video tutorials: theme creation, LESS, RequireJS, UI components.', sort_order: 2 },
    ],
  },
  {
    slug: 'business-practitioner-expert',
    exam_code: 'AD0-E708',
    title: 'Adobe Commerce Business Practitioner Expert',
    short_title: 'Business Practitioner Expert',
    level: 'Expert',
    description: 'Advanced certification for solutions consultants, project managers, and senior merchants. Tests deep platform knowledge across all Commerce editions, B2B, merchandising, systems architecture, and compliance.',
    questions: 50,
    passing_score: 31,
    duration: 100,
    cost_usd: 225,
    experience: '1–3 years hands-on Adobe Commerce in a business or solutions role',
    official_url: 'https://certification.adobe.com/certification/adobe-commerce-business-practitioner-expert/201',
    prerequisites: ['Adobe Commerce Business Practitioner Professional (AD0-E712) recommended'],
    sort_order: 3,
    is_active: true,
    sections: [
      {
        section_key: 'core-config',
        title: 'Core Features & General Configuration',
        weight: 46,
        description: 'Expert-level command of the full Commerce feature set.',
        objectives: [
          'Identify the features of Adobe Commerce Open Source Edition and Commerce Edition',
          'Determine how to utilize product types and their features to meet customer requirements',
          'Demonstrate knowledge of the admin panel',
          'Understand how to natively configure cart and checkout',
        ],
        subtopics: [
          'Edition matrix: Open Source vs Commerce vs Commerce Cloud',
          'Product type selection: when to use Configurable vs Bundle vs Grouped',
          'Import/export: CSV format, import validation modes',
          'Cart and checkout configuration: one-page checkout, guest checkout',
          'Order management: custom order statuses, state machine',
        ],
        sort_order: 0,
        lessons: [],
      },
      {
        section_key: 'merchandising',
        title: 'Merchandising',
        weight: 10,
        description: "Drive revenue through Commerce's native merchandising and pricing engine.",
        objectives: [
          'Demonstrate the ability to create promotions',
          'Demonstrate ability to manage categories and products',
          'Understand the different pricing configurations',
        ],
        subtopics: [
          'Cart price rules: conditions, actions, coupon management',
          'Catalog price rules: priority, stop-further-rules flag',
          'Final price calculation chain: base → special → tier → group → catalog rule → cart rule',
          'Visual merchandiser: sort-by-rule categories',
        ],
        sort_order: 1,
        lessons: [],
      },
      {
        section_key: 'digital-marketing',
        title: 'Digital Marketing',
        weight: 4,
        description: 'Targeted marketing and analytics knowledge.',
        objectives: [
          'Recommend best practices for SEO using native features',
          'Assess common metrics in Google Analytics and BI',
        ],
        subtopics: [
          'SEO native features: URL rewrites, canonical tags, HTML sitemap, XML sitemap',
          'Google Analytics 4: eCommerce events (view_item, add_to_cart, purchase)',
        ],
        sort_order: 2,
        lessons: [],
      },
      {
        section_key: 'addon-modules',
        title: 'Add-on Modules & Additional Products',
        weight: 18,
        description: 'Adobe Commerce-specific add-ons and how they address real business scenarios.',
        objectives: [
          'Describe the B2B functionality',
          'Apply business requirements to suggest a solution using MSI',
          'Distinguish the differences between native search and LiveSearch',
        ],
        subtopics: [
          'B2B scenarios: distributor with sub-buyers, RFQ workflow, ERP-synced shared catalogs',
          'MSI: source vs stock, Source Selection Algorithms, ship from store',
          'Native search vs Live Search: Elasticsearch on-prem vs SaaS',
        ],
        sort_order: 3,
        lessons: [],
      },
      {
        section_key: 'systems-architecture',
        title: 'Systems Architecture',
        weight: 10,
        description: 'Make informed platform and integration architecture decisions.',
        objectives: [
          'Evaluate requirements to determine which websites, stores, and store view are necessary',
          'Identify and analyze performance metrics',
          'Differentiate between headless approaches and traditional',
        ],
        subtopics: [
          'Multi-site architecture: single instance shared catalog vs separate databases',
          'Integration patterns: REST API, GraphQL, message queues, webhooks',
          'Headless vs traditional: Luma vs PWA Studio vs third-party headless',
        ],
        sort_order: 4,
        lessons: [],
      },
      {
        section_key: 'compliance-security',
        title: 'Compliance & Security',
        weight: 12,
        description: 'Expert-level compliance and security posture for enterprise deployments.',
        objectives: [
          'Demonstrate how to secure the Adobe Commerce data access with roles and permissions',
          'Understand the basics of compliance for privacy laws and payment security',
          'Explain common security aspects of an Adobe Commerce project',
        ],
        subtopics: [
          'Admin ACL: role resources, scope-locked admin users, two-factor authentication enforcement',
          'PCI DSS: SAQ A vs SAQ D scope, tokenisation',
          'GDPR: customer data export, erasure request workflow',
          'Security hardening: Security Scan Tool, admin IP restriction, CAPTCHA',
        ],
        sort_order: 5,
        lessons: [],
      },
    ],
    references: [
      { title: 'Official Exam Page — AD0-E708', url: 'https://certification.adobe.com/certification/adobe-commerce-business-practitioner-expert/201', category: 'official', description: 'Schedule the exam, download the official study guide.', sort_order: 0 },
      { title: 'Adobe Commerce Merchant Docs', url: 'https://experienceleague.adobe.com/docs/commerce-admin/user-guides/home.html', category: 'devdocs', description: 'Full admin user guide.', sort_order: 1 },
      { title: 'SwiftOtter BP Expert Prep', url: 'https://swiftotter.com/training/merchant-training/adobe-commerce-business-practitioner-ad0-e708-exam-prep', category: 'training', description: "Known as one of the harder exams — SwiftOtter's guide is the top resource.", sort_order: 2 },
    ],
  },
  {
    slug: 'developer-expert',
    exam_code: 'AD0-E725',
    title: 'Adobe Commerce Developer Expert',
    short_title: 'Developer Expert',
    level: 'Expert',
    description: 'The most sought-after backend certification. Tests advanced architecture mastery, external integrations via App Builder and Adobe I/O, deep customisation across catalog/checkout/admin/APIs, message queues, and Cloud infrastructure.',
    questions: 50,
    passing_score: 33,
    duration: 100,
    cost_usd: 225,
    experience: '1–3 years professional Adobe Commerce backend development',
    official_url: 'https://certification.adobe.com/certification/adobe-commerce-developer-expert-v2/1234',
    prerequisites: ['Adobe Commerce Developer Professional (AD0-E724) recommended'],
    sort_order: 4,
    is_active: true,
    sections: [
      {
        section_key: 'architecture',
        title: 'Architecture',
        weight: 38,
        description: 'Advanced framework internals — caching, security, multi-site constraints, indexing, CRON, and the full plugin system.',
        objectives: [
          'Demonstrate how to effectively use cache in Adobe Commerce',
          'Demonstrate knowledge of components (plugin, preference, observers etc.)',
          'Explain Adobe Commerce security features',
          'Explain how the CRON scheduling system works',
          'Explain index functionality',
        ],
        subtopics: [
          'Cache: custom cache types, cache tags, block cache, full-page cache (Varnish/built-in)',
          'Plugins: sortOrder, disabled flag, area-specific di.xml',
          'Preferences vs plugins: full rewrite risks',
          'Security: CSP headers, form keys (CSRF tokens), $escaper helper, input sanitisation',
          'CRON groups: default vs index — separate cron processes',
          'Indexers: IndexerInterface, mview.xml for changelog-based partial reindex',
        ],
        sort_order: 0,
        lessons: [],
      },
      {
        section_key: 'external-integrations',
        title: 'External Integrations',
        weight: 14,
        description: "Modern Adobe Commerce integration patterns using Adobe's composability stack.",
        objectives: [
          'Customize the data flow in and out of SaaS services',
          'Utilize App Builder',
          'Utilize Adobe I/O events and Webhooks',
        ],
        subtopics: [
          'SaaS data sync: catalog-data-export module, feed indexers',
          'Adobe App Builder: serverless runtime on Adobe I/O, actions as microservices',
          'Adobe I/O Events: subscribe to Commerce events, webhook delivery to App Builder',
        ],
        sort_order: 1,
        lessons: [],
      },
      {
        section_key: 'customizations',
        title: 'Customizations',
        weight: 32,
        description: 'Deep hands-on customisation across catalog, checkout, EAV entities, admin panel, APIs, and message queues.',
        objectives: [
          'Customize the catalog',
          'Customize check out and sales operations',
          'Customize the admin panel',
          'Customize APIs',
          'Demonstrate the ability to leverage existing message queues',
        ],
        subtopics: [
          'Catalog: custom product types, price model, stock status provider',
          'Checkout: custom step, custom total (TotalCollectorInterface), payment method',
          'Admin panel: custom grid (listing UI component), custom form, dynamic rows',
          'REST API: custom route (webapi.xml), custom interface + model',
          'GraphQL: schema.graphqls extension, custom resolver, mutation',
          'Message queues: queue.xml, publisher, consumer group, RabbitMQ vs DB queue',
        ],
        sort_order: 2,
        lessons: [],
      },
      {
        section_key: 'cloud',
        title: 'Cloud',
        weight: 16,
        description: 'Advanced Cloud infrastructure — architecture, full environment setup, and the Cloud CLI.',
        objectives: [
          'Explain Adobe Commerce Cloud architecture',
          'Setup and configure Adobe Commerce Cloud',
          'Utilize Adobe Commerce Cloud CLI tool',
        ],
        subtopics: [
          'Pro vs Starter architecture: dedicated Staging + Production vs 4 environments',
          'ECE-tools build/deploy/post-deploy phases',
          'Fastly integration: VCL snippets, WAF, image optimisation',
          'New Relic APM: distributed tracing, deployment markers',
        ],
        sort_order: 3,
        lessons: [],
      },
    ],
    references: [
      { title: 'Official Exam Page — AD0-E725', url: 'https://certification.adobe.com/certification/adobe-commerce-developer-expert-v2/1234', category: 'official', description: 'Schedule the exam, download the official study guide.', sort_order: 0 },
      { title: 'Adobe Commerce PHP Developer Guide', url: 'https://developer.adobe.com/commerce/php/development/', category: 'devdocs', description: 'Advanced backend dev reference.', sort_order: 1 },
      { title: 'Adobe App Builder Documentation', url: 'https://developer.adobe.com/app-builder/docs/overview/', category: 'devdocs', description: 'Build and deploy App Builder apps that integrate with Commerce.', sort_order: 2 },
      { title: 'SwiftOtter Developer Expert Guide', url: 'https://swiftotter.com/training/developers', category: 'training', description: 'The most comprehensive paid study resource for the Developer Expert exam.', sort_order: 3 },
    ],
  },
  {
    slug: 'frontend-developer-expert',
    exam_code: 'AD0-E727',
    title: 'Adobe Commerce Front-End Developer Expert',
    short_title: 'Frontend Dev Expert',
    level: 'Expert',
    description: 'Advanced frontend certification testing expert-level theme creation, complex Layout XML manipulation, LESS library components, JavaScript (RequireJS, mixins, KnockoutJS, jQuery), Page Builder customisation, and admin UI extensibility.',
    questions: 50,
    passing_score: 37,
    duration: 100,
    cost_usd: 225,
    experience: '1–3 years professional Adobe Commerce frontend development',
    official_url: 'https://certification.adobe.com/certification/front-end-developer-expert-v2/1250',
    prerequisites: ['Adobe Commerce Front-End Developer Professional (AD0-E726) recommended'],
    sort_order: 5,
    is_active: true,
    sections: [
      {
        section_key: 'theme-management',
        title: 'Theme Management',
        weight: 10,
        description: 'Create themes from scratch, extend existing themes safely, and own the full transactional email layer.',
        objectives: [
          'Demonstrate the ability to create a new theme',
          'Demonstrate ability to extend existing themes',
          'Demonstrate ability to customize transactional emails',
        ],
        subtopics: [
          'Create a standalone theme: registration.php, theme.xml, composer.json',
          'Theme inheritance depth: multi-level parent chain and fallback traversal',
          'Transactional email full stack: email_*.html layout handle → template → inline CSS',
        ],
        sort_order: 0,
        lessons: [],
      },
      {
        section_key: 'layout-templates',
        title: 'Layout XML & Templates',
        weight: 22,
        description: 'Expert-level control over the rendering pipeline.',
        objectives: [
          'Demonstrate the ability to utilize layout XML instructions',
          'Demonstrate the ability to create new page layouts',
          'Understand the difference between extending/merging and overriding XML',
        ],
        subtopics: [
          'All layout instructions: block, container, referenceBlock, referenceContainer, move, remove, update, body, head',
          'Creating new page layouts: page_layout/*.xml in module or theme, register in layouts.xml',
          'Extending (merging): layout file placed in same path — instructions are merged/appended',
          'Overriding: file placed in override/base/ or override/theme/',
          'View Models over Block: ViewModelInterface, injected via <argument> in layout XML',
        ],
        sort_order: 1,
        lessons: [],
      },
      {
        section_key: 'styles',
        title: 'Styles',
        weight: 12,
        description: 'Advanced LESS development — working with the Magento UI library components at expert depth.',
        objectives: [
          'Explain the purpose of different LESS files',
          'Demonstrate the ability to work with LESS files',
          'Implement and customize LESS library components',
        ],
        subtopics: [
          'LESS library components: buttons (.lib-button()), forms (.lib-form-field()), tabs (.lib-tabs())',
          'Customise a UI library component: override its variables in _theme.less',
          'Grunt / npm build: Gruntfile.js config, local LESS compilation with source maps',
        ],
        sort_order: 2,
        lessons: [],
      },
      {
        section_key: 'javascript',
        title: 'JavaScript',
        weight: 36,
        description: 'The largest section — expert JavaScript across RequireJS, mixins, KnockoutJS custom bindings, jQuery widgets, UI component integration.',
        objectives: [
          'Demonstrate the usage of RequireJS',
          'Demonstrate the ability to implement different types of mixins',
          'Demonstrate the usage of Knockout JS',
          'Demonstrate the usage of jQuery widgets',
          'Demonstrate the usage of JS components using Layout XML',
        ],
        subtopics: [
          'RequireJS advanced: requirejs-config.js maps (aliasing), shim, config.deps',
          'Mixin types: AMD module mixin, jQuery widget mixin, uiComponent mixin',
          'KO custom bindings: ko.bindingHandlers.myBinding.{init, update}',
          'KO component registration: ko.components.register, component template, viewModel',
          'JS components in Layout XML: <block> with <arguments><item name="jsLayout" xsi:type="array">',
        ],
        sort_order: 3,
        lessons: [],
      },
      {
        section_key: 'admin-pageb-optimizations',
        title: 'Customizing the Admin Panel, Page Builder & Optimizations',
        weight: 20,
        description: 'Extend the Page Builder editor with custom content types, use the Admin UI SDK, and apply frontend performance optimizations.',
        objectives: [
          'Demonstrate the ability to customize Page Builder content',
          'Describe front-end optimization',
          'Describe how to modify and extend the Commerce admin through the admin UI SDK',
        ],
        subtopics: [
          'Page Builder custom content type: PHP registration, admin preview (KO template + CSS), storefront rendering',
          'Admin UI SDK: @adobe/commerce-admin-sdk — inject React-based panels into the Commerce admin',
          'Frontend optimisation: JavaScript merging/bundling, CSS merging, lazy image loading',
          'Core Web Vitals: LCP, CLS, FID/INP — Commerce-specific improvements',
        ],
        sort_order: 4,
        lessons: [],
      },
    ],
    references: [
      { title: 'Official Exam Page — AD0-E727', url: 'https://certification.adobe.com/certification/front-end-developer-expert-v2/1250', category: 'official', description: 'Schedule the exam, download the official study guide.', sort_order: 0 },
      { title: 'Frontend Developer Guide', url: 'https://developer.adobe.com/commerce/frontend-core/guide/', category: 'devdocs', description: 'Advanced theme, layout, LESS, and JavaScript reference.', sort_order: 1 },
      { title: 'Page Builder Developer Guide', url: 'https://developer.adobe.com/commerce/frontend-core/page-builder/', category: 'devdocs', description: 'Creating and extending Page Builder content types.', sort_order: 2 },
      { title: 'Mage2.TV Frontend Expert Series', url: 'https://mage2.tv', category: 'training', description: 'Video courses: advanced JavaScript, KO components, UI Components.', sort_order: 3 },
    ],
  },
  {
    slug: 'architect-master',
    exam_code: 'AD0-E722',
    title: 'Adobe Commerce Architect Master',
    short_title: 'Architect Master',
    level: 'Master',
    description: 'The pinnacle Adobe Commerce certification. Tests your ability to design optimal solutions for business needs, review existing implementations for quality and performance, and configure full production Cloud environments.',
    questions: 50,
    passing_score: 30,
    duration: 100,
    cost_usd: 225,
    experience: '3+ years Adobe Commerce development; 1+ year leading Commerce implementation projects',
    official_url: 'https://certification.adobe.com/certification/commerce-architect-master/207',
    prerequisites: [
      'Adobe Commerce Developer Expert (AD0-E725) strongly recommended',
      'Broad knowledge across all Commerce domains (frontend, backend, Cloud, integrations)',
    ],
    sort_order: 6,
    is_active: true,
    sections: [
      {
        section_key: 'design',
        title: 'Design',
        weight: 46,
        description: 'The core architect skill — design end-to-end solutions that are scalable, maintainable, and fully aligned to business requirements.',
        objectives: [
          'Design and implement optimal solutions for Adobe Commerce to meet business needs',
          'Design logical and technical flows',
          'Customize Commerce features',
          'Integrate Adobe Commerce with external systems and services',
          'Troubleshoot design flows',
        ],
        subtopics: [
          'Solution design: translate business requirements into Commerce architecture',
          'Integration architecture: REST vs GraphQL vs message queues vs Adobe I/O Events',
          'Multi-site architecture: single instance vs separate instances',
          'Headless architecture: when to recommend decoupled vs traditional Luma',
          'B2B platform architecture: company hierarchy depth, approval workflow rules',
          'Customisation strategy: plugin vs observer vs preference vs event',
          'API design: contract-first, schema versioning, backward compatibility',
          'Queue topology: topic → publisher → queue → consumer — scaling consumers',
        ],
        sort_order: 0,
        lessons: [],
      },
      {
        section_key: 'review',
        title: 'Review',
        weight: 32,
        description: 'Evaluate and refactor existing Commerce implementations.',
        objectives: [
          'Review and refactor existing Adobe Commerce customizations',
          'Utilize Commerce test frameworks throughout the whole workflow',
          'Optimize performance and scalability for Adobe Commerce',
          'Troubleshoot to identify the root cause of issues',
          'Enforce coding standards',
        ],
        subtopics: [
          'Code review red flags: Object Manager direct usage, missing interfaces, plugin on plugin',
          'N+1 query detection: loops with repository calls, missing eager loading',
          'Security review: SQL injection, CSRF missing on state-changing endpoints, XSS',
          'Test framework: MFTF for E2E, PHPUnit integration tests, unit tests with mocking',
          'Performance profiling: New Relic APM traces, Blackfire.io flame graphs',
          'Coding standards: PHP_CodeSniffer with Magento2 ruleset, PHPMD, PHPStan',
        ],
        sort_order: 1,
        lessons: [],
      },
      {
        section_key: 'configure-deploy',
        title: 'Configure & Deploy',
        weight: 22,
        description: 'Own the full production environment — Cloud topology, CDN, caches, database scaling, monitoring.',
        objectives: [
          'Configure Adobe Commerce and make sure the project is set up optimally',
          'Configure all aspects of Adobe Commerce Cloud',
          'Oversee and improve deployment process',
          'Troubleshoot infrastructure and configuration issues',
        ],
        subtopics: [
          'Optimal Commerce configuration: config.php checked into VCS, app/etc/env.php excluded',
          'Pro Cloud topology: Build server → Staging → Production (multi-node)',
          'Fastly: custom VCL snippets, WAF ruleset, image optimisation, purge by tag/URL',
          'Redis architecture: separate Redis instances for cache, sessions, and FPC',
          'Deployment pipeline: zero-downtime, SCD_STRATEGY=compact, post-deploy cache warm',
          'New Relic: custom dashboards, deployment markers, alert policies',
        ],
        sort_order: 2,
        lessons: [],
      },
    ],
    references: [
      { title: 'Official Exam Page — AD0-E722', url: 'https://certification.adobe.com/certification/commerce-architect-master/207', category: 'official', description: 'Schedule the exam, download the official study guide.', sort_order: 0 },
      { title: 'Commerce Implementation Playbook', url: 'https://experienceleague.adobe.com/docs/commerce-operations/implementation-playbook/best-practices/planning/overview.html', category: 'official', description: "Adobe's architecture and best-practice playbook for large deployments.", sort_order: 1 },
      { title: 'Performance Best Practices', url: 'https://experienceleague.adobe.com/docs/commerce-operations/performance-best-practices/overview.html', category: 'devdocs', description: 'Hardware, software, and configuration recommendations for production.', sort_order: 2 },
      { title: 'Fastly for Commerce', url: 'https://experienceleague.adobe.com/docs/commerce-cloud-service/user-guide/cdn/fastly.html', category: 'devdocs', description: 'VCL setup, WAF, image optimisation, cache purging — full guide.', sort_order: 3 },
      { title: 'SwiftOtter Architect Master Prep', url: 'https://swiftotter.com/training/developers', category: 'training', description: 'Essential preparation — this is the hardest exam in the lineup.', sort_order: 4 },
    ],
  },
]

// ─── Main Seed Function ───────────────────────────────────────────────────────

async function seed() {
  console.log('Connecting to MongoDB Atlas...')
  await mongoose.connect(MONGODB_URI, { bufferCommands: false })
  console.log('Connected.')

  // Clear collections
  console.log('Clearing existing collections...')
  await Promise.all([
    Skill.deleteMany({}),
    Blog.deleteMany({}),
    Extension.deleteMany({}),
    ExamGuide.deleteMany({}),
    LearningResource.deleteMany({}),
  ])
  console.log('Collections cleared.')

  // Seed Skills
  console.log('Seeding skills...')
  await Skill.insertMany(
    skillsData.map((s, i) => ({
      ...s,
      slug: slug(s.name),
      is_featured: s.is_featured ?? false,
      sort_order: i,
    }))
  )
  console.log(`Seeded ${skillsData.length} skills.`)

  // Seed Blogs
  console.log('Seeding blogs...')
  await Blog.insertMany(blogsData)
  console.log(`Seeded ${blogsData.length} blogs.`)

  // Seed Extensions
  console.log('Seeding extensions...')
  await Extension.insertMany(extensionsData)
  console.log(`Seeded ${extensionsData.length} extensions.`)

  // Seed Exam Guides
  console.log('Seeding exam guides...')
  await ExamGuide.insertMany(examGuidesData)
  console.log(`Seeded ${examGuidesData.length} exam guides.`)

  // Seed Learning Resources
  console.log('Seeding learning resources...')
  await LearningResource.insertMany(learningResourcesData)
  console.log(`Seeded ${learningResourcesData.length} learning resources.`)

  console.log('\n✓ Seed complete! All data has been inserted into MongoDB Atlas.')
  await mongoose.disconnect()
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
