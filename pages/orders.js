import React from 'react'
import Header from '../Components/Layout/Header'
import RequestsTable from '../Components/Requests/RequestsTable'
import { Container } from '@mui/material'
const Orders = () => {
  return (
    <>
      <Header />
      <Container sx={{ paddingY: '1.5rem' }} maxWidth='md'>
        <h2>Orders</h2>
        <RequestsTable />
      </Container>
    </>
  )
}

export default Orders
