import { Alert, Button, Grid, Box, TextField } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import {
  BodyResetPassword,
  ContainerForm,
} from "../../Components/ResetPassword/Components";
import { axiosClient } from "../../config/axios";
import useResetPassword from "../../Hooks/useResetPassword";
const Token = ({ data }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { changePassword, setAlert, alert } = useResetPassword();
  const onSubmit = (data) => {
    if (data.newPassword.trim() === data.passRepeat.trim()) {
      changePassword({
        token: router.query.token,
        newPassword: data.newPassword,
      });
    } else {
      setAlert({
        msg: "both passwords must be the same value",
        type: "error",
      });
    }
  };
  return (
    <>
      {alert !== null ? <Alert color={alert.type}>{alert.msg}</Alert> : null}
      {data?.checked ? (
        <BodyResetPassword>
          <Box
            sx={{
              padding: "2px 0",
              borderRadius: "0px 0px 1rem 0px",
              backgroundColor: "primary.main",
              width: "10rem",
              fontSize: "1.5rem",
              color: "#FFF",
              cursor: "pointer",
            }}
          >
            <Link href="/login">
              <p>Go to login</p>
            </Link>
          </Box>
          <ContainerForm>
            <legend>ingrese nueva contraseña</legend>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid
                container
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "1rem",
                }}
              >
                <TextField
                  label="enter the password"
                  {...register("newPassword", { required: true })}
                  type="password"
                />
                <TextField
                  label="repeat the password"
                  {...register("passRepeat", { required: true })}
                  type="password"
                />
                <Button type="submit">change password</Button>
              </Grid>
            </form>
          </ContainerForm>
        </BodyResetPassword>
      ) : (
        <>
          <BodyResetPassword>
            <Alert sx={{ marginBottom: "1rem" }} severity={data.type}>
              {data.msg}
            </Alert>
            <ContainerForm>
              <h3>probably the token has expired</h3>
              <Link href="/reset-password">
                <Button>send the token again</Button>
              </Link>
            </ContainerForm>
          </BodyResetPassword>
        </>
      )}
    </>
  );
};
export const getServerSideProps = async (req, res) => {
  const token = req.params.token;
  try {
    const response = await axiosClient.get(`api/auth/reset-password/${token}`);
    return {
      props: {
        data: response.data,
      },
    };
  } catch (error) {
    return {
      props: {
        data: error.response.data,
      },
    };
  }
};
export default Token;
