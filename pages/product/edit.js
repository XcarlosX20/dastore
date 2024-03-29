import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProductAction } from "../../Actions/ActionsProducts";
import { showAlertAction } from "../../Actions/ActionsAlert";
import Header from "../../Components/Layout/Header";
import Loading from "../../Components/Utils/Loading";
import Swal from "sweetalert2";
import Compressor from "compressorjs";
import { Button, Input, Grid, TextField, Box } from "@mui/material";
import { PhotoCamera, CancelOutlined } from "@mui/icons-material";
import NumberFormatCustom from "../../Hooks/NumberFormatCustom";
import { useForm } from "react-hook-form";
import { formatAmountToNumber } from "../../helpers";
import { useRouter } from "next/router";
import { getInfoCompanyAction } from "../../Actions/ActionsCompany";
import useSetCategories from "../../Hooks/useSetCategories";
import Image from "next/image";
const EditProduct = () => {
  const history = useRouter();
  const dispatch = useDispatch();
  const editProductFn = (product) => dispatch(editProductAction(product));
  const { addCategory } = useSetCategories();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  // useState
  const [productname, setProductname] = useState(" ");
  const [numberFormat, setNumberFormat] = useState(" ");
  const [image, setImage] = useState({ img_html: "", image_to_Upload: null });
  const [categoriesSelect, setCategoriesSelect] = useState("");
  const categories = useSelector((state) =>
    state.company ? state.company.categories : []
  );
  const editProduct = useSelector((state) => state.products.productEdit);
  const alert = useSelector((state) => state.alert.alert);
  const { loading, error } = useSelector((state) => state.products);
  const { img_html, image_to_Upload } = image;
  useEffect(() => {
    if (editProduct === null) {
      history.push("/products");
      return null;
    }
    const getEditProduct = () => {
      setProductname(editProduct.productname);
      setNumberFormat(editProduct.price);
      setImage({ ...image, img_html: editProduct.img });
      setCategoriesSelect(editProduct.category);
    };
    getEditProduct();
    const load = async () => {
      dispatch(getInfoCompanyAction());
    };
    load();
  }, [editProduct, history]);
  useEffect(() => {
    if (editProduct) {
      setImage({ ...image, img_html: editProduct.img });
    }
  }, [img_html === "" && editProduct]);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    if (productname === "" || !numberFormat || img_html === "") {
      const msg = {
        txt: "all fields are required",
        class: "alert text-danger text-center text-uppercase p-3",
      };
      dispatch(showAlertAction(msg));
    } else {
      e.preventDefault();
      const { _id, company } = editProduct;
      const price =
        data.price.charAt(0) === "$"
          ? Number(numberFormat)
          : formatAmountToNumber(data.price);
      const product = {
        productname,
        price,
        _id,
        image,
        company,
        category: categoriesSelect,
      };
      await editProductFn(product);
      history.push("/products");
    }
  };
  const handleImage = (e) => {
    if (e.target.files[0]) {
      new Compressor(e.target.files[0], {
        quality: 0.6,
        success(result) {
          setImage({
            ...image,
            img_html: URL.createObjectURL(e.target.files[0]),
            image_to_Upload: result,
          });
        },
        error(err) {
          console.log(err.message);
        },
      });
    } else {
      setImage({ img_html: "", image_to_Upload: null });
    }
  };
  const disabledEdit = () => {
    if (editProduct) {
      const condition =
        numberFormat == editProduct.price &&
        productname === editProduct.productname &&
        categoriesSelect === editProduct.category &&
        !image_to_Upload;
      return condition || loading ? true : loading;
    }
  };
  if (editProduct === null) {
    return <Loading />;
  }
  return (
    <>
      <Header />
      <div className="container">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">Edit product</h2>
            {alert ? (
              <div className={alert.class} role="alert">
                {alert.txt}
              </div>
            ) : null}
            {loading && (
              <Box
                sx={{
                  zIndex: 10,
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  width: "100%",
                  transform: "translate(-50%, -50%)",
                  bgcolor: "transparent",
                }}
              >
                <Loading />
              </Box>
            )}
            {error ? (
              <div className="alert alert-danger mt-3" role="alert" />
            ) : null}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container gap={2} direction="row" className="form-group">
                <TextField
                  id="filled-basic"
                  label="Name"
                  variant="filled"
                  {...register("productname", { required: true })}
                  value={productname}
                  onChange={(e) => setProductname(e.target.value)}
                  helperText="required"
                  error={errors.productname}
                />
                <TextField
                  id="filled-basic"
                  label="Price"
                  variant="filled"
                  {...register("price", { required: true })}
                  value={numberFormat}
                  onChange={(e) => setNumberFormat(e.target.value)}
                  helperText="required"
                  error={errors.price}
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                />
              </Grid>
              <div className="form-group my-3">
                <legend>Imagen:</legend>
                <Grid paddingBottom={2}>
                  {!image_to_Upload ? (
                    <label htmlFor="contained-button-file">
                      <Input
                        sx={{ display: "none" }}
                        onChange={handleImage}
                        accept="image/*"
                        id="contained-button-file"
                        multiple
                        type="file"
                      />
                      <Button
                        endIcon={<PhotoCamera />}
                        variant="contained"
                        component="span"
                      >
                        change image
                      </Button>
                    </label>
                  ) : (
                    <Button
                      onClick={() =>
                        setImage({ img_html: "", image_to_Upload: null })
                      }
                      endIcon={<CancelOutlined />}
                      variant="contained"
                      component="span"
                      color="error"
                    >
                      cancel
                    </Button>
                  )}
                </Grid>
                <div className="image-drop">
                  {img_html ? (
                    <Image
                      className="img-drop"
                      src={img_html}
                      loader={() => img_html}
                      width={"100%"}
                      height={"100%"}
                      alt={productname}
                    />
                  ) : null}
                </div>
              </div>
              <div className="form-group my-3">
                <label>Categoria:</label>
                <select
                  onChange={(e) => {
                    if (e.target.value === "new") {
                      setCategoriesSelect("");
                      Swal.fire({
                        icon: "info",
                        showCancelButton: true,
                        input: "text",
                        text: "Ingrese el nombre de la nueva categoria",
                        confirmButtonText: "listo",
                        cancelButtonText: "Cancelar",
                      }).then((result) => {
                        if (result.isConfirmed && result.value !== "") {
                          const value = result.value.toLowerCase().trim();
                          addCategory({
                            category: value.trim(),
                          }).then(() => {
                            Swal.fire({
                              position: "top-end",
                              icon: "success",
                              title: "Categoria creada",
                              text: "Fue agregada a tu lista!",
                              showConfirmButton: false,
                              timer: 2000,
                            });
                          });
                        }
                        e.target.value = editProduct.category;
                      });
                    } else {
                      setCategoriesSelect(e.target.value);
                    }
                  }}
                  className="form-control"
                >
                  <option value="" disabled selected>
                    Seleccione
                  </option>
                  <option value="new">-- Crear nueva categoria-- </option>
                  {categories.length &&
                    categories.map((category, index) =>
                      category !== editProduct.category
                        ? (
                          <option key={category} value={category}>
                            {category.toUpperCase()}
                          </option>
                          )
                        : (
                          <option
                            key={index}
                            selected
                            value={editProduct.category.toUpperCase()}
                          >
                            {editProduct.category.toUpperCase()}
                          </option>
                          )
                    )}
                </select>
              </div>
              <Grid container justifyContent="center">
                <Button
                  disabled={disabledEdit()}
                  type="submit"
                  variant="contained"
                  color="info"
                  sx={{ padding: "10px 40px" }}
                >
                  Edit
                </Button>
              </Grid>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
