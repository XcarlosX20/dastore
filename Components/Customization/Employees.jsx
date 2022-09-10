import { Twitter, Instagram } from '@mui/icons-material'
import { IconButton, Box, Card, CardContent, CardMedia, Grid, Typography, Button, Modal } from '@mui/material'
import useAddEmployee from '../../Hooks/useAddEmployee'
import FormEmployee from './FormEmployee'
const Employees = ({ employees }) => {
  const { isOpen, handleOpen, handleClose } = useAddEmployee()

  const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '80vh',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',
    zIndex: 5,
  }
  return (
    <>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={styleModal}>
          <FormEmployee />
        </Box>
      </Modal>
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
          </Card>
        ))}
      </Grid>
    </>
  )
}

export default Employees
