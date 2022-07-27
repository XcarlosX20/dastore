import "../styles/globals.css";
import "../index.css";
import "../bootstrap.min.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Products from "../pages/Products.js";
// import NewProduct from "../pages/NewProduct.js";
// import EditProduct from "../pages/EditProduct.js";
// import Summary from "../pages/Summary";
// import Customization from "../pages/Customization";
// //redux
import { Provider } from "react-redux";
import store from "../store.js";
// import Orders from "../pages/Orders";
// import Login from "../pages/Login";
// import PrivateRoute from "../RoutePrivateConfig/RoutePrivate";
import { tokenAuth } from "../config/axios";
import { useEffect } from "react";
// import Categories from "../pages/custom/Categories";
// import Mycompany from "../pages/custom/Mycompany";
// import WorkSchedules from "./Components/Pages/custom/WorkSchedules";
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      tokenAuth(localStorage.getItem("token"));
    }
  }, []);
  const theme = createTheme({
    palette: {
      primary: {
        main: "#98C1D9",
      },
      secondary: {
        main: "#3D5A80",
      },
      warning: {
        main: "#FFDDD2",
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
