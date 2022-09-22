import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setInfoCompanyAction } from '../Actions/ActionsCompany'
import {
  Cancel,
  Facebook,
  Instagram,
  LinkedIn,
  Twitter
} from '@mui/icons-material'
const useAddEmployee = (employees = []) => {
  const dispatch = useDispatch()
  const [newEmployee, setNewEmployee] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const socialMedia = {
    instagram: { placeholder: 'Enter the username', icon: <Instagram /> },
    facebook: { placeholder: "Enter the profile's url", icon: <Facebook /> },
    linkedIn: { placeholder: "Enter the profile's url", icon: <LinkedIn /> },
    twitter: { placeholder: 'Enter the username', icon: <Twitter /> }
  }
  const newEmployeeFn = (cb) => {
    setNewEmployee(cb)
  }
  //   const newEmployee = {
  //     name: "jon Doe",
  //     role: "Doctor",
  //     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbpv7KEev0tRwk3RSNXme6C_rbEdk8lwSXSA&usqp=CAU",
  //     socialmedia: [],
  //   };
  useEffect(() => {
    const addNewEmployee = async () => {
      dispatch(
        await setInfoCompanyAction({
          property: ['employees'],
          data: { employees: [...employees, newEmployee] }
        })
      )
      setIsOpen(false)
    }
    if (newEmployee) {
      addNewEmployee()
    }
  }, [newEmployee, setIsOpen])
  return { isOpen, handleOpen, handleClose, newEmployeeFn, socialMedia }
}

export default useAddEmployee
