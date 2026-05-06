import { gql } from '@apollo/client'

export const GET_EXTENSIONS = gql`
  query GetExtensions(
    $first: Int
    $page: Int
    $type: ExtensionType
    $featured: Boolean
    $search: String
  ) {
    extensions(
      first: $first
      page: $page
      type: $type
      featured: $featured
      search: $search
    ) {
      paginatorInfo {
        total
        hasMorePages
        currentPage
        lastPage
      }
      data {
        id
        title
        slug
        short_description
        thumbnail
        version
        magento_versions
        type
        license
        download_count
        rating
        is_featured
        github_url
        tags
        category {
          id
          name
          color
        }
      }
    }
  }
`

export const GET_EXTENSION = gql`
  query GetExtension($slug: String!) {
    extension(slug: $slug) {
      id
      title
      slug
      short_description
      description
      version
      magento_versions
      thumbnail
      screenshots
      file_name
      file_size
      download_url
      type
      license
      download_count
      rating
      github_url
      packagist_url
      demo_url
      documentation_url
      changelog
      tags
      author {
        id
        name
        avatar
      }
      category {
        id
        name
        color
      }
      created_at
      updated_at
    }
  }
`

export const GET_LEARNING_RESOURCES = gql`
  query GetLearningResources(
    $first: Int
    $page: Int
    $type: ResourceType
    $access_level: AccessLevel
    $featured: Boolean
    $search: String
  ) {
    learningResources(
      first: $first
      page: $page
      type: $type
      access_level: $access_level
      featured: $featured
      search: $search
    ) {
      paginatorInfo {
        total
        hasMorePages
        currentPage
      }
      data {
        id
        title
        slug
        description
        thumbnail
        type
        access_level
        file_type
        file_size
        download_count
        is_featured
        tags
        category {
          id
          name
          color
        }
      }
    }
  }
`
