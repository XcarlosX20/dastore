import * as React from 'react'
import {
  Box,
  SwipeableDrawer,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton
} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import GridViewIcon from '@mui/icons-material/GridView'
import LogoutIcon from '@mui/icons-material/Logout'
import Menu from '@mui/icons-material/Menu'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import { logoutAction } from '../../Actions/ActionsAuth'
import { useDispatch } from 'react-redux'
import Link from 'next/link'

export default function Drawer () {
  const dispatch = useDispatch()
  const [state, setState] = React.useState(false)
  const toggleDrawer = (boolean) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState(boolean)
  }

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <Link href='/orders'>
          <ListItem button>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary='Orders' />
          </ListItem>
        </Link>
        <Link href='/products'>
          <ListItem button>
            <ListItemIcon>
              <GridViewIcon />
            </ListItemIcon>
            <ListItemText primary='Products' />
          </ListItem>
        </Link>
        <Link href='/customization/sales-summary'>
          <ListItem button>
            <ListItemIcon>
              <MonetizationOnIcon />
            </ListItemIcon>
            <ListItemText primary='Summary of sales' />
          </ListItem>
        </Link>
        <Link exact href='/customization'>
          <ListItem button>
            <ListItemIcon>
              <DriveFileRenameOutlineIcon />
            </ListItemIcon>
            <ListItemText primary='Customatization' />
          </ListItem>
        </Link>
        <Link href='/login'>
          <ListItemButton
            onClick={() => {
              dispatch(logoutAction())
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText>
              Log out
            </ListItemText>
          </ListItemButton>
        </Link>
      </List>
    </Box>
  )
  const anchor = 'left'
  return (
    <div>
      <Button color='light' onClick={toggleDrawer(true)}>
        <Menu />
      </Button>
      <SwipeableDrawer
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }}
        anchor={anchor}
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    </div>
  )
}
