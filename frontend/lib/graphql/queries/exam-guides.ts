import { gql } from '@apollo/client'

// Use GraphQL aliases to return camelCase field names matching existing TypeScript types
export const GET_EXAM_GUIDES = gql`
  query GetExamGuides($level: String) {
    examGuides(level: $level) {
      id
      slug
      examCode: exam_code
      title
      shortTitle: short_title
      level
      description
      questions
      passingScore: passing_score
      duration
      costUSD: cost_usd
      experience
      officialUrl: official_url
      prerequisites
      sections {
        id: section_key
        title
        weight
        description
        objectives
        subtopics
      }
      references {
        title
        url
        category
        description
      }
    }
  }
`

export const GET_EXAM_GUIDE = gql`
  query GetExamGuide($slug: String!) {
    examGuide(slug: $slug) {
      id
      slug
      examCode: exam_code
      title
      shortTitle: short_title
      level
      description
      questions
      passingScore: passing_score
      duration
      costUSD: cost_usd
      experience
      officialUrl: official_url
      prerequisites
      sections {
        id: section_key
        title
        weight
        description
        objectives
        subtopics
        lessons {
          id
        }
      }
      references {
        title
        url
        category
        description
      }
    }
  }
`

export const GET_LEARN_SECTION = gql`
  query GetLearnSection($examSlug: String!, $sectionKey: String!) {
    examGuide(slug: $examSlug) {
      examCode: exam_code
      title
      shortTitle: short_title
      level
      sections {
        id: section_key
        title
        weight
        objectives
      }
    }
    examGuideSection(examSlug: $examSlug, sectionKey: $sectionKey) {
      id: section_key
      title
      description
      weight
      objectives
      lessons {
        id
        objectiveIndex: objective_index
        title
        slug
        content
        sortOrder: sort_order
      }
    }
  }
`
