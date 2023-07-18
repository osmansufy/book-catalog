import express from "express";
import { bookController } from "./book.controler";
import { bookValidation } from "./book.validation";

const router = express.Router();

router.get("/", bookController.findAllBooks);

router.post("/", bookValidation.verifyUser, bookController.createBook);

// search for books by title or author name or genre
router.get("/search", bookController.searchBooks);

// filter books by genre or publication date
router.get("/filter", bookController.findBooksByFilter);

router.get("/:id", bookController.findBookById);

router.patch("/:id", bookValidation.verifyUser, bookController.updateBook);

router.delete("/:id", bookValidation.verifyUser, bookController.deleteBook);

export const bookRouter = router;
