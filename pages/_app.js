import '../index.css'
import '../bootstrap.min.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
// //redux
import { Provider } from 'react-redux'
import store from '../store.js'
import { tokenAuth } from '../config/axios'
import { useEffect } from 'react'
import palette from '../Components/Layout/palette'
function MyApp ({ Component, pageProps }) {
  useEffect(() => {
    if (localStorage.getItem('token')) {
      tokenAuth(localStorage.getItem('token'))
    }
  }, [])
  const theme = createTheme({ palette })
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
