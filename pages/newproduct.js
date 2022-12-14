import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
// actions of redux
import { addProductAction } from '../Actions/ActionsProducts'
import { showAlertAction } from '../Actions/ActionsAlert'
import { useDispatch, useSelector } from 'react-redux'
// Styles
import Loading from '../Components/Utils/Loading'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Button, Grid, Input, TextField } from '@mui/material'
import Swal from 'sweetalert2'
import Compressor from 'compressorjs'
import { PhotoCamera } from '@mui/icons-material'
import NumberFormatCustom from '../Hooks/NumberFormatCustom'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { getInfoCompanyAction } from '../Actions/ActionsCompany'
import { getCompanyAction } from '../Actions/ActionsAuth'
import useSetCategories from '../Hooks/useSetCategories'
const NewProduct = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { addCategory } = useSetCategories()

  const [numberFormat, setNumberFormat] = useState('')
  const [image, setImage] = useState({ img_html: '', image_to_Upload: '' })
  const [categoriesSelect, setCategoriesSelect] = useState('')
  useEffect(() => {
    const token = localStorage.getItem('token')
    const load = async () => {
      if (token) dispatch(getCompanyAction(token))
      dispatch(getInfoCompanyAction())
    }
    load()
  }, [dispatch, categoriesSelect])

  // get store
  const { loading, error } = useSelector((state) => state.products)
  const categories = useSelector((state) => state.company.categories)
  const _id = useSelector((state) =>
    state.auth.company ? state.auth.company._id : ''
  )
  const alert = useSelector((state) => state.alert.alert)
  const { img_html, image_to_Upload } = image
  const addProducto = (product) => dispatch(addProductAction(product))
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const onSubmit = async (data, e) => {
    e.preventDefault()
    const { productname, price } = data
    if (image_to_Upload === '') {
      const msg = {
        txt: 'the image is required',
        class: 'alert text-danger text-center text-uppercase p-3'
      }
      dispatch(showAlertAction(msg))
    } else {
      await addProducto({
        productname,
        price: Number(numberFormat),
        image_to_Upload,
        company: _id,
        category: categoriesSelect
      })
      router.push('/products')
    }
  }
  const handleImage = (e) => {
    if (e.target.files[0]) {
      new Compressor(e.target.files[0], {
        quality: 0.6,
        success (result) {
          setImage({
            ...image,
            img_html: URL.createObjectURL(e.target.files[0]),
            image_to_Upload: result
          })
        },
        error (err) {
          console.log(err.message)
        }
      })
    } else {
      setImage({ img_html: '', image_to_Upload: '' })
    }
  }
  return (
    <>
      <div className='navbar navbar-expand-lg navbar-light bg-dark'>
        <div className='container'>
          <Link className='navbar-brand white' href='/products'>
            <ArrowBackIcon color='warning' fontSize='large' />
          </Link>
        </div>
      </div>
      <div className='container'>
        <div className='card'>
          <div className='card-body'>
            <h2 className='text-center mb-4 font-weight-bold'>
              Add new product
            </h2>
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
            {error
              ? (
                <div className='alert alert-danger mt-3' role='alert'>
                  There was a mistake
                </div>
                )
              : null}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container gap={2} direction='row'>
                <TextField
                  id='filled-basic'
                  label='Name'
                  variant='filled'
                  {...register('productname', { required: true })}
                  helperText='required'
                  error={errors.productname}
                />
                <TextField
                  id='filled-basic'
                  label='Price'
                  variant='filled'
                  {...register('price', { required: true })}
                  value={numberFormat}
                  placeholder='$'
                  onChange={(e) => setNumberFormat(e.target.value)}
                  helperText='required'
                  error={errors.price}
                  InputProps={{
                    inputComponent: NumberFormatCustom
                  }}
                />
              </Grid>
              <div className='form-group my-3'>
                <legend>Imagen:</legend>
                <Grid paddingBottom={2}>
                  <label htmlFor='contained-button-file'>
                    <Input
                      sx={{ display: 'none' }}
                      onChange={handleImage}
                      accept='image/*'
                      id='contained-button-file'
                      multiple
                      type='file'
                    />
                    <Button
                      endIcon={<PhotoCamera />}
                      variant='contained'
                      component='span'
                    >
                      Upload
                    </Button>
                  </label>
                  {alert != null
                    ? (
                      <div className={alert.class} role='alert'>
                        {alert.txt}
                      </div>
                      )
                    : null}
                </Grid>
                <div className='image-drop'>
                  {img_html
                    ? (
                      <Image
                        height='100%'
                        width='100%'
                        layout='responsive'
                        src={img_html}
                        alt='product-show'
                      />
                      )
                    : null}
                </div>
              </div>
              <div className='form-group my-3'>
                <label>Categoria:</label>
                <select
                  onChange={(e) => {
                    if (e.target.value === 'new') {
                      setCategoriesSelect('')
                      Swal.fire({
                        icon: 'info',
                        showCancelButton: true,
                        input: 'text',
                        text: 'Ingrese el nombre de la nueva categoria',
                        confirmButtonText: 'listo',
                        cancelButtonText: 'Cancelar'
                      }).then((result) => {
                        if (result.isConfirmed && result.value !== '') {
                          const value = result.value.toLowerCase().trim()
                          addCategory({
                            category: value.trim()
                          }).then(() => {
                            Swal.fire({
                              position: 'top-end',
                              icon: 'success',
                              title: 'Categoria creada',
                              text: 'Fue agregada a tu lista!',
                              showConfirmButton: false,
                              timer: 2000
                            })
                          })
                        }
                        e.target.value = ''
                      })
                    } else {
                      setCategoriesSelect(e.target.value)
                    }
                  }}
                  className='form-control'
                >
                  <option value='' disabled selected>
                    Seleccione
                  </option>
                  <option value='new'>-- Crear nueva categoria -- </option>
                  {categories.length &&
                    categories.map((category) => (
                      <option key={category} value={category}>
                        {category.toUpperCase()}
                      </option>
                    ))}
                </select>
              </div>
              <Grid container justifyContent='center'>
                <Button
                  disabled={loading}
                  type='submit'
                  variant='contained'
                  color='info'
                  sx={{ padding: '10px 40px' }}
                >
                  add
                </Button>
              </Grid>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewProduct
