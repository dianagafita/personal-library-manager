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
        "&:hover": {
          backgroundColor: "white",
          color: "var(--main-color)",
        },
      }}
      variant="contained"
      {...props}
    >
      {children}
    </Button>
  );
}
