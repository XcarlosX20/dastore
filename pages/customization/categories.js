import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Side from '../Layout/Side'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, TextField } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { getInfoCompanyAction } from '../../Actions/ActionsCompany'
import { useForm } from 'react-hook-form'
import Loading from '../../Components/Utils/Loading'
import useSetCategories from '../../Hooks/useSetCategories'
const bull = (
  <Box
    component='span'
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
)
const Categories = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const dispatch = useDispatch()
  useEffect(() => {
    const load = async () => {
      dispatch(getInfoCompanyAction())
    }
    load()
  }, [dispatch])
  const [openForm, setOpenForm] = useState(false)
  const categories = useSelector((state) =>
    state.company ? state.company.categories : []
  )
  const { deleteCategory, addCategory } = useSetCategories()
  const loading = useSelector((state) => state.company.loading)
  return (
    <>
      <Side>
        {loading && (
          <Box
            sx={{
              zIndex: 10,
              position: 'fixed',
              top: '50%',
              left: '50%',
              width: '100%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'transparent'
            }}
          >
            <Loading />
          </Box>
        )}
        {openForm && (
          <form
            onSubmit={handleSubmit(async (data, e) => {
              addCategory({
                category: data.category.trim()
              })
              e.target.reset()
            })}
          >
            <Grid container rowGap={1} direction='row'>
              <Grid item sx>
                <TextField
                  {...register('category', { required: true })}
                  label='category name'
                  error={errors.category}
                  autocomplete='off'
                />
              </Grid>
              <Grid item sx>
                <Button variant='filled' type='submit'>
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
        <Button onClick={() => setOpenForm(true)}>Add new category</Button>
        <Grid gap={3} container direction='row'>
          {categories.length > 0 &&
            categories.map((category) => (
              <Card key={category} sx={{ minWidth: 180 }}>
                <CardContent>
                  <Typography
                    sx={{ textTransform: 'capitalize' }}
                    variant='h5'
                    component='div'
                  >
                    {bull}
                    {category}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => deleteCategory({ category })}
                    size='small'
                    color='error'
                  >
                    <Delete />
                  </Button>
                </CardActions>
              </Card>
            ))}
        </Grid>
      </Side>
    </>
  )
}

export default Categories
