import { useState } from "react";
import { CancelOutlined } from "@mui/icons-material";
import { Button, Card, CardContent, Grid, IconButton, TextField, Typography } from "@mui/material";
import { formatKeys } from "../../Actions/helpers";
import { useForm } from "react-hook-form";
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
   const [form, setForm] = useState([])
   const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
    const onSubmit = (e) => {
      e.preventDefault()
  }
    const handleInput = ({e, optionName}) => {
      e.preventDefault();
      //.map(product => product._id === action.payload._id ? product = action.payload : product)
      const newTyping = {name: optionName, [e.target.id]: e.target.value}
      setForm(form.map(i => i.name == newTyping.name ? i = {...i, ...newTyping} : i))
    }
    const isDisabled = (selected) => {
    return optionsSelected.some(i => (
    i.id === selected
    ))

    }
    const addOptionsMethods = (opt) => {
      setOptionsSelected([...optionsSelected, opt])
      const newFormToWrite = {};
      Object.keys(opt).forEach(i => {
        if(i === 'name'|| i === 'id' || i === 'imgUrl'){
          return newFormToWrite[i] = opt[i]
        }
        else{
          newFormToWrite[i] = ''
        }
      })
      setForm([...form, newFormToWrite] )
    }
    const deleteOptionSelected = (opt) => {
      setOptionsSelected(optionsSelected.filter(i => (
      i.id !== opt.id
    )))
     setForm(form.filter(i => (i.id !== opt.id)))
  }
    return ( 
    <>
    <Typography>Select the option and fill the form</Typography>
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
    <form onSubmit={onSubmit}>
          <Grid container my={2} direction={'row'} columns={{sm:12, md: 12 }}>
        {optionsSelected.length !== 0 && (
            optionsSelected.map(option => (
              <Grid p={1} item sm={12} md={6}>
                <Card  key={option.id}>
                <CardContent>
                  <Grid mb={1} container direction={{sm: 'column'}} >
                    <Grid container justifyContent={'flex-end'}>
                      <IconButton color="error" onClick={() => deleteOptionSelected(option)}>
                        <CancelOutlined/>
                      </IconButton>                    
                    </Grid>
                    <Grid container justifyContent={'flex-start'}>
                      <Typography mb={2}>{option.name}:</Typography>
                    </Grid>
                  </Grid>
                  <Grid container direction={'column'} gap={1} >
                  {Object.keys(option).map(i =>  
                    i !== "name" &&
                    i !== "id" &&
                    i !== "imgUrl" && (
                      <TextField color={errors[i] ? 'error':'primary'} label={formatKeys(i)} id={i} onChange={(e) => handleInput({e, optionName: option.name})} required />      
                    ))}
                    </Grid>
                  </CardContent>
                  </Card>
              </Grid>
            ))
        )}
    </Grid>
    <Button type="submit">Save</Button>
    </form>
    
    </> );
}
 
export default FormPayMethod;