import express from "express";
import { bookController } from "./book.controler";
import { bookValidation } from "./book.validation";

const router = express.Router();

router.get("/", bookController.findAllBooks);

router.get("/:id", bookController.findBookById);

router.post("/", bookValidation.verifyUser, bookController.createBook);

router.patch("/:id", bookValidation.verifyUser, bookController.updateBook);

router.delete("/:id", bookValidation.verifyUser, bookController.deleteBook);

export const bookRouter = router;
