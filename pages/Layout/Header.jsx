import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddOutlined } from '@mui/icons-material'
import { Button, Container, Grid, Typography } from '@mui/material'
import Link from 'next/link'
import Drawer from '../../Components/Utils/Drawer'
import { Box } from '@mui/system'
import { getCompanyAction } from '../../Actions/ActionsAuth'
import Notifications from '../../Components/Notifications'
const Header = ({ title }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    const token = localStorage.getItem('token')
    const getCompany = (token) => {
      dispatch(getCompanyAction(token))
    }
    if (token) getCompany(token)
  }, [dispatch])
  const { companyName, _id } = useSelector(state => state.auth.company) || ''
  return (
    <Box color='dark.main' sx={{ backgroundColor: 'dark.main' }}>

      <nav className='navbar navbar-expand-lg navbar-dark'>
        <Container>
          <Grid container direction='row' justifyContent='space-between' alignItems='center'>
            <Grid
              item
              justifyContent='flex-start'
            >
              <Link href='/products'>
                <h1 className='text-light'>{title || companyName}</h1>
              </Link>
            </Grid>
            <Grid
              container
              direction='row'
              justifyContent='flex-end'
              alignItems='center'
            >
              <Link href='/newproduct'>
                <Button color='light'>
                  <AddOutlined />
                  <Typography>Product</Typography>
                </Button>
              </Link>
              <Notifications _id={_id} />
              <Drawer />
            </Grid>
          </Grid>
        </Container>
      </nav>
    </Box>
  )
}

export default Header
