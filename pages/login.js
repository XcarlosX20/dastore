import {
  Grid,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Loading from '../Components/Utils/Loading'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { authCompanyAction } from '../Actions/ActionsAuth'
// import { showAlertAction } from "../Actions/ActionsAlert";
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import Image from 'next/image'
const Login = () => {
  const { loading, auth } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const router = useRouter()
  const authCompany = (company) => dispatch(authCompanyAction(company))
  // const showAlert = (alert) => dispatch(showAlertAction(alert));
  const { alert } = useSelector((state) => state.alert)
  const [values, setValues] = useState({
    companyEmail: '',
    password: '',
    showPassword: false
  })
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword
    })
  }
  // for email validation: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)/.test(values.email)
  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }
  const login = async (e) => {
    e.preventDefault()
    if (values.password && values.email) {
      const company = {
        companyEmail: values.email,
        password: values.password
      }
      await authCompany(company)
    } else {
      Swal.fire({
        title: 'all fields are required',
        icon: 'info'
      })
    }
  }
  useEffect(() => {
    if (auth) {
      router.push('/products')
    }
  }, [auth])
  const dialog = {
    zIndex: 10,
    position: 'fixed',
    top: '50%',
    left: '50%',
    width: '100%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'transparent'
  }
  return (
    <>
      {alert != null && (
        <div className={alert.class} role='alert'>
          {alert.txt}
        </div>
      )}
      {loading && (
        <Box sx={dialog}>
          <Loading />
        </Box>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box className='login trapecio'>
            <Image
              height='100%'
              width='100%'
              layout='responsive'
              src='/login-img.png'
              alt='login'
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid
            paddingX='5rem'
            container
            direction='column'
            justifyContent='center'
            alignItems='center'
            height='100%'
          >
            <form onSubmit={login}>
              <Grid container rowGap={2}>
                <h3>Login</h3>
                <FormControl fullWidth>
                  <InputLabel>Email</InputLabel>
                  <OutlinedInput
                    label='Email'
                    onChange={handleChange('email')}
                  />
                </FormControl>
                <FormControl fullWidth variant='outlined'>
                  <InputLabel htmlFor='outlined-adornment-password'>
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id='outlined-adornment-password'
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge='end'
                        >
                          {values.showPassword
                            ? (
                              <VisibilityOff />
                              )
                            : (
                              <Visibility />
                              )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label='Password'
                  />
                </FormControl>
                <Button variant='contained' color='info' type='submit'>
                  Login
                </Button>
              </Grid>
            </form>
            <Button
              startIcon={<VisibilityIcon />}
              sx={{ marginTop: '0.5rem' }}
              onClick={async () => {
                await authCompany({
                  companyEmail: 'admin',
                  password: 'admin'
                })
              }}
            >
              Sign in as a guest
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default Login
