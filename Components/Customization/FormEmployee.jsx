import { Cancel } from '@mui/icons-material'
import {
  Box,
  Button,
  NativeSelect,
  TextField,
  InputLabel,
  FormControl,
  Stack,
  IconButton,
  Typography,
  Modal
} from '@mui/material'
import { useState } from 'react'
import useAddEmployee from '../../Hooks/useAddEmployee'
const SocialMediaIcon = ({ socialMedia, socialMediaItem, socialMediaSelected, setSocialMediaSelected }) => {
  function getRandomArbitrary (min, max) {
    return Math.random() * (max - min) + min
  }

  const isDisabled = socialMediaSelected.map(i => (
    i.name
  )).indexOf(socialMediaItem) !== -1
  return (
    <IconButton disabled={isDisabled} onClick={() => setSocialMediaSelected([...socialMediaSelected, { name: socialMediaItem, value: '', id: getRandomArbitrary(0, 1000000) }])}>
      {socialMedia[socialMediaItem].icon}
    </IconButton>
  )
}
const FormEmployee = ({ employees }) => {
  const { newEmployeeFn, socialMedia, handleOpen, isOpen, handleClose } = useAddEmployee(employees)
  const [form, setForm] = useState({ name: '', role: '', socialMedia: [] })
  const [socialMediaSelected, setSocialMediaSelected] = useState([
  ])
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (Object.keys(socialMedia).indexOf(e.target.name) !== -1) {
      setForm({ ...form, socialMedia: { ...form.socialMedia, [e.target.name]: e.target.value } })
    }
  }
  const deleteSocialMedia = (item) => {
    // console.log(item)
    const socialMedia = form.socialMedia
    delete socialMedia[item.name]

    // console.log(socialMedia.get('socialMedia', form.socialMedia ))
    setForm({ ...form, socialMedia })
    setSocialMediaSelected(socialMediaSelected.filter(i => (
      i.id != item.id
    )))
  }
  const onSubmit = (e) => {
    e.preventDefault()
    newEmployeeFn(form)
    setForm({ name: '', role: '', socialMedia: [] })
    setSocialMediaSelected([])
  }
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
    zIndex: 5
  }
  return (
    <>
      <Button onClick={handleOpen}>Add new employee</Button>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={styleModal}>
          <form onSubmit={onSubmit}>
            <legend>Add a new employeee</legend>
            <Stack direction='column' spacing={2}>
              <TextField
                autoComplete='off'
                onChange={handleChange}
                name='name'
                label='name'
                variant='outlined'
                required
              />
              <TextField
                autoComplete='off'
                onChange={handleChange}
                name='role'
                label='role'
                variant='outlined'
                required
              />
              <Typography textAlign='center'>Add employee &apos;s social media</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {Object.keys(socialMedia).map(socialMediaItem => (
                  // other component
                  <SocialMediaIcon
                    key={socialMediaItem}
                    socialMedia={socialMedia}
                    socialMediaItem={socialMediaItem}
                    socialMediaSelected={socialMediaSelected}
                    setSocialMediaSelected={setSocialMediaSelected}
                  />
                ))}
              </Box>
              {socialMediaSelected.map(item => (
                <>
                  <Stack direction='row' spacing={1}>
                    <TextField
                      key={item.name}
                      onChange={handleChange}
                      label={item.name}
                      name={item.name}
                      placeholder={socialMedia[item.name].placeholder}
                      autoComplete='off'
                    />

                    <IconButton
                      name={item.id}
                      onClick={() => deleteSocialMedia(item)}
                    >
                      <Cancel />
                    </IconButton>
                  </Stack>
                </>
              ))}
              <Button variant='outlined' type='submit'>
                Add
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
    </>
  )
}
export default FormEmployee
