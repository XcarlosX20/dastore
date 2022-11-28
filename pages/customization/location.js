import Side from '../../Components/Layout/Side'
import { Box } from '@mui/material'
import dynamic from 'next/dynamic'

const DynamicMap = dynamic(() => import('../../Hooks/Map'), {
  ssr: false
})
const position = [11.3946, 69.681]
const Location = () => {
  return (
    <Side>
      <Box sx={{ width: '100%', height: '65vh' }}>
        <DynamicMap />
      </Box>
    </Side>
  )
}

export default Location
