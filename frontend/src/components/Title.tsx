import { Typography } from "@mui/material";

interface TitleProp {
  title: string;
}

export default function Title({ title }: TitleProp) {
  return (
    <Typography m={2} textAlign="center" fontSize="1.7rem">
      {title}
    </Typography>
  );
}
