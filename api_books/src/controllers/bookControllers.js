import fs from "fs";
const BOOKS = JSON.parse(fs.readFileSync(new URL("../resources/libros.json", import.meta.url)));
const AUTHORS = JSON.parse(fs.readFileSync(new URL("../resources/autores.json", import.meta.url)));

export const getBooks = (req, res) => {
  const BooksWithAuthors = BOOKS.map((book) => {
    const Author = AUTHORS.find((author) => author.id === book.autor_id);
    return { ...book, Author };
  });
  res.status(200).json(BooksWithAuthors);
};

export const getAuthors = (req, res) => {
  res.status(200).json(AUTHORS);
};
