import { Box, Stack, Typography } from "@mui/material";
import Side from "./Layout/Side";
import { styled } from "@mui/system";

const Customization = () => {
  const MyComponent = styled("div")({});
  return (
    <>
      <Side>
        <Stack direction={"row"} spacing={2}>
          <Box>
            <MyComponent>
              <Typography>&#128072;</Typography>
            </MyComponent>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", height: "200px" }}>
            <Typography variant="h5" component="h5">
              Customize your company here
            </Typography>
          </Box>
        </Stack>
      </Side>
    </>
  );
};
export default Customization;
