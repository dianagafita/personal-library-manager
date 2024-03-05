import express from "express";
import cors from "cors";
import multer from "multer";

const app = express();
app.use(cors());
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// This will store our books in memory,
// "id" is the unique identifier,
// other fields are up to you
let books = [];

app.post("/books", upload.single("img"), (req, res) => {
  const { title, author, genre, description } = req.body;
  const img = req.file;
  const imgData = img ? img.buffer.toString("base64") : null;
  const book = {
    id: Date.now(),
    title,
    author,
    genre,
    description,
    img: imgData,
  };

  books.push(book);
  res.status(201).json(book);
});

// Get all books
app.get("/books", async (req, res) => {
  console.log(books);
  res.json(books);
});

app.get("/books/:id", async (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((book) => book.id === bookId);
  res.json(book);
});

// // Update a book

app.put("/books/:id", upload.single("img"), (req, res) => {
  const index = books.findIndex((book) => book.id === parseInt(req.params.id));
  const img = req.file;
  const imgData = img ? img.buffer.toString("base64") : null;
  req.body.img = imgData;
  if (index >= 0) {
    books[index] = { ...books[index], ...req.body };
    res.json(books[index]);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// // Delete a book
app.delete("/books/:id", (req, res) => {
  books = books.filter((book) => book.id !== parseInt(req.params.id));
  res.status(204).send();
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
