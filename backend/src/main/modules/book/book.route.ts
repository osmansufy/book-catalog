import express from "express";
import { bookController } from "./book.controler";

const router = express.Router();

router.get("/", bookController.findAllBooks);

router.get("/:id", bookController.findBookById);

router.post("/", bookController.createBook);

router.patch("/:id", bookController.updateBook);

router.delete("/:id", bookController.deleteBook);

export const bookRouter = router;
