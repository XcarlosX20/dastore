import { useState } from "react";
import { Delete } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, Grid, TextField, Typography } from "@mui/material";
import { formatKeys } from "../../Actions/helpers";
const FormPayMethod = () => {
    const optionsToChoose = [
    {
      name: "Banco de Venezuela (Pago Movil)",
      telefono: "04125351895",
      cedulaDeIdentidad: "V-29535174",
      nombreDelBanco: 'Banco de Venezuela',
      imgUrl:
        "https://res.cloudinary.com/do5yybhwe/image/upload/v1676501459/shops/bdv_dhwfys.png",
      id: 2,
    },
    {
      name: "Zelle",
      correo: "carlossierra850@gmail.com",
      nombreDelBeneficiario: "Carlos Sierra",
      imgUrl:
        "https://res.cloudinary.com/do5yybhwe/image/upload/v1676501458/shops/Zelle_logo_zsz506.svg",
      id: 3,
    },
    {
      name: "USDT",
      wallet: "ny2178yw21huwhd27178h21h2u12h812hqsq12",
      imgUrl:
        "https://res.cloudinary.com/do5yybhwe/image/upload/v1676501458/shops/tether-usdt-logo_jjhv66.png",
      id: 4,
    },
    {
      name: "PayPal",
      correo: "carlossierra850@gmail.com",
      nameZeller: "Carlos Sierra",
      imgUrl:
        "https://res.cloudinary.com/do5yybhwe/image/upload/v1676501458/shops/paypal_k8zaeb.webp",
      id: 5,
    },
  ];
   const [optionsSelected, setOptionsSelected] = useState([])
    const isDisabled = (selected) => {
    return optionsSelected.some(i => (
    i.id === selected
    ))

    }
    const addOptionsMethods = (opt) => {
      setOptionsSelected([...optionsSelected, opt])
    }
    const deleteOptionSelected = (opt) => {
      setOptionsSelected(optionsSelected.filter(i => (
      i.id !== opt.id
    )))}
    return ( 
    <>
    <Grid container gap={2} direction={'row'}>
    {optionsToChoose.length && (
        optionsToChoose.map(i => (
            <Button sx={{opacity: isDisabled(i.id) && '0.7'}} key={i.id} disabled={isDisabled(i.id)}>
                <Card
                onClick={() => addOptionsMethods(i) } sx={{ minWidth: 180 }}>
                <CardContent>
                  <Typography
                    sx={{ textTransform: 'capitalize' }}
                    variant='h5'
                    component='div'
                  >                    
                    {i.name}
                  </Typography>
                </CardContent>
              </Card>
            </Button>
        ))
    )}
    </Grid>
    <Grid container gap={3} direction={'column'}>
        {optionsSelected.length !== 0 && (
            optionsSelected.map(option => (
              <Card sx={{ minWidth: 180 }} key={option.id}>
                <CardContent>
                  <Grid mb={1} container flexDirection={'row'} justifyContent={'space-between'}>
                    <Typography mb={2}>{option.name}:</Typography>
                    <Button color="error" onClick={() => deleteOptionSelected(option)}>X</Button>
                  </Grid>
                  <Grid container direction={'column'} gap={1} >
                  {Object.keys(option).map(i =>  
                    i !== "name" &&
                    i !== "id" &&
                    i !== "imgUrl" && (
                      <TextField label={formatKeys(i)} />      
                    ))}
                    </Grid>
                  </CardContent>
                  </Card>
            ))
        )}
    </Grid>
    </> );
}
 
export default FormPayMethod;