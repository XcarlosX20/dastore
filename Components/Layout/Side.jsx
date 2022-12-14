import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import useMediaQuery from '@mui/material/useMediaQuery'
import Header from './Header'
import { AppBar } from '@mui/material'
import Link from 'next/link'
import toPathName from '../../Hooks/toFormatPath'
import { useRouter } from 'next/router'
const Side = (props) => {
  const { pathname } = useRouter()
  const options = ['categories', 'work schedules', 'my company', 'sales summary', 'location']
  const mobile = useMediaQuery('(max-width:768px)')
  const drawerWidth = mobile ? '30vw' : 240
  return (
    <>
      <AppBar position='fixed'>
        <Header />
      </AppBar>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Drawer
          variant='permanent'
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            zIndex: 5,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box'
            }
          }}
        >
          <Toolbar sx={{ height: '150px' }} />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              {options.map((text) => (
                <Link
                  key={text}
                  href={'/customization/' + toPathName(text)}
                  activeStyle={{
                    backgroundColor: '#f1f1f1'
                  }}
                >
                  <ListItem
                    selected={pathname.slice(toPathName(text).length * -1) === toPathName(text)}
                    button
                    key={text}
                    sx={{ backgroundColor: 'inherit' }}
                  >
                    <ListItemText sx={{ textTransform: 'capitalize' }} primary={text} />
                  </ListItem>
                </Link>
              ))}
            </List>
          </Box>
        </Drawer>
        <Box component='main' sx={{ flexGrow: 1, p: 3, width: '70vw' }}>
          <Toolbar sx={{ height: '150px' }} />
          {props.children}
        </Box>
      </Box>
    </>
  )
}
export default Side
