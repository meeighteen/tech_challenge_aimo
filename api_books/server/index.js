import express from "express";
import cors from "cors";
import { getAuthors, getBooks } from "../controllers/bookControllers";

const app = express();

app.use(cors());

app.set("port", process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/books", getBooks);

app.use("/authors", getAuthors);

app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
