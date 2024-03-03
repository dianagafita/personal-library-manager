import { Typography } from "@mui/material";

interface InfoProps {
  text: string;
}

export default function Information({ text }: InfoProps) {
  return <Typography className="information-text">{text}</Typography>;
}
