import { gql } from '@apollo/client'

export const GET_PROJECTS = gql`
  query GetProjects($first: Int, $page: Int, $featured: Boolean) {
    projects(first: $first, page: $page, featured: $featured, status: PUBLISHED) {
      paginatorInfo {
        total
        hasMorePages
        currentPage
      }
      data {
        id
        title
        slug
        summary
        thumbnail
        tech_stack
        live_url
        github_url
        is_featured
        completed_at
        skills {
          id
          name
          icon
          category
        }
        categories {
          id
          name
          color
        }
      }
    }
  }
`

export const GET_PROJECT = gql`
  query GetProject($slug: String!) {
    project(slug: $slug) {
      id
      title
      slug
      summary
      description
      thumbnail
      gallery
      tech_stack
      live_url
      github_url
      case_study_url
      completed_at
      skills {
        id
        name
        icon
        category
        proficiency
      }
    }
  }
`

export const GET_SKILLS = gql`
  query GetSkills($category: String, $featured: Boolean) {
    skills(category: $category, featured: $featured) {
      id
      name
      slug
      icon
      category
      proficiency
      is_featured
      sort_order
    }
  }
`

export const GET_CERTIFICATIONS = gql`
  query GetCertifications {
    certifications {
      id
      title
      slug
      issuer
      badge_image
      description
      study_guide
      exam_topics
      recommended_resources
      issued_at
      expires_at
      is_active
      is_featured
    }
  }
`
