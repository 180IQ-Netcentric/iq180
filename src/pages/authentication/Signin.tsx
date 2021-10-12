import React from 'react'
import GameContainer from '@/components/containers/GameContainer'
import RoundedTextField from '@/components/common/RoundedTextField'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@mui/material'
import { SignInInfo } from '@/dto/Authentication.dto'

const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const fields = {
    username: {
      name: 'Username',
      rules: {
        required: { value: true, message: 'This field is required' },
        minLength: { value: 2, message: 'Username is too short' },
      },
      message: 'Invalid Username',
    },
    password: {
      name: 'Password',
      rules: {
        required: { value: true, message: 'This field is required' },
        minLength: { value: 6, message: 'Password is too short' },
      },
      message: 'Invalid Password',
    },
  }

  const onSubmit = (data: any) => {
    console.log(data)
  }

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
              Submit
            </Button>
          </form>
        </div>
        <div className='form-img'></div>
      </div>
    </GameContainer>
  )
}

export default SignIn
