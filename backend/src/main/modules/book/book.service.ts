import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IAuthor, IBook } from "./book.interface";
import BookModel from "./book.model";
import { IBookFilter } from "../../../interfaces/common";

const createBook = async (book: IBook) => {
  const newBook = BookModel.create(book);

  return newBook;
};

const findAllBooks = async () => {
  // with id
  const books = BookModel.find()

  return books;
};

const findBookById = async (id: string) => {
  const findBook = BookModel.findOne({ _id: id })

  return findBook;
};

const updateBook = async (id: string, book: IBook, user: IAuthor) => {
  // check if the user is the author of the book

  const checkBook = await BookModel.findById(id)

  // if checkBook is null, throw an error

  if (!checkBook) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found");
  } else if (checkBook.author.email !== user.email) {
    // if the user is not the author of the book, throw an error

    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "You are not the author of this book"
    );
  }

  // if the user is the author of the book, update the book

  const updateBook = BookModel.findOneAndUpdate({ _id: id }, book, {
    new: true,
  })

  return updateBook;
};

const deleteBook = async (id: string, user: IAuthor) => {
  // check if the user is the author of the book

  const checkBook = await BookModel.findById(id)

  // if checkBook is null, throw an error

  if (!checkBook) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found");
  } else if (checkBook.author.email !== user.email) {
    // if the user is not the author of the book, throw an error

    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "You are not the author of this book"
    );
  }

  // if the user is the author of the book, delete the book

  const deleteBook = BookModel.findByIdAndDelete(id)

  return deleteBook;
};

// search for books by title or author name or genre

const searchBooks = async (search: string) => {
  const searchBooks = BookModel.find({
    $or: [
      { title: { $regex: search, $options: "i" } },
      { "author.name": { $regex: search, $options: "i" } },
      { genre: { $regex: search, $options: "i" } },
    ],
  })

  return searchBooks;
};

// filter books by genre or publication date

const filterBooks = async (filter: IBookFilter) => {
  const filterBooks = BookModel.find({
    $and: [
      { genre: { $regex: filter.genre, $options: "i" } },
      { publicationDate: { $regex: filter.year, $options: "i" } },
    ],
  })

  return filterBooks;
};

export const bookService = {
  createBook,
  findAllBooks,
  findBookById,
  searchBooks,
  updateBook,
  deleteBook,
  filterBooks,
};
