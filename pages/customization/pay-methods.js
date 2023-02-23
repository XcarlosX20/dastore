import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import FormPayMethod from "../../Components/Customization/FormPayMethod";
import Side from "../../Components/Layout/Side";
import Loading from "../../Components/Utils/Loading";
const payMethods = () => {
  const loading = useSelector((state) => state.company.loading);
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
      <FormPayMethod />
    </Side>
  );
};

export default payMethods;
