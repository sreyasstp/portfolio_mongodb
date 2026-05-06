import { gql } from '@apollo/client'

export const GET_BLOGS = gql`
  query GetBlogs(
    $first: Int
    $page: Int
    $status: PublishStatus
    $featured: Boolean
    $category_id: ID
    $search: String
  ) {
    blogs(
      first: $first
      page: $page
      status: $status
      featured: $featured
      category_id: $category_id
      search: $search
    ) {
      paginatorInfo {
        count
        currentPage
        hasMorePages
        lastPage
        perPage
        total
      }
      data {
        id
        title
        slug
        excerpt
        featured_image
        tags
        reading_time
        view_count
        is_featured
        published_at
        author {
          id
          name
          avatar
        }
        category {
          id
          name
          slug
          color
        }
      }
    }
  }
`

export const GET_BLOG = gql`
  query GetBlog($slug: String!) {
    blog(slug: $slug) {
      id
      title
      slug
      excerpt
      content
      featured_image
      tags
      reading_time
      view_count
      is_featured
      seo_title
      seo_description
      published_at
      comments_count
      author {
        id
        name
        avatar
        profile {
          headline
        }
      }
      category {
        id
        name
        slug
        color
      }
    }
  }
`
