// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { axiosClient } from '../../config/axios'

export default async function load (req, res) {
  const { cookies } = req
  console.log(cookies)
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55Ijp7ImlkIjoiNjIxMmFmMTBjMDdlNDkzYmJjNTQ2Y2NhIn0sImlhdCI6MTY1ODg4ODA0OCwiZXhwIjoxNjU4OTc0NDQ4fQ.vPCjvgAe_s9MoFRgAN374_REGsRDEUqVRE7gTAp5QOg'
  const getCompany = await axiosClient.get('/api/auth/company', {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token
    }
  })
  if (getCompany.status == 200) {
    res.status(200).json(getCompany.data)
  }
}
