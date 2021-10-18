export interface AuthenticationErrorMessage {
  message: string
  reason: string
}

export const signUpError = (reason: string) => {
  switch (reason) {
    case 'BAD_REQUEST':
      return {
        title: 'Sign Up Error',
        description: 'All inputs are required.',
      }
    case 'INVALID_USERNAME':
      return {
        title: 'Sign Up Error',
        description: 'This username is not available.',
      }
    case 'USERNAME_ALREADY_USED':
      return {
        title: 'Sign Up Error',
        description: 'This username has already been used',
      }
    default:
      return {
        title: 'Sign Up Error',
        description: 'An error has occured. Please try again.',
      }
  }
}

export const signInError = (reason: string) => {
  switch (reason) {
    case 'BAD_REQUEST':
      return {
        title: 'Sign In Error',
        description: 'All inputs are required.',
      }
    case 'INCORRECT_USERNAME_OR_PASSWORD':
      return {
        title: 'Sign In Error',
        description: 'Username or password may be wrong. Please try again.',
      }
    default:
      return {
        title: 'Sign In Error',
        description: 'An error has occured. Please try again.',
      }
  }
}

export const scoreboardError = (reason: string) => {
  switch (reason) {
    case 'Unauthorized':
      return {
        title: 'Unauthorized',
        description: 'Only user can use this api',
      }
    case 'INVALID_TOKEN':
      return {
        title: 'Invalid Token',
        description: 'The provided token is invalid',
      }
    case 'TOKEN_IS_REQUIRED':
      return {
        title: 'Token is required',
        description: 'A token is required for authentication',
      }
    default:
      return {
        title: 'Error',
        description: 'An error has occured. Please try again.',
      }
  }
}

export const usernameError = (reason: string) => {
  switch (reason) {
    case 'BAD_REQUEST':
      return {
        title: 'Cannot change username',
        description: 'All input is required."',
      }
    case 'INVALID_USERNAME':
      return {
        title: 'Invalid Token',
        description: 'This username is not available',
      }
    case 'Unauthorized':
      return {
        title: 'Cannot change username',
        description: 'Only user can use this api',
      }
    case 'INVALID_TOKEN':
      return {
        title: 'Cannot change username',
        description: 'The token is not valid.',
      }
    case 'TOKEN_IS_REQUIRED':
      return {
        title: 'Cannot change username',
        description: 'A token is required for authentication',
      }
    case 'NOT_FOUND':
      return {
        title: 'Cannot change username',
        description: 'This object id is no longer exist.',
      }
    default:
      return {
        title: 'Error',
        description: 'An error has occured. Please try again.',
      }
  }
}
