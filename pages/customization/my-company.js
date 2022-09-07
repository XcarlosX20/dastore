import { useState, useRef, useEffect } from 'react'
import Side from '../Layout/Side'
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'
import Head from 'next/head'
import Employees from '../../Components/Customization/Employees'
const Mycompany = () => {
  const [employees, setEmployees] = useState([
    {
      name: 'Jonh Doe',
      role: 'Delivery',
      img: 'https://i0.wp.com/www.diegocoquillat.com/wp-content/uploads/2019/05/14-cosas-que-nunca-te-han-dicho-sobre-el-delivery.jpg?fit=700%2C336&ssl=1&resize=1280%2C720'
    },
    {
      name: 'Julia Doe',
      role: 'Vendor',
      img: 'https://scontent-mia3-2.xx.fbcdn.net/v/t1.18169-9/1487431_778207162261881_3365932417199548497_n.jpg?stp=cp0_dst-jpg_e15_fr_q65&_nc_cat=109&ccb=1-7&_nc_sid=85a577&efg=eyJpIjoidCJ9&_nc_ohc=4d8yly6FxXEAX--wMin&_nc_ht=scontent-mia3-2.xx&oh=00_AT-ccDSO-54YHt5rAaN0qjXSHRf5VIzXc7V04Jvy97XuvQ&oe=62C25643'
    },
    {
      name: 'Pedro Perez',
      role: 'CEO',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbpv7KEev0tRwk3RSNXme6C_rbEdk8lwSXSA&usqp=CAU'
    },
    {
      name: 'Paula Lee',
      role: 'Founder',
      img: 'https://www.europeanceo.com/wp-content/uploads/2017/08/CEO-magic-touch.jpg'
    }
  ])
  const [isEdit, setIsEdit] = useState(false)
  const [value, setValue] = useState(
    '<div><strong><em><del>xdassasa assa</del></em></strong></div>'
  )
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
