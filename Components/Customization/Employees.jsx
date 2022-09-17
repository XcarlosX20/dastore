import { Twitter, Instagram, Delete } from '@mui/icons-material'
import { IconButton, Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'

import FormEmployee from './FormEmployee'
const Employees = ({ employees }) => {
  const deleteCategory = (category) => {
    console.log(category)
  }
  return (
    <>
      <FormEmployee employees={employees} />
      <Grid container direction='row' gap={2}>
        {employees.map((item) => (
          <Card
            key={item.name}
            raised
            sx={{
              display: 'flex',
              border: '1px solid #e0e0e0'
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component='div' variant='h5'>
                  {item.name}
                </Typography>
                <Typography
                  variant='subtitle1'
                  color='text.secondary'
                  component='div'
                >
                  {item.role}
                </Typography>
              </CardContent>
              <Box
                sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}
              >
                <IconButton>
                  <Twitter />
                </IconButton>
                <IconButton>
                  <Instagram />
                </IconButton>
              </Box>
            </Box>
            <CardMedia
              component='img'
              sx={{ width: 151 }}
              image={item.img}
              alt='Live from space album cover'
            />
            <Box>
              <IconButton
                size='small'
                color='error'
                onClick={() => deleteCategory(item)}
              >

                <Delete />
              </IconButton>
            </Box>
          </Card>
        ))}
      </Grid>
    </>
  )
}

export default Employees
