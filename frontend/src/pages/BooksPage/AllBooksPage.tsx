import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import BookButton from "../../components/BookButton";
import useSWR from "swr";
import { getBooks } from "../../services/bookServices";
import { useState } from "react";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IconButtonProps } from "@mui/material";
import styled from "@emotion/styled";
import "./AllBooksPage.css";
import Information from "../../components/Information";
import Title from "../../components/Title";

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
}));

export default function AllBooksPage() {
  const { data: books, error } = useSWR(
    "http://localhost:5001/books",
    getBooks
  );

  const [expandedBooks, setExpandedBooks] = useState<{
    [key: string]: boolean;
  }>({});

  const handleExpandClick = (bookId: string) => {
    setExpandedBooks((prevState) => ({
      ...prevState,
      [bookId]: !prevState[bookId],
    }));
  };

  if (error)
    return <Information text="Error fetching data.Please try again." />;
  if (!books) return <Information text="Loading..." />;

  return (
    <section className="books-page-container">
      <Title title="Books" />
      {!books && <Information text="There are no books added yet." />}
      {books && (
        <List sx={{ width: "100%" }}>
          {books.map((book: Data) => (
            <div key={book.id}>
              <ListItem alignItems="flex-start" key={book.id}>
                <ListItemAvatar>
                  <Avatar
                    variant="square"
                    alt={book.title}
                    sx={{
                      maxWidth: "1",
                      height: "1",
                      objectFit: "cover",
                    }}
                    src={
                      book.img
                        ? `data:image/jpeg;base64,${book.img}`
                        : undefined
                    }
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={book.title}
                  secondary={
                    <>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {book.author}
                      </Typography>
                      {"— " + book.genre}
                    </>
                  }
                />
                <Link to={`/allBooks/${book.id}`}>
                  <BookButton>Edit book</BookButton>
                </Link>
                <ExpandMore
                  expand={expandedBooks[book.id] || false}
                  onClick={() => handleExpandClick(book.id)}
                  aria-expanded={expandedBooks[book.id] || false}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </ListItem>
              <Collapse
                in={expandedBooks[book.id] || false}
                timeout="auto"
                unmountOnExit
              >
                <Typography paragraph>Description:</Typography>
                <Typography paragraph>{book.description}</Typography>
              </Collapse>
              <Divider variant="inset" component="li" />
            </div>
          ))}
        </List>
      )}
    </section>
  );
}
