import { Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "../Actions/ActionsProducts";
import Header from "./Layout/Header";
import Product from "../Components/Products/Product";
import Search from "../Components/Searchbar/Search";
import { axiosClient } from "../config/axios";
const Products = ({ getCompany, getProducts }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const loadProducts = (getProducts) => {
      dispatch(getProductsAction(getProducts));
    };
    loadProducts(getProducts);
  }, [dispatch]);
  //state products list
  const { products, error, searchResults } = useSelector(
    (state) => state.products
  );
  return (
    <>
      <Header title={getCompany.companyName} />
      <Container sx={{ paddingY: "1.5rem" }} maxWidth={"md"}>
        <h3 className="text-center">Listado de productos</h3>
        <Search products={products} />
        {error ? (
          <div className="alert alert-danger mb-2" role="alert">
            There was an error loading products
          </div>
        ) : null}
        <div className="table-responsive">
          {searchResults ? (
            <table className="table table-striped">
              <thead className="bg-primary table-dark">
                <tr>
                  <th scope="col">Image:</th>
                  <th scope="col">Name:</th>
                  <th scope="col">Price:</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((singleProduct) => (
                  <Product
                    key={singleProduct._id}
                    singleProduct={singleProduct}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <table className="table table-striped">
              <thead className="bg-primary table-dark">
                <tr>
                  <th scope="col">Image:</th>
                  <th scope="col">Name:</th>
                  <th scope="col">Price:</th>
                </tr>
              </thead>
              <tbody>
                {getProducts.length || products.length ? (
                  getProducts.map((singleProduct) => (
                    <Product
                      key={singleProduct._id}
                      singleProduct={singleProduct}
                    />
                  ))
                ) : (
                  <Typography>You still have no products added</Typography>
                )}
              </tbody>
            </table>
          )}
          {(searchResults !== null) & (searchResults < 1) ? (
            <div className="alert ">
              <p className="text-danger text-center">No results</p>
            </div>
          ) : null}
        </div>
      </Container>
    </>
  );
};
export const getServerSideProps = async ({ req, res }) => {
  const token = req.headers.cookie.split("=")[1];
  axiosClient.defaults.headers.common["x-auth-token"] = token;
  const getCompany = await axiosClient.get(`/api/auth/company`);
  const getProducts = await axiosClient.get("/api/products");
  return {
    props: {
      getCompany: getCompany.data,
      getProducts: getProducts.data,
    },
  };
};
export default Products;
