import { useState, useRef, useEffect } from 'react'
import Side from '../Layout/Side'
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'
import Head from 'next/head'
import Employees from '../../Components/Customization/Employees'
import { useDispatch, useSelector } from 'react-redux'
import { getInfoCompanyAction } from '../../Actions/ActionsCompany'
const Mycompany = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getInfoCompanyAction())
  }, [dispatch])

  const [isEdit, setIsEdit] = useState(false)
  const [value, setValue] = useState(
    '<div><strong><em><del>xdassasa assa</del></em></strong></div>'
  )
  const employees = useSelector((state) => state.company.employees)
  // evaluar si un usuario de twitter existe
  // const getUserTwitter = async () => {
  //   const url = "https://api.twitter.com/2/users/by/username/CuentaMister";
  //   const api = await axios.get(url);
  //   console.log(api);
  // };
  const aboutRef = useRef(null)
  const trixRef = useRef(null)
  const onSubmit = (e) => {
    e.preventDefault()
    const newDescription = aboutRef.current.value
    if (newDescription) {
      setValue(newDescription)
    }
    setIsEdit(false)
  }
  const initEdit = () => {
    console.log(aboutRef.current.value)
    setIsEdit(true)
  }
  const cancelEdit = () => {
    setIsEdit(false)
  }

  return (
    <>
      <Head>
        <title>My company</title>
        <link
          rel='stylesheet'
          type='text/css'
          href='https://cdnjs.cloudflare.com/ajax/libs/trix/1.3.1/trix.css'
        />
        <script
          src='https://cdnjs.cloudflare.com/ajax/libs/trix/1.3.1/trix.js'
          type='text/javascript'
          async
        />
      </Head>
      <Side>
        <h3>Acerca de la empresa</h3>
        <form onSubmit={onSubmit} className='trix-editor'>
          <input
            defaultValue={value}
            value={value}
            ref={aboutRef}
            id='x'
            type='hidden'
            name='about'
          />
          <trix-editor ref={trixRef} onClick={initEdit} input='x' />
          <Button hidden={!isEdit} type='submit'>
            edit
          </Button>
          <Button hidden={!isEdit} onClick={cancelEdit}>
            cancel
          </Button>
        </form>
        <div>
          <Typography py={2}>Empleados:</Typography>
          <Employees employees={employees} />
        </div>
      </Side>
    </>
  )
}

export default Mycompany
