import { Typography } from "@mui/material";

interface InfoProps {
  text: string;
}

export default function Information({ text }: InfoProps) {
  return (
    <Typography
      style={{
        textAlign: "center",
        marginTop: "10rem",
        fontSize: 18,
        color: "var(--main-color)",
      }}
    >
      {text}
    </Typography>
  );
}
