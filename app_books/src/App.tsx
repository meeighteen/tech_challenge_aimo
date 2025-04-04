import React from "react";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBooks } from "./store/store";
import "./App.css";

const Card = React.lazy(() =>
  import("./components/Card/Card").then((module) => ({ default: module.Card }))
);

type Book = {
  id: number;
  titulo: string;
  descripcion: string;
  autor_id: number;
  Author: Author;
};

export type Author = {
  id: number;
  nombres: string;
};

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const books = useSelector((state: { books: Book[] }) => state.books);

  const dispatch = useDispatch();

  const [search, setSearch] = useState<string>("");
  const [loadingBooks, setLoadingBooks] = useState<boolean>(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const FetchBooks = async () => {
    try {
      const response = await fetch(API_URL + "/books");
      const result = await response.json();
      dispatch(setBooks(result));
    } catch (error) {
      throw new Error(error as string);
    } finally {
      setLoadingBooks(false);
    }
  };

  useEffect(() => {
    FetchBooks();
    return () => {
      setLoadingBooks(true);
    };
  }, [dispatch]);

  const filteredBooks = useMemo(() => {
    return books.filter(
      (book: Book) =>
        book.titulo.toLowerCase().includes(search.toLowerCase()) ||
        book.Author.nombres.toLowerCase().includes(search.toLowerCase()) ||
        book.descripcion.toLowerCase().includes(search.toLowerCase())
    );
  }, [books, search]);
  return (
    <>
      <div className="homeTitle">
        <h1 className="title">Best sellers all times</h1>
        <input
          className="inputSearch"
          placeholder="write something to search..."
          value={search}
          onChange={handleChange}
          type="text"
        />
      </div>
      <div className="containerCards">
        {!loadingBooks ? (
          filteredBooks.map(
            ({ id, titulo, descripcion, autor_id, Author }: Book) => (
              <Suspense key={id} fallback={<div>Cargando...</div>}>
                <Card
                  id={id}
                  title={titulo}
                  description={descripcion}
                  author_id={autor_id}
                  author={Author}
                />
              </Suspense>
            )
          )
        ) : (
          <div>Cargando...</div>
        )}
      </div>
    </>
  );
}

export default App;
