import { gql } from '@apollo/client'

export const TRACK_DOWNLOAD = gql`
  mutation TrackDownload($input: TrackDownloadInput!) {
    trackDownload(input: $input)
  }
`

export const TOGGLE_BOOKMARK = gql`
  mutation ToggleBookmark($input: ToggleBookmarkInput!) {
    toggleBookmark(input: $input)
  }
`

export const CREATE_COMMENT = gql`
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
      content
      status
      created_at
      user {
        id
        name
        avatar
      }
    }
  }
`
