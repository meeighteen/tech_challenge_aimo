import BOOKS from "../resources/libros.json";
import AUTHORS from "../resources/autores.json";

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
