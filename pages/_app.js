import "../styles/globals.css";
import "../index.css";
import "../bootstrap.min.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// //redux
import { Provider } from "react-redux";
import store from "../store.js";
import { tokenAuth } from "../config/axios";
import { useEffect } from "react";
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      tokenAuth(localStorage.getItem("token"));
    }
  }, []);
  const theme = createTheme({
    palette: {
      primary: {
        main: "#119bbe",
      },
      secondary: {
        main: "#3D5A80",
      },
      warning: {
        main: "#f0b9a6",
      },
      light: {
        main: "#E0FBFC",
      },
      dark: {
        main: "#293241",
      },
    },
  });
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
