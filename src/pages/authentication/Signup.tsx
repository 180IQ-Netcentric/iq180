import React from 'react'
import bcrypt from 'bcryptjs'
import GameContainer from '@/components/containers/GameContainer'
import RoundedTextField from '@/components/common/RoundedTextField'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@mui/material'
import { SignInInfo } from '@/dto/Authentication.dto'

import AuthenImage from '../../assets/images/authen.jpg'
import { Link } from 'react-router-dom'

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm()

  const watchFields = watch('password')

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
    repeatPassword: {
      name: 'repeatPassword',
      rules: {
        required: { value: true, message: 'This field is required' },
        minLength: { value: 6, message: 'Password is too short' },
        validate: (value: string) =>
          value === watchFields || 'The passwords do not match',
      },
      message: 'Invalid Password',
    },
  }

  const onSubmit = (data: SignInInfo) => {
    const salt = bcrypt.genSaltSync(10)
    data = {
      ...data,
      password: bcrypt.hashSync(data.password, salt),
    }
    // Post to backend
  }

  return (
    <GameContainer>
      <div className='authentication-container'>
        <div className='form-container'>
          <h1>Sign Up</h1>
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
            <div className='form-text-field'>
              <Controller
                render={({ field: { name, value, onChange } }) => (
                  <RoundedTextField
                    name={name}
                    value={value}
                    type='password'
                    required
                    onChange={onChange}
                    label='Repeat Password'
                    error={Boolean(errors[fields.repeatPassword.name])}
                    helperText={
                      errors[fields.repeatPassword.name]
                        ? errors[fields.repeatPassword.name].message
                        : ''
                    }
                    sx={{ width: '100%', margin: '0 0 24px 0' }}
                  />
                )}
                control={control}
                name={fields.repeatPassword.name}
                defaultValue=''
                rules={fields.repeatPassword.rules}
              />
            </div>
            <Button
              variant='contained'
              size='large'
              sx={{ width: '100%', height: '50px', borderRadius: '15px' }}
              type='submit'
            >
              Sign Up
            </Button>
          </form>
          <p>
            Already have an account? &nbsp;
            <Link to='/signin' className='signup-text'>
              Sign in now!
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

export default SignUp
