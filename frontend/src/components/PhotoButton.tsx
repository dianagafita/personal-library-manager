import { PhotoCamera } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function PhotoButton() {
  return (
    <Button
      component="div"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        color: "var(--main-color)",
        "&:hover": {
          color: "white ",
          background: "transparent !important",
        },
      }}
    >
      <PhotoCamera />
    </Button>
  );
}
