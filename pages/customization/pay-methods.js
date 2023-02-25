import { Delete, Edit } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
  Grid,
} from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import FormPayMethod from "../../Components/Customization/FormPayMethod";
import Side from "../../Components/Layout/Side";
import Loading from "../../Components/Utils/Loading";
import useModal from "../../Hooks/useModal";
const payMethods = () => {
  const { handleOpen, handleClose, ModalComponent, isOpen } = useModal();
  const loading = useSelector((state) => state.company.loading);
  const payMethodsTaken = useSelector((state) => state.company.payMethods);
  return (
    <Side>
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
      <Grid container spacing={2}>
        {payMethodsTaken.length !== 0
          ? payMethodsTaken.map((i) => (
              <Grid item xs={12} sm={6} lg={4}>
                <Card sx={{ width: "100%" }}>
                  <CardContent>
                    <Grid
                      container
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Grid item xs={10}>
                        <Typography>{i.name}</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Grid container flexDirection={"column"}>
                          <IconButton>
                            <Edit />
                          </IconButton>
                          <IconButton>
                            <Delete />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))
          : !loading && (
              <Typography>
                You don&apos;t any method pay added. Let's add any one
              </Typography>
            )}
      </Grid>
      <Button onClick={handleOpen}>Add new method pay</Button>
      <ModalComponent
        styles={{ width: "80vw", overflowY: "auto", maxHeight: "80vh" }}
        open={isOpen}
        onClose={handleClose}
      >
        <FormPayMethod />
      </ModalComponent>
    </Side>
  );
};

export default payMethods;
