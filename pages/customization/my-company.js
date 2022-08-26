import { useState, useRef, useEffect } from "react";
import Side from "../Layout/Side";
import { Twitter } from "@mui/icons-material";
import { Instagram } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { IconButton, Grid, Button } from "@mui/material";
import Head from "next/head";
const Mycompany = () => {
  const [employee, setEmployee] = useState([
    {
      name: "Jonh Doe",
      role: "Delivery",
      img: "https://i0.wp.com/www.diegocoquillat.com/wp-content/uploads/2019/05/14-cosas-que-nunca-te-han-dicho-sobre-el-delivery.jpg?fit=700%2C336&ssl=1&resize=1280%2C720",
    },
    {
      name: "Julia Doe",
      role: "Vendor",
      img: "https://scontent-mia3-2.xx.fbcdn.net/v/t1.18169-9/1487431_778207162261881_3365932417199548497_n.jpg?stp=cp0_dst-jpg_e15_fr_q65&_nc_cat=109&ccb=1-7&_nc_sid=85a577&efg=eyJpIjoidCJ9&_nc_ohc=4d8yly6FxXEAX--wMin&_nc_ht=scontent-mia3-2.xx&oh=00_AT-ccDSO-54YHt5rAaN0qjXSHRf5VIzXc7V04Jvy97XuvQ&oe=62C25643",
    },
    {
      name: "Pedro Perez",
      role: "CEO",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbpv7KEev0tRwk3RSNXme6C_rbEdk8lwSXSA&usqp=CAU",
    },
    {
      name: "Paula Lee",
      role: "Founder",
      img: "https://www.europeanceo.com/wp-content/uploads/2017/08/CEO-magic-touch.jpg",
    },
  ]);
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState("aaa");
  const [oldValue, setOldValue] = useState("");
  // evaluar si un usuario de twitter existe
  // const getUserTwitter = async () => {
  //   const url = "https://api.twitter.com/2/users/by/username/CuentaMister";
  //   const api = await axios.get(url);
  //   console.log(api);
  // };
  const aboutRef = useRef(null);
  const trixRef = useRef(null);
  const onSubmit = (e) => {
    e.preventDefault();
    const newDescription = aboutRef.current.value;
  };
  const editCompany = () => {
    if (aboutRef.current.value) {
      setValue(aboutRef.current.value);
      setOldValue(aboutRef.current.value);
    }
    setIsEdit(false);
  };
  const initEdit = () => {
    console.log(aboutRef.current.value);
    setOldValue(aboutRef.current.value);
    setIsEdit(true);
  };
  const cancelEdit = () => {
    setIsEdit(false);
    setValue(oldValue);
  };
  // useEffect(() => {
  //   if (aboutRef.current.value) {
  //     setValue(aboutRef.current.value);
  //   }
  // }, [isEdit]);
  useEffect(() => {
    trixRef.current.innerHTML = oldValue;
  }, [value, isEdit]);
  return (
    <>
      <Head>
        <title>My company</title>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/trix/1.3.1/trix.css"
        ></link>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/trix/1.3.1/trix.js"
          type="text/javascript"
        ></script>
      </Head>
      <Side>
        <h3>Acerca de la empresa</h3>
        <form onSubmit={onSubmit} className="trix-editor">
          <input
            defaultValue={value}
            value={value}
            ref={aboutRef}
            id="x"
            type="hidden"
            name="about"
          ></input>
          <trix-editor ref={trixRef} onClick={initEdit} input="x"></trix-editor>
          <Button hidden={!isEdit} type="submit" onClick={editCompany}>
            edit
          </Button>
          <Button hidden={!isEdit} onClick={cancelEdit}>
            cancel
          </Button>
        </form>
        <div>
          <p>mision:</p>
          <p>vision:</p>
          <p>valores:</p>
          <p>Empleados:</p>
          <Grid container direction={"row"} gap={2}>
            {employee.map((employee) => (
              <Card
                key={employee.name}
                raised={true}
                sx={{
                  display: "flex",
                  border: "1px solid #e0e0e0",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="div" variant="h5">
                      {employee.name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      {employee.role}
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                  >
                    <IconButton>
                      <Twitter />
                    </IconButton>
                    <IconButton>
                      <Instagram />
                    </IconButton>
                  </Box>
                </Box>
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={employee.img}
                  alt="Live from space album cover"
                />
              </Card>
            ))}
          </Grid>
        </div>
      </Side>
    </>
  );
};

export default Mycompany;
