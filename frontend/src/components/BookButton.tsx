import { Button, ButtonProps } from "@mui/material";
import React from "react";

interface BookButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export default function BookButton({ children, ...props }: BookButtonProps) {
  return (
    <Button
      sx={{
        backgroundColor: "var(--main-color)",
        margin: "1rem",
        fontSize: "0.8rem",
        width: "105px",
        "&:hover": {
          backgroundColor: "white",
          color: "var(--main-color)",
        },
        "&:active": {
          transform: "scale(0.9)",
        },
      }}
      variant="contained"
      {...props}
    >
      {children}
    </Button>
  );
}
