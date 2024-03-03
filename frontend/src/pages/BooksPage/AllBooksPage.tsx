import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActions, CardHeader } from "@mui/material";
import "./AllBooksPage.css";
import { Link } from "react-router-dom";
import BookButton from "../../components/BookButton";
import useSWR from "swr";
import { getBooks } from "../../services/bookServices";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { styled } from "@mui/material/styles";

interface Data {
  id: string;
  title: string;
  author: string;
  description: string;
  genre: string;
  img: File;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function AllBooksPage() {
  const { data, error } = useSWR("http://localhost:5001/books", getBooks);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (error) return <div>Error fetching data</div>;
  if (!data) return <div>Loading...</div>;

  console.log(data);
  return (
    <section className="books-page-container">
      {data.map((book: Data) => (
        <div className="book-container">
          <Card sx={{ maxWidth: 320, margin: "2rem" }}>
            <CardHeader title={book.title} subheader={book.author} />
            <CardMedia
              component="img"
              height="300"
              image={
                book.img ? `data:image/jpeg;base64,${book.img}` : undefined
              }
              alt={book.title}
              style={{ objectFit: "contain" }}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {book.genre}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <Link to={`/allBooks/${book.id}`}>
                <BookButton>Edit book </BookButton>
              </Link>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Description:</Typography>
                <Typography paragraph>{book.description}</Typography>
              </CardContent>
            </Collapse>
          </Card>
        </div>
      ))}
    </section>
  );
}
