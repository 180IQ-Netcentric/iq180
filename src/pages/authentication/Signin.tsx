import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router'
import GameContainer from '@/components/containers/GameContainer'
import RoundedTextField from '@/components/common/RoundedTextField'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@mui/material'
import { SignUpResponse } from '@/dto/Authentication.dto'

import AuthenImage from '../../assets/images/authen.jpg'
import { Link } from 'react-router-dom'
import { client } from '@/config/axiosConfig'
import { setCookie } from '@/utils/cookie'
import { UserContext } from '@/contexts/userContext'
import { AuthContext } from '@/contexts/authContext'

const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { setUser } = useContext(UserContext)
  const { isUser, setToken } = useContext(AuthContext)
  const history = useHistory()

  const fields = {
    username: {
      name: 'username',
      rules: {
        required: { value: true, message: 'This field is required' },
        minLength: { value: 2, message: 'Username is too short' },
      },
      message: 'Invalid Username',
    },
    password: {
      name: 'password',
      rules: {
        required: { value: true, message: 'This field is required' },
        minLength: { value: 6, message: 'Password is too short' },
      },
      message: 'Invalid Password',
    },
  }

  const onSubmit = (info: any) => {
    // Post to backend
    client
      .post('/login', { ...info })
      .then(({ data }) => {
        const user: SignUpResponse = data
        setToken(user.jwt)
        setCookie('token', user.jwt, 7)
        setUser(user)
        history.replace('/')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (isUser) history.push('/')
  }, [isUser])

  return (
    <GameContainer>
      <div className='authentication-container'>
        <div className='form-container'>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='form-text-field'>
              <Controller
                render={({ field: { name, value, onChange } }) => (
                  <RoundedTextField
                    name={name}
                    value={value}
                    required
                    onChange={onChange}
                    label='Username'
                    error={Boolean(errors[fields.username.name])}
                    helperText={
                      errors[fields.username.name]
                        ? errors[fields.username.name].message
                        : ''
                    }
                    sx={{ width: '100%', margin: '0 0 24px 0' }}
                  />
                )}
                control={control}
                name={fields.username.name}
                defaultValue=''
                rules={fields.username.rules}
              />
            </div>
            <div className='form-text-field'>
              <Controller
                render={({ field: { name, value, onChange } }) => (
                  <RoundedTextField
                    name={name}
                    value={value}
                    type='password'
                    required
                    onChange={onChange}
                    label='Password'
                    error={Boolean(errors[fields.password.name])}
                    helperText={
                      errors[fields.password.name]
                        ? errors[fields.password.name].message
                        : ''
                    }
                    sx={{ width: '100%', margin: '0 0 24px 0' }}
                  />
                )}
                control={control}
                name={fields.password.name}
                defaultValue=''
                rules={fields.password.rules}
              />
            </div>
            <Button
              variant='contained'
              size='large'
              sx={{ width: '100%', height: '50px', borderRadius: '15px' }}
              type='submit'
            >
              Sign In
            </Button>
          </form>
          <p>
            No account? &nbsp;
            <Link to='/signup' className='signup-text'>
              Sign up now!
            </Link>
          </p>
        </div>
        <div className='form-img'>
          <img src={AuthenImage} alt='authentication' />
        </div>
      </div>
    </GameContainer>
  )
}

export default SignIn
