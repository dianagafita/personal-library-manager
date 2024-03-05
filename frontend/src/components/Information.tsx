import { Typography } from "@mui/material";

interface InfoProps {
  text: string;
}

export default function Information({ text }: InfoProps) {
  return (
    <Typography
      style={{
        textAlign: "center",
        marginTop: "50%",
        fontSize: 18,
        color: "var(--main-color)",
      }}
    >
      {text}
    </Typography>
  );
}
