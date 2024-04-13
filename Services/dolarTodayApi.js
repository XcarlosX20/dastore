import axios from 'axios'
export const dolarTodayApi = async () => {
  const response = await axios.get(process.env.NEXT_PUBLIC_MYAPP_USD_TO_BS)
  return response.data.price
}