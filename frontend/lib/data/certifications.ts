export type CertLevel = 'Professional' | 'Expert' | 'Master'
export type RefCategory = 'official' | 'devdocs' | 'github' | 'training' | 'tool'

export interface ExamSection {
  id: string
  title: string
  weight: number
  description: string
  objectives: string[]   // verbatim from official Adobe exam guide
  subtopics: string[]    // expert trainer commentary / what to study
}

export interface ReferenceLink {
  title: string
  url: string
  category: RefCategory
  description: string
}

export interface CertExam {
  slug: string
  examCode: string
  title: string
  shortTitle: string
  level: CertLevel
  description: string
  questions: number
  passingScore: number
  duration: number
  costUSD: number
  experience: string
  officialUrl: string
  sections: ExamSection[]
  references: ReferenceLink[]
  prerequisites?: string[]
}

export const CERT_EXAMS: CertExam[] = [

  // ─── PROFESSIONAL TIER ────────────────────────────────────────────────────────

  {
    slug: 'business-practitioner-professional',
    examCode: 'AD0-E712',
    title: 'Adobe Commerce Business Practitioner Professional',
    shortTitle: 'Business Practitioner Pro',
    level: 'Professional',
    description:
      'Entry-level certification for merchants, business analysts, and eCommerce managers. Validates knowledge of Magento Open Source features, the Adobe Commerce edition differentiators, digital marketing fundamentals, and basic compliance.',
    questions: 50,
    passingScore: 30,
    duration: 100,
    costUSD: 125,
    experience: '0–12 months hands-on experience with Magento Open Source 2.4.x',
    officialUrl: 'https://certification.adobe.com/certification/business-practitioner-professional/202',
    sections: [
      {
        id: 'core-features',
        title: 'Magento Open Source Core Features',
        weight: 49,
        description:
          'The largest section — covers the day-to-day store management capabilities available to every merchant in Magento Open Source.',
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
      },
      {
        id: 'adobe-commerce-basics',
        title: 'Adobe Commerce Basics',
        weight: 14,
        description:
          'Features exclusive to the paid Adobe Commerce edition that go beyond what Magento Open Source offers.',
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
          'Page Builder (Commerce includes more native content types)',
          'Adobe Commerce SaaS services: Live Search, Product Recommendations, Payment Services',
          'Hosting: Adobe Commerce on Cloud (PaaS) vs managed vs self-hosted',
        ],
      },
      {
        id: 'digital-marketing',
        title: 'Digital Marketing & eCommerce Fundamentals',
        weight: 24,
        description:
          'Core digital marketing knowledge that eCommerce practitioners are expected to know regardless of platform.',
        objectives: [
          'Identify the basic uses of Digital Marketing tools (Google Analytics/Adobe Analytics, Google Tag Manager, Email marketing, Segmentation, Social plugins)',
          'Explain the basic principles of SEO',
          'Identify the basic uses of common eCommerce tools (such as shopping feeds)',
          'Identify the key features of an eCommerce website',
          'Identify the basic eCommerce concepts (including storefront options)',
        ],
        subtopics: [
          'Google Analytics 4: sessions, conversions, e-commerce tracking events',
          'Google Tag Manager: trigger/tag concept, dataLayer, GTM container snippet in Magento',
          'SEO basics: meta titles, descriptions, canonical URLs, XML sitemaps, URL rewrites in Magento',
          'Email marketing: transactional emails vs promotional, newsletter subscriptions in Commerce',
          'Shopping feeds: Google Shopping, product feed format, extension ecosystem',
          'eCommerce KPIs: CVR, AOV, CLV, cart abandonment rate',
          'Storefront options: Luma (monolithic), PWA Studio (decoupled), headless with third-party FE',
        ],
      },
      {
        id: 'compliance-security',
        title: 'Compliance & Security Basics',
        weight: 13,
        description:
          'Foundational regulatory and security awareness every merchant must have.',
        objectives: [
          'Understand the basics of compliance for privacy laws and payment security',
          'Identify common security aspects of an Adobe Commerce project',
          'Identify best practices and legal requirements of accessibility compliance',
        ],
        subtopics: [
          'PCI DSS: scope for merchants, SAQ types (A, A-EP, D), tokenisation reducing scope',
          'GDPR / CCPA: right to erasure, data portability, consent — Commerce native features',
          'Cookie restriction mode and consent management banner in Commerce',
          'WCAG 2.1 accessibility: Magento Luma\'s AA compliance posture',
          'Two-factor authentication (2FA) enforcement for admin users',
          'Admin hardening: custom admin URL, admin IP allowlist, reCAPTCHA',
          'SSL/TLS: HTTPS enforcement, HSTS, mixed-content issues in Commerce',
        ],
      },
    ],
    references: [
      {
        title: 'Official Exam Page — AD0-E712',
        url: 'https://certification.adobe.com/certification/business-practitioner-professional/202',
        category: 'official',
        description: 'Schedule the exam, download the official study guide.',
      },
      {
        title: 'Adobe Commerce Merchant User Guide',
        url: 'https://experienceleague.adobe.com/docs/commerce-admin/user-guides/home.html',
        category: 'devdocs',
        description: 'Full admin reference — catalog, orders, marketing, content.',
      },
      {
        title: 'B2B for Adobe Commerce',
        url: 'https://experienceleague.adobe.com/docs/commerce-admin/b2b/guide-overview.html',
        category: 'devdocs',
        description: 'Company accounts, shared catalogs, purchase orders reference.',
      },
      {
        title: 'SwiftOtter BP Pro Prep',
        url: 'https://swiftotter.com/training/merchant-training/adobe-commerce-business-practitioner-ad0-e712-exam-prep',
        category: 'training',
        description: 'Practice exams and study guide for AD0-E712.',
      },
      {
        title: 'Security & Compliance Guide',
        url: 'https://experienceleague.adobe.com/docs/commerce-operations/security-and-compliance/overview.html',
        category: 'devdocs',
        description: 'PCI, GDPR, and admin hardening from Adobe.',
      },
    ],
  },

  {
    slug: 'developer-professional',
    examCode: 'AD0-E724',
    title: 'Adobe Commerce Developer Professional',
    shortTitle: 'Developer Pro',
    level: 'Professional',
    description:
      'Entry-level backend developer certification. Tests core Magento 2 architecture — module structure, customisation techniques (plugins, preferences, observers), the caching and indexing systems, and Cloud fundamentals.',
    questions: 50,
    passingScore: 39,
    duration: 100,
    costUSD: 125,
    experience: '0–12 months hands-on Magento 2 backend development',
    officialUrl: 'https://certification.adobe.com/certification/adobe-commerce-developer-professional-v2/1242',
    sections: [
      {
        id: 'architecture',
        title: 'Architecture',
        weight: 52,
        description:
          'The majority of the exam — covers the Magento framework internals every developer must understand to build maintainable modules.',
        objectives: [
          'Describe module file structure',
          'Describe Adobe Commerce CLI commands',
          'Describe CRON functionality',
          'Describe index functionality',
          'Describe localization',
          'Explain components (plugin, preference, observers etc.)',
          'Describe URL rewrites',
          'Describe the Magento caching system',
          'Describe stores, websites, and store views',
          'Recall the code architecture of admin panel',
          'Describe attributes and attribute sets',
        ],
        subtopics: [
          'Module anatomy: registration.php, module.xml, composer.json, etc/config.xml, etc/di.xml',
          'CLI commands: setup:upgrade, cache:flush, indexer:reindex, setup:static-content:deploy, setup:di:compile',
          'CRON: crontab.xml, cron groups (default vs index), cron job debugging with bin/magento cron:run',
          'Indexers: full reindex vs partial, indexer modes (Update on Save vs Schedule), custom indexers overview',
          'Localisation: i18n/en_US.csv, translate.csv, CSV generation with bin/magento i18n:collect-phrases',
          'Plugins (interceptors): before / after / around — sortOrder, disabled flag, area scope',
          'Preferences: full class rewrite in di.xml — when to use vs plugins',
          'Observers: events.xml, EventManagerInterface::dispatch, asynchronous events',
          'URL rewrites: UrlRewrite entity, rewrite types (product, category, CMS, custom), admin UI',
          'Cache types: full_page, block_html, config, layout, translate — tags and invalidation',
          'Store hierarchy: Website → Store → Store View, Config::getConfigDataValue() and scope',
          'Admin panel structure: controller → block → template → layout, adminhtml area',
          'EAV attributes: attribute types, frontend/backend/source models, attribute sets and groups',
        ],
      },
      {
        id: 'customizations',
        title: 'Customizations',
        weight: 36,
        description:
          'Hands-on customisation across the catalog, checkout, entity layer, and APIs.',
        objectives: [
          'Demonstrate knowledge of how to operate the catalog',
          'Explain check out and sales operations',
          'Manipulate entity types programmatically',
          'Identify the data flow in and out of Adobe SaaS services',
          'Identify API features',
        ],
        subtopics: [
          'Catalog: CategoryRepositoryInterface, ProductRepositoryInterface, SearchCriteria builder pattern',
          'Pricing: FinalPrice model, price modifiers, PriceCurrencyInterface',
          'Checkout: quote lifecycle, QuoteManagementInterface, custom totals (TotalCollectorInterface)',
          'Order management: OrderManagementInterface, invoice/shipment/creditmemo services',
          'EAV programmatic: AttributeRepositoryInterface, attribute set/group management',
          'Data/schema patches: DataPatchInterface, SchemaPatchInterface — execution and dependencies',
          'Adobe SaaS: Live Search, Product Recommendations, Catalog Service — data sync pipeline overview',
          'REST API: route.xml, acl.xml resources, request/response schema, ACL enforcement',
          'GraphQL: extending schema, resolvers, mutations — basic pattern',
        ],
      },
      {
        id: 'cloud',
        title: 'Cloud',
        weight: 12,
        description:
          'Core Adobe Commerce Cloud concepts — environment structure, configuration files, and CLI usage.',
        objectives: [
          'Describe Adobe Commerce Cloud architecture',
          'Describe the setup and configuration of Adobe Commerce Cloud',
          'Recall the Adobe Commerce Cloud CLI tool',
        ],
        subtopics: [
          'Cloud environment types: Integration, Staging, Production — branch-per-environment model',
          'Configuration files: .magento.app.yaml (runtime, hooks, mounts, crons), routes.yaml, services.yaml',
          '.magento.env.yaml: SCD_STRATEGY, CRON_CONSUMERS_RUNNER, REDIS_BACKEND, etc.',
          'ECE-tools: build phase (SCD, DI compile), deploy phase (maintenance, config import), post-deploy',
          'Cloud CLI: magento-cloud environment:ssh, tunnel:open, variable:set, environment:branch',
          'Environment variables: MAGENTO_CLOUD_VARIABLES, sensitive vs environment scope',
          'Cloud services: MySQL, Redis (cache + session), Elasticsearch/OpenSearch, RabbitMQ',
        ],
      },
    ],
    references: [
      {
        title: 'Official Exam Page — AD0-E724',
        url: 'https://certification.adobe.com/certification/adobe-commerce-developer-professional-v2/1242',
        category: 'official',
        description: 'Schedule the exam, download the official study guide.',
      },
      {
        title: 'Adobe Commerce PHP Developer Guide',
        url: 'https://developer.adobe.com/commerce/php/development/',
        category: 'devdocs',
        description: 'Plugins, DI, observers, service contracts — the full backend dev reference.',
      },
      {
        title: 'magento/magento2 — GitHub',
        url: 'https://github.com/magento/magento2',
        category: 'github',
        description: 'Study core module implementations to understand real patterns.',
      },
      {
        title: 'magento/magento2-samples',
        url: 'https://github.com/magento/magento2-samples',
        category: 'github',
        description: 'Official sample modules for plugins, REST APIs, observers.',
      },
      {
        title: 'Cloud Infrastructure Guide',
        url: 'https://experienceleague.adobe.com/docs/commerce-cloud-service/user-guide/overview.html',
        category: 'devdocs',
        description: 'Cloud environment setup, ECE-tools, CLI reference.',
      },
      {
        title: 'SwiftOtter Developer Professional Prep',
        url: 'https://swiftotter.com/training/developers/professional-developer-ado0-e717-exam-preparation',
        category: 'training',
        description: 'Most recommended practice exam and study guide for the dev pro exam.',
      },
      {
        title: 'Mage2.TV — Magento 2 Video Courses',
        url: 'https://mage2.tv',
        category: 'training',
        description: 'Deep-dive videos on DI, plugins, and the Magento developer workflow.',
      },
    ],
  },

  {
    slug: 'frontend-developer-professional',
    examCode: 'AD0-E726',
    title: 'Adobe Commerce Front-End Developer Professional',
    shortTitle: 'Frontend Dev Pro',
    level: 'Professional',
    description:
      'Entry-level frontend certification. Tests theme architecture, Layout XML, LESS styling, JavaScript (RequireJS, KnockoutJS, jQuery), admin theme configuration, and the Magento CLI used in daily frontend workflows.',
    questions: 50,
    passingScore: 33,
    duration: 100,
    costUSD: 125,
    experience: '0–12 months frontend development on Adobe Commerce 2.4.x',
    officialUrl: 'https://certification.adobe.com/certification/front-end-developer-professional-new-v2/1247',
    sections: [
      {
        id: 'theme-management',
        title: 'Theme Management',
        weight: 16,
        description:
          'Understand how Magento resolves static files via the theme fallback hierarchy and how to scaffold a new theme correctly.',
        objectives: [
          'Describe Adobe Commerce theme folder structure',
          'Demonstrate ability to create new or extend existing themes',
          'Demonstrate ability to add custom translation phrases',
        ],
        subtopics: [
          'Theme folder anatomy: registration.php, theme.xml, composer.json, web/, Magento_*/templates/',
          'Theme fallback chain: custom → parent (Luma/Blank) → module → base/lib',
          'Create a custom child theme: theme.xml <parent> declaration, symlink vs copy strategy',
          'Extend an existing theme: override only what changes, keep fallback intact',
          'Translation: i18n/en_US.csv in theme folder, CSV format, phrase collection command',
          'Static file deployment: bin/magento setup:static-content:deploy -f --theme Vendor/name',
          'Developer vs production mode implications for frontend file resolution',
        ],
      },
      {
        id: 'layout-templates',
        title: 'Layout XML & Templates',
        weight: 23,
        description:
          'The XML-driven rendering pipeline that controls page structure — master it to customise any page without overriding PHP.',
        objectives: [
          'Describe the basic layout XML instructions',
          'Describe existing page layouts',
          'Describe the steps for extending and overriding Layout XML',
          'Demonstrate ability to create and customize phtml templates',
          'Describe template security (escaping output)',
        ],
        subtopics: [
          'Layout XML instructions: block, container, referenceBlock, referenceContainer, move, remove',
          'Page layouts: empty, 1column, 2columns-left, 2columns-right, 3columns — when each applies',
          'Handles: default.xml, catalog_product_view.xml, checkout_cart_index.xml — handle hierarchy',
          'Extending layout: add file in theme/Module_Name/layout/ alongside core file (merged)',
          'Overriding layout: place file in theme/Module_Name/layout/override/base/ (replaces entirely)',
          'phtml templates: $block->getChildHtml(), getData(), $escaper->escapeHtml()',
          'View Models: inject via layout XML <arguments>, avoid extending Block for presentation logic',
          'Template escaping: $escaper->escapeHtml(), escapeUrl(), escapeJs() — XSS prevention',
        ],
      },
      {
        id: 'styles',
        title: 'Styles',
        weight: 19,
        description:
          'Magento\'s LESS preprocessor system — override and extend stylesheets without forking core files.',
        objectives: [
          'Identify the purpose of different LESS files (compiled and partial)',
          'Describe how to override or extend LESS files',
        ],
        subtopics: [
          'LESS file roles: _module.less (module styles), _extend.less (extend in theme), _theme.less (global vars)',
          'Compiled files: styles-m.less (mobile), styles-l.less (desktop) — entry points',
          'Override pattern: replicate file path under theme/Module_Name/web/css/source/ to replace',
          'Extend pattern: add _extend.less next to _module.less to append styles without replacing',
          'Magento UI LESS library: lib/web/css/source/lib/ — variables, mixins, components',
          'Overriding variables: create web/css/source/_theme.less with @primary__color etc.',
          'Grunt workflow: grunt less, grunt watch for local LESS compilation during development',
        ],
      },
      {
        id: 'javascript',
        title: 'JavaScript',
        weight: 20,
        description:
          'Client-side behaviour using Magento\'s AMD module system, mixins, KnockoutJS, and jQuery widgets.',
        objectives: [
          'Demonstrate the usage of RequireJS',
          'Describe the usage of mixins',
          'Describe how to add a translation in JS',
          'Describe the usage of Knockout JS',
          'Describe the usage of jQuery widgets',
        ],
        subtopics: [
          'RequireJS: define([deps], factory) and require([deps], callback) — AMD module pattern',
          'requirejs-config.js: paths (aliases), map, shim for non-AMD libraries',
          'Mixins: requirejs-config.js config.mixins — patch a core AMD module without overriding it',
          'JS translations: $t("string"), mage/translate module, i18n CSV merged into js-translation.json',
          'KnockoutJS: ko.observable(), ko.observableArray(), ko.computed() — reactive data bindings',
          'data-bind attribute syntax: text, value, click, visible, foreach, css, attr',
          'jQuery Widget Factory: $.widget("mage.widgetName", {_create, _on}) — Magento widget pattern',
          'Component init: data-mage-init=\'{"widget": {}}\' and x-magento-init for non-DOM init',
        ],
      },
      {
        id: 'admin-configuration',
        title: 'Admin Configuration',
        weight: 12,
        description:
          'Using the Commerce admin to apply and manage themes and design settings without touching code.',
        objectives: [
          'Apply or schedule a theme to a specific scope (website, store, store-view)',
          'Apply design changes to categories, products and CMS pages using admin configuration',
          'Describe steps to customize transactional emails',
        ],
        subtopics: [
          'Theme assignment: Content → Design → Configuration → store-view scope → Applied Theme',
          'Schedule a theme change: Design Schedule with date range (seasonal themes)',
          'Per-page layout override: product/category/CMS page → Design tab → Layout dropdown',
          'Custom layout handle per page: Layout Update XML field in admin for page-specific tweaks',
          'Transactional emails: Marketing → Communications → Email Templates → New Template → load default',
          'Email template variables: {{var order.increment_id}}, {{htmlescape var=$customer.name}}',
          'Assign custom email template: Stores → Configuration → Sales → Sales Emails',
        ],
      },
      {
        id: 'cli',
        title: 'CLI',
        weight: 10,
        description:
          'The Magento and Cloud CLI commands used daily in frontend development workflows.',
        objectives: [
          'Describe the usage of basic bin/Magento commands',
          'Describe additional tools that Commerce Cloud provides',
        ],
        subtopics: [
          'bin/magento setup:static-content:deploy: --area, --theme, --locale, -j (jobs), --force',
          'bin/magento cache:clean / cache:flush — difference between clean and flush',
          'bin/magento deploy:mode:set developer|production|default',
          'bin/magento setup:upgrade — runs schema and data patches, registers new modules',
          'bin/magento cron:run — trigger cron execution manually for testing',
          'Magento Cloud CLI: magento-cloud ssh, environment:ssh, variable:set, environment:redeploy',
          'ece-tools docker:build / docker:deploy for local Cloud simulation with docker-compose',
        ],
      },
    ],
    references: [
      {
        title: 'Official Exam Page — AD0-E726',
        url: 'https://certification.adobe.com/certification/front-end-developer-professional-new-v2/1247',
        category: 'official',
        description: 'Schedule the exam, download the official study guide.',
      },
      {
        title: 'Frontend Developer Guide',
        url: 'https://developer.adobe.com/commerce/frontend-core/guide/',
        category: 'devdocs',
        description: 'Full official reference: themes, layouts, LESS, JavaScript.',
      },
      {
        title: 'Magento Blank Theme — GitHub',
        url: 'https://github.com/magento/magento2/tree/2.4-develop/app/design/frontend/Magento/blank',
        category: 'github',
        description: 'The recommended parent theme — study its file structure.',
      },
      {
        title: 'Magento Luma Theme — GitHub',
        url: 'https://github.com/magento/magento2/tree/2.4-develop/app/design/frontend/Magento/luma',
        category: 'github',
        description: 'Luma\'s layout overrides and LESS extending Blank — great reference.',
      },
      {
        title: 'LESS UI Library Reference',
        url: 'https://developer.adobe.com/commerce/frontend-core/guide/css/ui-library/',
        category: 'devdocs',
        description: 'Full mixin, variable, and component reference for Magento LESS.',
      },
      {
        title: 'JavaScript Init Guide',
        url: 'https://developer.adobe.com/commerce/frontend-core/javascript/init/',
        category: 'devdocs',
        description: 'How data-mage-init and x-magento-init work to boot JS components.',
      },
      {
        title: 'Mage2.TV Frontend Courses',
        url: 'https://mage2.tv',
        category: 'training',
        description: 'Video tutorials: theme creation, LESS, RequireJS, UI components.',
      },
    ],
  },

  // ─── EXPERT TIER ──────────────────────────────────────────────────────────────

  {
    slug: 'business-practitioner-expert',
    examCode: 'AD0-E708',
    title: 'Adobe Commerce Business Practitioner Expert',
    shortTitle: 'Business Practitioner Expert',
    level: 'Expert',
    description:
      'Advanced certification for solutions consultants, project managers, and senior merchants. Tests deep platform knowledge across all Commerce editions, B2B, merchandising, systems architecture, and compliance.',
    questions: 50,
    passingScore: 31,
    duration: 100,
    costUSD: 225,
    experience: '1–3 years hands-on Adobe Commerce in a business or solutions role',
    officialUrl: 'https://certification.adobe.com/certification/adobe-commerce-business-practitioner-expert/201',
    prerequisites: ['Adobe Commerce Business Practitioner Professional (AD0-E712) recommended'],
    sections: [
      {
        id: 'core-config',
        title: 'Core Features & General Configuration',
        weight: 46,
        description:
          'The dominant section — expert-level command of the full Commerce feature set and when to use native vs extended functionality.',
        objectives: [
          'Identify the features of Adobe Commerce Open Source Edition and Commerce Edition',
          'Distinguish the differences between all editions of Adobe Commerce products',
          'Determine how to utilize product types and their features to meet customer requirements',
          'Interpret requirements and mock ups to determine if they can be met with native functionality',
          'Demonstrate knowledge of the admin panel and the location of common features',
          'Demonstrate the ability to import/export Adobe Commerce entities',
          'Understand how to natively configure cart and checkout',
          'Evaluate the native available shipping methods in Adobe Commerce and how they apply to common use cases',
          'Understanding the ways to create and publish stylized content using the Adobe Commerce CMS features including Page Builder',
          'Using native tools to manage the order life cycle',
          'Demonstrate the ability to configure the various gifting options (gift cards, gift wrapping, give messages)',
          'Configuring and modifying transactional emails',
          'Explain the customer self service and loyalty program native features in B2B',
        ],
        subtopics: [
          'Edition matrix: Open Source vs Commerce vs Commerce Cloud — feature-by-feature comparison',
          'Product type selection: when to use Configurable vs Bundle vs Grouped for complex offerings',
          'Native vs extension decision: assess requirements against OOTB before recommending third-party',
          'Import/export: CSV format, import validation modes (Add/Update, Replace, Delete), scheduled import',
          'Cart and checkout configuration: one-page checkout, guest checkout, checkout agreements',
          'Shipping methods: Flat Rate, Free Shipping, Table Rate, UPS/USPS/FedEx, in-store pickup (MSI)',
          'Page Builder: Row, Column, Heading, Text, Image, Video, Banner, Slider, Tabs, Accordion, HTML Code',
          'Order management: custom order statuses, state machine, hold/unhold, order comments',
          'Gifting: gift cards (virtual/physical/combined), gift wrapping, gift messages per item/order',
          'Transactional emails: template variables, header/footer templates, logo per store view',
          'B2B loyalty: company credit limits, requisition lists as saved-order templates, quick order',
        ],
      },
      {
        id: 'merchandising',
        title: 'Merchandising',
        weight: 10,
        description:
          'Drive revenue through Commerce\'s native merchandising and pricing engine.',
        objectives: [
          'Demonstrate the ability to create promotions to meet specific business criteria and how it determines final pricing',
          'Demonstrate ability to manage categories and products',
          'Understand the different pricing configurations and how they affect the final price',
        ],
        subtopics: [
          'Cart price rules: conditions (product attribute, cart attribute, customer segment), actions (% discount, fixed, buy X get Y, free shipping), coupon management and limits',
          'Catalog price rules: priority, stop-further-rules flag, batch price invalidation timeline',
          'Final price calculation chain: base → special → tier → group → catalog rule → cart rule',
          'Visual merchandiser: sort-by-rule categories, drag-and-drop manual positioning, pin-to-top',
          'Category management: anchor vs non-anchor, layered navigation attribute assignment',
          'Product recommendations (Adobe Sensei): recommendation types, placement, training data requirements',
        ],
      },
      {
        id: 'digital-marketing',
        title: 'Digital Marketing',
        weight: 4,
        description:
          'Targeted marketing and analytics knowledge in the context of Adobe Commerce.',
        objectives: [
          'Recommend best practices for SEO using native features',
          'Assess common metrics in Google Analytics and BI',
        ],
        subtopics: [
          'SEO native features: URL rewrites, canonical tags, HTML sitemap, XML sitemap, rich snippets via structured data',
          'Meta data management: per-product, per-category, per-CMS page — and store-level defaults',
          'Google Analytics 4: eCommerce events (view_item, add_to_cart, purchase), GTM integration',
          'Adobe Commerce BI (MBI / Magento Business Intelligence): cohort analysis, RFM, LTV reports',
          'Content staging for marketing campaigns: preview and scheduling workflow',
        ],
      },
      {
        id: 'addon-modules',
        title: 'Add-on Modules & Additional Products',
        weight: 18,
        description:
          'Adobe Commerce-specific add-ons and how they address real business scenarios.',
        objectives: [
          'Describe the B2B functionality and how it relates to common B2B scenarios',
          'Apply business requirements to suggest a solution using MSI',
          'Explain the advantages and how to use BI to the Adobe Commerce solution',
          'Distinguish the differences between native search and LiveSearch',
          'Apply business requirements to determine how to apply taxes, duties and exemptions in a B2B environment',
          'Understand how to apply tailored pricing to a B2B customer',
          'Understand the differences between Adobe Commerce native product and Adobe Sensei product recommendations',
        ],
        subtopics: [
          'B2B scenarios: distributor with sub-buyers (company hierarchy), RFQ workflow (negotiable quotes), ERP-synced shared catalogs',
          'MSI: source (physical location) vs stock (virtual pool), Source Selection Algorithms (Priority, Distance), ship from store',
          'Adobe Commerce Intelligence: prebuilt dashboards vs custom report builder, data warehouse sync',
          'Native search vs Live Search: Elasticsearch on-prem vs SaaS — faceting, synonyms, search rules, smart results',
          'B2B tax: tax-exempt company accounts, VAT ID validation, duty handling in multi-country scenarios',
          'B2B pricing: customer group pricing, shared catalog price overrides, negotiated quote final price',
          'Native related products (manually assigned or rule-based) vs Sensei Product Recommendations (AI/ML, real-time behavioural data)',
        ],
      },
      {
        id: 'systems-architecture',
        title: 'Systems Architecture',
        weight: 10,
        description:
          'Make informed platform and integration architecture decisions for scalability and maintainability.',
        objectives: [
          'Evaluate requirements to determine which websites, stores, and store view are necessary',
          'Identify and analyze performance metrics to make improvements',
          'Understand the available methods to integrate external system with Adobe Commerce',
          'Differentiate between headless approaches and traditional',
        ],
        subtopics: [
          'Multi-site architecture: single instance shared catalog vs separate databases, currency/locale per store view',
          'Performance metrics: TTFB, FCP, LCP, cache hit rate, DB query time — Commerce-specific monitoring',
          'Integration patterns: REST API (sync), GraphQL (frontend-facing), message queues (async), webhooks via Adobe I/O Events',
          'Headless vs traditional: Luma (monolithic) vs PWA Studio (React/UPWARD) vs third-party headless (Vue Storefront, Hyva)',
          'Integration middleware: use cases for iPaaS (MuleSoft, Boomi) vs direct API integration',
        ],
      },
      {
        id: 'compliance-security',
        title: 'Compliance & Security',
        weight: 12,
        description:
          'Expert-level compliance and security posture for enterprise deployments.',
        objectives: [
          'Demonstrate how to secure the Adobe Commerce data access with roles and permissions',
          'Understand the basics of compliance for privacy laws and payment security',
          'Explain common security aspects of an Adobe Commerce project',
          'Understand the basics of tax laws and how to configure',
        ],
        subtopics: [
          'Admin ACL: role resources, scope-locked admin users, two-factor authentication enforcement',
          'PCI DSS: SAQ A vs SAQ D scope, tokenisation (Braintree vault) to reduce PCI scope',
          'GDPR: customer data export (Privacy Policy), erasure request workflow in Commerce',
          'Security hardening: Security Scan Tool scheduling, admin IP restriction, CAPTCHA, file permissions',
          'Tax configuration: tax classes (product + customer), tax rules, FPT (Fixed Product Tax), VAT ID validation for EU B2B',
          'Security patch cadence: Adobe security bulletins, SWAT (Site-Wide Analysis Tool) usage',
        ],
      },
    ],
    references: [
      {
        title: 'Official Exam Page — AD0-E708',
        url: 'https://certification.adobe.com/certification/adobe-commerce-business-practitioner-expert/201',
        category: 'official',
        description: 'Schedule the exam, download the official study guide.',
      },
      {
        title: 'Adobe Commerce Merchant Docs',
        url: 'https://experienceleague.adobe.com/docs/commerce-admin/user-guides/home.html',
        category: 'devdocs',
        description: 'Full admin user guide — all merchant-facing feature reference.',
      },
      {
        title: 'B2B Commerce Guide',
        url: 'https://experienceleague.adobe.com/docs/commerce-admin/b2b/guide-overview.html',
        category: 'devdocs',
        description: 'Deep B2B feature reference: company accounts, purchase flows, negotiable quotes.',
      },
      {
        title: 'Inventory Management (MSI) Guide',
        url: 'https://experienceleague.adobe.com/docs/commerce-admin/inventory/guide-overview.html',
        category: 'devdocs',
        description: 'Multi-source inventory, stock algorithms, and SSA configuration.',
      },
      {
        title: 'Live Search Documentation',
        url: 'https://experienceleague.adobe.com/docs/commerce-merchant-services/live-search/overview.html',
        category: 'devdocs',
        description: 'Configure facets, synonyms, search rules, and merchandising.',
      },
      {
        title: 'SwiftOtter BP Expert Prep',
        url: 'https://swiftotter.com/training/merchant-training/adobe-commerce-business-practitioner-ad0-e708-exam-prep',
        category: 'training',
        description: 'Known as one of the harder exams — SwiftOtter\'s guide is the top resource.',
      },
    ],
  },

  {
    slug: 'developer-expert',
    examCode: 'AD0-E725',
    title: 'Adobe Commerce Developer Expert',
    shortTitle: 'Developer Expert',
    level: 'Expert',
    description:
      'The most sought-after backend certification. Tests advanced architecture mastery, external integrations via App Builder and Adobe I/O, deep customisation across catalog/checkout/admin/APIs, message queues, and Cloud infrastructure.',
    questions: 50,
    passingScore: 33,
    duration: 100,
    costUSD: 225,
    experience: '1–3 years professional Adobe Commerce backend development',
    officialUrl: 'https://certification.adobe.com/certification/adobe-commerce-developer-expert-v2/1234',
    prerequisites: ['Adobe Commerce Developer Professional (AD0-E724) recommended'],
    sections: [
      {
        id: 'architecture',
        title: 'Architecture',
        weight: 38,
        description:
          'Advanced framework internals — caching, security, multi-site constraints, indexing, CRON, and the full plugin system.',
        objectives: [
          'Demonstrate how to effectively use cache in Adobe Commerce',
          'Demonstrate knowledge of components (plugin, preference, observers etc.)',
          'Determine the effects and constraints of configuring multiple sites on a single instance',
          'Explain the use cases for Git patches and the file level modifications in Composer',
          'Explain Adobe Commerce security features (CSP, escaping, form keys, sanitization, reCAPTCHA, input validation)',
          'Explain how the CRON scheduling system works',
          'Explain index functionality',
        ],
        subtopics: [
          'Cache: custom cache types (CacheInterface), cache tags (IdentityInterface), block cache, full-page cache (Varnish/built-in), vary headers',
          'Plugins: sortOrder, disabled flag, area-specific di.xml, plugin-on-plugin interaction, around() with callable $proceed',
          'Preferences vs plugins: full rewrite risks (upgrade fragility), prefer plugins for single-method overrides',
          'Observers: synchronous vs asynchronous events, event area (global vs frontend vs adminhtml)',
          'Multi-site constraints: shared tables vs isolated (customer, order), URL resolution, theme and config scope inheritance',
          'Composer patches: cweagans/composer-patches, file-level patches vs module preferences — upgrade safety',
          'Security: Content Security Policy (CSP) headers and whitelisting, form keys (CSRF tokens), $escaper helper, input sanitisation with Filter\\Input, reCAPTCHA v2/v3 admin integration',
          'CRON groups: default vs index — separate cron processes, group configuration in crontab.xml',
          'Indexers: IndexerInterface, mview.xml for changelog-based partial reindex, indexer state machine',
        ],
      },
      {
        id: 'external-integrations',
        title: 'External Integrations',
        weight: 14,
        description:
          'Modern Adobe Commerce integration patterns using Adobe\'s composability stack — App Builder, I/O Events, and SaaS services.',
        objectives: [
          'Customize the data flow in and out of SaaS services',
          'Utilize App Builder',
          'Utilize Adobe I/O events and Webhooks',
        ],
        subtopics: [
          'SaaS data sync: catalog-data-export module, feed indexers, saas-export module — how product/price/inventory sync to Live Search and Product Recommendations',
          'Customise SaaS feeds: override feed indexer, add custom attributes to SaaS payload',
          'Adobe App Builder: serverless runtime on Adobe I/O, actions as microservices, access Commerce APIs from App Builder actions',
          'App Builder use cases: order management integrations, custom checkout orchestration, ERP sync without coupling to Commerce core',
          'Adobe I/O Events: subscribe to Commerce events (commerce.order.created etc.), event provider registration, webhook delivery to App Builder',
          'Commerce Webhooks module: synchronous webhooks on Commerce operations — hook into plugin-equivalent positions without PHP code deploy',
          'OAuth 2.0 server-to-server authentication for App Builder → Commerce API calls',
        ],
      },
      {
        id: 'customizations',
        title: 'Customizations',
        weight: 32,
        description:
          'Deep hands-on customisation across catalog, checkout, EAV entities, admin panel, APIs, and message queues — with testability.',
        objectives: [
          'Customize the catalog',
          'Customize check out and sales operations',
          'Manipulate entity types programmatically',
          'Customize the admin panel',
          'Customize APIs',
          'Demonstrate the ability to leverage existing message queues and create new queues',
          'Demonstrate how to write an integration test',
        ],
        subtopics: [
          'Catalog: custom product types (AbstractType), price model, stock status provider, custom inventory source types',
          'Layered navigation: custom filter, FilterInterface, custom filter renderer in frontend',
          'Checkout: custom step (KO component in checkout_index_index.xml), custom total (TotalCollectorInterface), payment method (PaymentMethodInterface + Vault)',
          'Sales: custom order status workflow, custom carrier (CarrierInterface), custom invoice/shipment totals',
          'EAV programmatic: create/delete attributes via patch, attribute option management, programmatic attribute sets',
          'Extension Attributes: extension_attributes.xml, join processor — attach data to any service contract entity',
          'Admin panel: custom grid (listing UI component), custom form (form UI component), dynamic rows, mass actions, inline editing',
          'REST API: custom route (webapi.xml), custom interface + model, request validation, bulk async endpoints',
          'GraphQL: schema.graphqls extension, custom resolver, mutation, context — performance with DataLoader pattern',
          'Message queues: queue.xml, publisher, consumer group, RabbitMQ vs DB queue — custom queue topology',
          'Integration tests: \Magento\TestFramework\Helper\Bootstrap, ObjectManager in tests, database fixtures, @magentoDataFixture annotation',
        ],
      },
      {
        id: 'cloud',
        title: 'Cloud',
        weight: 16,
        description:
          'Advanced Cloud infrastructure — architecture, full environment setup, and the Cloud CLI for daily operations.',
        objectives: [
          'Explain Adobe Commerce Cloud architecture',
          'Setup and configure Adobe Commerce Cloud',
          'Utilize Adobe Commerce Cloud CLI tool',
        ],
        subtopics: [
          'Pro vs Starter architecture: Pro has dedicated Staging + Production with Nginx/PHP-FPM/Varnish/Redis/DB on separate nodes; Starter has 4 environments',
          'ECE-tools build phase: SCD (static content deploy), code compilation; deploy phase: maintenance mode, config import, DB upgrade; post-deploy: warm cache',
          '.magento.app.yaml: runtime (PHP version, extensions), build/deploy/post_deploy hooks, mounts, disk, crons, workers',
          'Fastly integration: VCL snippets (custom cache rules, redirects), WAF, image optimisation service, purge API',
          'Environment variables: MAGENTO_CLOUD_VARIABLES (base64 JSON), SCD_STRATEGY, SCD_THREADS, CRON_CONSUMERS_RUNNER',
          'Services: MySQL (master + slave), Redis (cache instance, session instance, FPC instance), Elasticsearch/OpenSearch, RabbitMQ — relationship configuration',
          'Cloud CLI: environment:ssh, tunnel:open, variable:set, environment:branch, snapshot:create, integration:add',
          'New Relic APM: distributed tracing, key transactions, deployment markers, slow DB query identification',
        ],
      },
    ],
    references: [
      {
        title: 'Official Exam Page — AD0-E725',
        url: 'https://certification.adobe.com/certification/adobe-commerce-developer-expert-v2/1234',
        category: 'official',
        description: 'Schedule the exam, download the official study guide.',
      },
      {
        title: 'Adobe Commerce PHP Developer Guide',
        url: 'https://developer.adobe.com/commerce/php/development/',
        category: 'devdocs',
        description: 'Advanced backend dev reference — plugins, caching, indexing, APIs.',
      },
      {
        title: 'Adobe App Builder Documentation',
        url: 'https://developer.adobe.com/app-builder/docs/overview/',
        category: 'devdocs',
        description: 'Build and deploy App Builder apps that integrate with Commerce.',
      },
      {
        title: 'Adobe I/O Events for Commerce',
        url: 'https://developer.adobe.com/commerce/events/',
        category: 'devdocs',
        description: 'Event provider setup, event subscription, webhook delivery.',
      },
      {
        title: 'Vinai/module-developer-training',
        url: 'https://github.com/Vinai/module-developer-training',
        category: 'github',
        description: 'Kata-style exercises by Magento core contributor Vinai Kopp.',
      },
      {
        title: 'magento/magento2-samples',
        url: 'https://github.com/magento/magento2-samples',
        category: 'github',
        description: 'Official sample code: plugins, observers, REST APIs, message queues.',
      },
      {
        title: 'Cloud Infrastructure Guide',
        url: 'https://experienceleague.adobe.com/docs/commerce-cloud-service/user-guide/overview.html',
        category: 'devdocs',
        description: 'ECE-tools, Fastly, New Relic, Cloud CLI comprehensive reference.',
      },
      {
        title: 'SwiftOtter Developer Expert Guide',
        url: 'https://swiftotter.com/training/developers',
        category: 'training',
        description: 'The most comprehensive paid study resource for the Developer Expert exam.',
      },
      {
        title: 'Mage2.TV Expert Series',
        url: 'https://mage2.tv',
        category: 'training',
        description: 'Advanced videos on checkout, message queues, APIs, Cloud config.',
      },
    ],
  },

  {
    slug: 'frontend-developer-expert',
    examCode: 'AD0-E727',
    title: 'Adobe Commerce Front-End Developer Expert',
    shortTitle: 'Frontend Dev Expert',
    level: 'Expert',
    description:
      'Advanced frontend certification testing expert-level theme creation, complex Layout XML manipulation, LESS library components, JavaScript (RequireJS, mixins, KnockoutJS, jQuery), Page Builder customisation, and admin UI extensibility.',
    questions: 50,
    passingScore: 37,
    duration: 100,
    costUSD: 225,
    experience: '1–3 years professional Adobe Commerce frontend development',
    officialUrl: 'https://certification.adobe.com/certification/front-end-developer-expert-v2/1250',
    prerequisites: ['Adobe Commerce Front-End Developer Professional (AD0-E726) recommended'],
    sections: [
      {
        id: 'theme-management',
        title: 'Theme Management',
        weight: 10,
        description:
          'Create themes from scratch, extend existing themes safely, and own the full transactional email layer.',
        objectives: [
          'Demonstrate the ability to create a new theme',
          'Demonstrate ability to extend existing themes',
          'Demonstrate ability to customize transactional emails',
          'Demonstrate ability to apply translations, XML, and JS files',
        ],
        subtopics: [
          'Create a standalone theme: registration.php, theme.xml, composer.json — not just a child theme',
          'Theme inheritance depth: multi-level parent chain and how fallback traverses it',
          'Extend vs override: when to use _extend.less vs replacing the file, layout merge vs override',
          'Transactional email full stack: email_*.html layout handle → template → inline CSS → per-store-view logo',
          'Email localisation: translate CSV in theme, {{trans "string"}} directive in email templates',
          'Applying translation CSVs: theme-level i18n/, module-level i18n/, deploy-time merge order',
          'Injecting theme-specific requirejs-config.js and verifying with browser source map',
        ],
      },
      {
        id: 'layout-templates',
        title: 'Layout XML & Templates',
        weight: 22,
        description:
          'Expert-level control over the rendering pipeline — complex page layout manipulation and secure template development.',
        objectives: [
          'Demonstrate the ability to utilize layout XML instructions',
          'Demonstrate the ability to create new page layouts',
          'Understand the difference between extending/merging and overriding XML',
          'Demonstrate ability to create and customize phtml templates',
          'Apply template security (escaping output)',
        ],
        subtopics: [
          'All layout instructions: block, container, referenceBlock, referenceContainer, move, remove, update, body, head, htmlAttribute',
          'Creating new page layouts: page_layout/*.xml in module or theme, register in layouts.xml',
          'Extending (merging): layout file placed in same path — instructions are merged/appended',
          'Overriding: file placed in override/base/ or override/theme/ — replaces entirely, use sparingly',
          'Complex block manipulation: move across containers, reorder children, conditional remove',
          'phtml: escapeHtml(), escapeUrl(), escapeJs(), escapeHtmlAttr() — pick the right method per context',
          'View Models over Block: ViewModelInterface, injected via <argument> in layout XML — testable, decoupled',
          'Template caching: block cache keys, block identify interface, custom cache tag strategy',
        ],
      },
      {
        id: 'styles',
        title: 'Styles',
        weight: 12,
        description:
          'Advanced LESS development — working with the Magento UI library components at expert depth.',
        objectives: [
          'Explain the purpose of different LESS files (compiled and partial)',
          'Demonstrate the ability to work with LESS files',
          'Implement and customize LESS library components',
        ],
        subtopics: [
          'Compiled vs partial LESS: styles-m.less / styles-l.less as entry points that @import partials',
          'LESS library components: buttons (.lib-button()), forms (.lib-form-field()), tabs (.lib-tabs()), modals — parameterised via variables',
          'Customise a UI library component: override its variables in _theme.less before the component is imported',
          'Custom LESS mixins: .lib-vendor-prefix-* pattern, creating reusable parametrised mixins',
          'Critical CSS: identify render-blocking above-the-fold styles, inline strategy for performance',
          'Grunt / npm build: Gruntfile.js config, local LESS compilation with source maps, watch tasks',
          'Production LESS flow: setup:static-content:deploy → LESS compiled on server → CSS versioned and deployed to pub/static/',
        ],
      },
      {
        id: 'javascript',
        title: 'JavaScript',
        weight: 36,
        description:
          'The largest section — expert JavaScript across RequireJS, mixins, KnockoutJS custom bindings, jQuery widgets, UI component integration, and Layout XML wiring.',
        objectives: [
          'Demonstrate the usage of RequireJS',
          'Demonstrate the ability to implement different types of mixins',
          'Demonstrate the usage of Knockout JS',
          'Demonstrate the usage of jQuery widgets',
          'Demonstrate the usage of JS components using Layout XML',
        ],
        subtopics: [
          'RequireJS advanced: requirejs-config.js maps (aliasing), shim (non-AMD libs), config.deps (auto-load)',
          'Mixin types: AMD module mixin (wrap any module method), jQuery widget mixin, uiComponent mixin — all via requirejs-config.js config.mixins',
          'Mixin pattern: return a function wrapper, preserve original return value, avoid infinite recursion',
          'KnockoutJS observables: ko.observable, ko.observableArray, ko.computed, ko.pureComputed',
          'KO custom bindings: ko.bindingHandlers.myBinding.{init, update} — creating reusable DOM bindings',
          'KO component registration: ko.components.register, component template, viewModel — used in Magento checkout',
          'jQuery Widget Factory: $.widget inheritance, _super() call, _on() event delegation, _destroy() cleanup',
          'Custom jQuery widget: options, _create, _on, public methods accessible via $el.widgetName("method")',
          'JS components in Layout XML: <block> with <arguments><item name="jsLayout" xsi:type="array"> for checkout step injection',
          'uiComponent: defaults, links, imports, exports — data binding between components via UiRegistry',
          'Debugging: RequireJS graph in browser, Knockout context debugger, JS source maps in developer mode',
        ],
      },
      {
        id: 'admin-pageb-optimizations',
        title: 'Customizing the Admin Panel, Page Builder & Optimizations',
        weight: 20,
        description:
          'Extend the Page Builder editor with custom content types, use the Admin UI SDK, and apply frontend performance optimizations and Edge Delivery Service patterns.',
        objectives: [
          'Demonstrate the ability to customize Page Builder content',
          'Describe front-end optimization',
          'Describe how to modify and extend the Commerce admin through the admin UI SDK',
          'Define Grunt setup and usage',
          'Utilize additional tools that Commerce Cloud provides',
          'Describe steps to utilize Edge Delivery Service boilerplate',
        ],
        subtopics: [
          'Page Builder custom content type: PHP registration (Config provider), admin preview (KO template + CSS), storefront rendering (HTML template)',
          'Page Builder form configuration: form.xml defines the admin editing panel for a content type\'s settings',
          'Admin UI SDK: @adobe/commerce-admin-sdk — inject React-based panels into the Commerce admin without PHP',
          'Admin UI SDK use case: product page custom tab, order detail panel — zero-deploy front-end extensions',
          'Frontend optimisation: JavaScript merging/bundling (Require.js optimizer), CSS merging, lazy image loading, HTTP/2 push',
          'Core Web Vitals: LCP (Largest Contentful Paint), CLS (Cumulative Layout Shift), FID/INP — Commerce-specific improvements',
          'Grunt setup: npm install, grunt less for LESS compile, grunt watch for auto-rebuild, grunt clean for cache bust',
          'Cloud frontend tools: New Relic Browser agent for real-user monitoring, Fastly image optimisation (WebP, resizing)',
          'Edge Delivery Services (EDS) boilerplate: AEM-based document-driven commerce storefront, block-based authoring, Commerce drop-in components',
        ],
      },
    ],
    references: [
      {
        title: 'Official Exam Page — AD0-E727',
        url: 'https://certification.adobe.com/certification/front-end-developer-expert-v2/1250',
        category: 'official',
        description: 'Schedule the exam, download the official study guide.',
      },
      {
        title: 'Frontend Developer Guide',
        url: 'https://developer.adobe.com/commerce/frontend-core/guide/',
        category: 'devdocs',
        description: 'Advanced theme, layout, LESS, and JavaScript reference.',
      },
      {
        title: 'Page Builder Developer Guide',
        url: 'https://developer.adobe.com/commerce/frontend-core/page-builder/',
        category: 'devdocs',
        description: 'Creating and extending Page Builder content types — full reference.',
      },
      {
        title: 'UI Components Guide',
        url: 'https://developer.adobe.com/commerce/frontend-core/ui-components/',
        category: 'devdocs',
        description: 'uiElement, uiCollection, custom component creation — deep reference.',
      },
      {
        title: 'Admin UI SDK Docs',
        url: 'https://developer.adobe.com/commerce/extensibility/admin-ui-sdk/',
        category: 'devdocs',
        description: 'Inject custom React UI into the Commerce admin without backend code.',
      },
      {
        title: 'Magento_Ui module — GitHub',
        url: 'https://github.com/magento/magento2/tree/2.4-develop/app/code/Magento/Ui',
        category: 'github',
        description: 'Study real uiComponent implementations in the core codebase.',
      },
      {
        title: 'Mage2.TV Frontend Expert Series',
        url: 'https://mage2.tv',
        category: 'training',
        description: 'Video courses: advanced JavaScript, KO components, UI Components.',
      },
    ],
  },

  // ─── MASTER TIER ──────────────────────────────────────────────────────────────

  {
    slug: 'architect-master',
    examCode: 'AD0-E722',
    title: 'Adobe Commerce Architect Master',
    shortTitle: 'Architect Master',
    level: 'Master',
    description:
      'The pinnacle Adobe Commerce certification. Tests your ability to design optimal solutions for business needs, review existing implementations for quality and performance, and configure full production Cloud environments.',
    questions: 50,
    passingScore: 30,
    duration: 100,
    costUSD: 225,
    experience: '3+ years Adobe Commerce development; 1+ year leading Commerce implementation projects',
    officialUrl: 'https://certification.adobe.com/certification/commerce-architect-master/207',
    prerequisites: [
      'Adobe Commerce Developer Expert (AD0-E725) strongly recommended',
      'Broad knowledge across all Commerce domains (frontend, backend, Cloud, integrations)',
    ],
    sections: [
      {
        id: 'design',
        title: 'Design',
        weight: 46,
        description:
          'The core architect skill — design end-to-end solutions that are scalable, maintainable, and fully aligned to business requirements.',
        objectives: [
          'Design and implement optimal solutions for Adobe Commerce to meet business needs',
          'Design logical and technical flows',
          'Customize Commerce features',
          'Integrate Adobe Commerce with external systems and services',
          'Troubleshoot design flows',
        ],
        subtopics: [
          'Solution design: translate business requirements into Commerce architecture — native first, extend second, build third',
          'Integration architecture: REST (sync, immediate response) vs GraphQL (frontend-facing) vs message queues (async, decoupled) vs Adobe I/O Events (event-driven)',
          'Multi-site architecture: single instance with shared catalog vs separate instances, URL resolution, tax/currency per store view',
          'Headless architecture: when to recommend decoupled (PWA Studio / Hyva / EDS) vs traditional Luma — trade-offs in team skill, SEO, performance',
          'B2B platform architecture: company hierarchy depth, approval workflow rules, shared catalog strategy for large distributor networks',
          'Customisation strategy: plugin vs observer vs preference vs event — architectural decision criteria',
          'API design: contract-first, schema versioning, backward compatibility, async vs bulk endpoints',
          'Queue topology: topic → publisher → queue → consumer — scaling consumers, dead-letter handling',
          'Data migration: magento/data-migration-tool for M1→M2, ETL pipelines for external system bootstrapping',
          'Performance architecture: Varnish ESI (Edge Side Includes) for partial caching, Redis topology (3 instances), CDN strategy',
          'Security architecture: OAuth 2.0 server-to-server, API key lifecycle, least-privilege ACL design, CSP header strategy',
        ],
      },
      {
        id: 'review',
        title: 'Review',
        weight: 32,
        description:
          'Evaluate and refactor existing Commerce implementations — code quality, performance, security, and test coverage at an architectural level.',
        objectives: [
          'Review and refactor existing Adobe Commerce customizations',
          'Utilize Commerce test frameworks throughout the whole workflow',
          'Optimize performance and scalability for Adobe Commerce',
          'Troubleshoot to identify the root cause of issues with Adobe Commerce',
          'Enforce coding standards',
        ],
        subtopics: [
          'Code review red flags: Object Manager direct usage, missing interfaces, plugin on plugin on plugin, around() wrapping simple logic',
          'Preference abuse detection: when a preference replaces 90% of the original class unchanged — suggest plugin instead',
          'N+1 query detection: loops with repository calls, missing eager loading in collections, missing join in UI component data provider',
          'Security review: SQL injection via addFieldToFilter misuse, CSRF missing on state-changing endpoints, XSS via unescaped output',
          'Cache poisoning risks: shared cache keys without vary parameters, user-specific data in FPC-cached blocks',
          'Test framework: MFTF (Magento Functional Testing Framework) for E2E, PHPUnit integration tests with Bootstrap, unit tests with mocking',
          'Test pyramid: unit (isolated, fast) → integration (real ObjectManager, DB) → functional (browser, Selenium/WebDriver)',
          'Performance profiling: New Relic APM traces, Blackfire.io flame graphs, MySQL slow query log analysis',
          'Scalability review: indexer performance under large catalog, queue consumer scaling, session storage choice (Redis vs DB)',
          'Coding standards: PHP_CodeSniffer with Magento2 ruleset, PHPMD, PHPStan — CI enforcement',
          'Third-party module evaluation: code quality scan, upgrade risk (plugin conflicts, preference chains), security vulnerability check',
        ],
      },
      {
        id: 'configure-deploy',
        title: 'Configure & Deploy',
        weight: 22,
        description:
          'Own the full production environment — Cloud topology, CDN, caches, database scaling, monitoring, secrets, and deployment pipeline.',
        objectives: [
          'Configure Adobe Commerce and make sure the project is set up optimally',
          'Configure all aspects of Adobe Commerce Cloud',
          'Oversee and improve deployment process',
          'Troubleshoot infrastructure and configuration issues',
        ],
        subtopics: [
          'Optimal Commerce configuration: config.php checked into VCS (environment-agnostic), app/etc/env.php excluded (secrets)',
          'Production hardening: developer mode OFF, SCD complete, opcache tuned, realpath_cache for file stat reduction',
          'Pro Cloud topology: Build server → Staging (dedicated VMs: web + Varnish + Redis + ES + DB) → Production (same, multi-node)',
          'Fastly: custom VCL snippets (cache bypass, redirects, custom error pages), WAF ruleset, image optimisation (WebP, smart resizing), purge by tag/URL',
          'Redis architecture: separate Redis instances for cache (backend cache), sessions, and FPC — maxmemory-policy allkeys-lru for cache instances',
          'Elasticsearch/OpenSearch: index shards/replicas sizing, analyser configuration for language-specific tokenisation',
          'Database: Aurora MySQL with read replica for reporting, connection pool sizing, slow query log threshold',
          'Secrets management: MAGENTO_CLOUD_VARIABLES (base64 encrypted), SENSITIVE vs ENVIRONMENT scope, never in codebase',
          'Deployment pipeline: zero-downtime with maintenance mode strategy, SCD_STRATEGY=compact for fast deploys, post-deploy cache warm',
          'New Relic: custom dashboards (checkout funnel, queue depth, cache hit rate), deployment markers, alert policies (Apdex, error rate)',
          'Infrastructure troubleshooting: disk I/O on mounts, PHP-FPM pool saturation, Varnish MISS rate, Redis eviction rate, DB replica lag',
        ],
      },
    ],
    references: [
      {
        title: 'Official Exam Page — AD0-E722',
        url: 'https://certification.adobe.com/certification/commerce-architect-master/207',
        category: 'official',
        description: 'Schedule the exam, download the official study guide.',
      },
      {
        title: 'Commerce Implementation Playbook',
        url: 'https://experienceleague.adobe.com/docs/commerce-operations/implementation-playbook/best-practices/planning/overview.html',
        category: 'official',
        description: 'Adobe\'s architecture and best-practice playbook for large deployments.',
      },
      {
        title: 'Performance Best Practices',
        url: 'https://experienceleague.adobe.com/docs/commerce-operations/performance-best-practices/overview.html',
        category: 'devdocs',
        description: 'Hardware, software, and configuration recommendations for production.',
      },
      {
        title: 'Cloud Architecture — Pro',
        url: 'https://experienceleague.adobe.com/docs/commerce-cloud-service/user-guide/architecture/pro-architecture.html',
        category: 'devdocs',
        description: 'Pro plan architecture: dedicated nodes, Fastly, staging topology.',
      },
      {
        title: 'Fastly for Commerce',
        url: 'https://experienceleague.adobe.com/docs/commerce-cloud-service/user-guide/cdn/fastly.html',
        category: 'devdocs',
        description: 'VCL setup, WAF, image optimisation, cache purging — full guide.',
      },
      {
        title: 'Security & Compliance Guide',
        url: 'https://experienceleague.adobe.com/docs/commerce-operations/security-and-compliance/overview.html',
        category: 'devdocs',
        description: 'Security hardening, compliance, vulnerability management for architects.',
      },
      {
        title: 'magento/magento2 — Framework Layer',
        url: 'https://github.com/magento/magento2',
        category: 'github',
        description: 'Read Magento\\Framework\\* to understand the internals you are architecting around.',
      },
      {
        title: 'Magento StackExchange',
        url: 'https://magento.stackexchange.com',
        category: 'tool',
        description: 'Deep architectural Q&A — real-world design decisions and edge cases.',
      },
      {
        title: 'SwiftOtter Architect Master Prep',
        url: 'https://swiftotter.com/training/developers',
        category: 'training',
        description: 'Essential preparation — this is the hardest exam in the lineup.',
      },
    ],
  },
]

export function getCertBySlug(slug: string): CertExam | undefined {
  return CERT_EXAMS.find((c) => c.slug === slug)
}

export const LEVEL_ORDER: Record<CertLevel, number> = {
  Professional: 0,
  Expert: 1,
  Master: 2,
}

export const LEVEL_COLORS: Record<CertLevel, { bg: string; text: string; border: string }> = {
  Professional: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    border: 'border-blue-500/20',
  },
  Expert: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/20',
  },
  Master: {
    bg: 'bg-brand/10',
    text: 'text-brand',
    border: 'border-brand/20',
  },
}
