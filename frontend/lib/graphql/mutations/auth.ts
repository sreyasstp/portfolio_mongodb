import { gql } from '@apollo/client'

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      access_token
      token_type
      expires_in
      user {
        id
        name
        email
        avatar
        role
      }
    }
  }
`

export const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      access_token
      token_type
      expires_in
      user {
        id
        name
        email
        avatar
        role
      }
    }
  }
`

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`

export const SOCIAL_LOGIN_MUTATION = gql`
  mutation SocialLogin($input: SocialLoginInput!) {
    socialLogin(input: $input) {
      access_token
      token_type
      expires_in
      user {
        id
        name
        email
        avatar
        role
      }
    }
  }
`
