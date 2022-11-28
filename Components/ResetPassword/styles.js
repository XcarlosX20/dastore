import palette from "../Layout/palette";
const { light, primary, dark } = palette;
export const container_form_styles = {
  margin: "0 auto",
  width: "75vw",
  minHeight: "100px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "6px",
  padding: "1rem",
  "@media (min-width: 769px)": {
    width: "50vw",
    backgroundColor: "#FFF",
  },
};

export const body_styles = {
  height: "100vh",
  "@media (min-width: 769px)": {
    background:
      "radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%)",
  },
};
