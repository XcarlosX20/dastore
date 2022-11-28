import { Alert, Box, Button, Grid, TextField } from '@mui/material'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import {
  ContainerForm,
  Body,
  BodyResetPassword
} from '../../Components/ResetPassword/Components'
import Loading from '../../Components/Utils/Loading'
import useResetPassword from '../../Hooks/useResetPassword'

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const { handleEmail, alert, loading } = useResetPassword()
  const onSubmit = (data, e) => {
    handleEmail(data.email)
    e.target.reset()
  }
  return (
    <>
      {loading && <Loading fixed />}
      {alert && <Alert color={alert?.type}>{alert?.msg}</Alert>}
      <BodyResetPassword>
        <Box
          sx={{
            padding: '2px 0',
            borderRadius: '0px 0px 1rem 0px',
            backgroundColor: 'primary.main',
            width: '10rem',
            fontSize: '1.5rem',
            color: '#FFF',
            cursor: 'pointer'
          }}
        >
          <Link href='/login'>
            <p>Go to login</p>
          </Link>
        </Box>

        <ContainerForm>
          <legend>
            Enter your email address to send you a link reset password
          </legend>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid
              container
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0.4rem'
              }}
            >
              <TextField
                label='email'
                {...register('email', { required: true })}
                placeholder='myemail@mail.com'
              />
              <Button type='submit'>send email</Button>
            </Grid>
          </form>
        </ContainerForm>
      </BodyResetPassword>
    </>
  )
}

export default ResetPassword
