import httpStatus from "http-status";
import catchAsync from "../../../utility/catchAsync";
import sendResponse from "../../../utility/sendResponse";
import { bookService } from "./book.service";
import pick from "../../../utility/pick";
import { Request, Response } from "express";
import { IBookFilter } from "../../../interfaces/common";

const createBook = catchAsync(async (req: Request, res: Response) => {
  const book = await bookService.createBook(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Book created successfully",
    data: book,
  });
});

const findAllBooks = catchAsync(async (req: Request, res: Response) => {
  const books = await bookService.findAllBooks();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Books retrieved successfully",
    data: books,
  });
});

const findBookById = catchAsync(async (req: Request, res: Response) => {
  const book = await bookService.findBookById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book retrieved successfully",
    data: book,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const bookInfo = req.body.book;
  const bookId = req.params.id;
  const userInfo = req.body.user;
  const book = await bookService.updateBook(bookId, bookInfo, userInfo);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book updated successfully",
    data: book,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const bookId = req.params.id;
  const userInfo = req.body.user;
  await bookService.deleteBook(bookId, userInfo);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book deleted successfully",
    data: null,
  });
});

const findBooksByFilter = catchAsync(async (req: Request, res: Response) => {
  const filterParams = pick(req.query, ["genre", "year"]);
  const books = await bookService.filterBooks(filterParams);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Books retrieved successfully",
    data: books,
  });
});

const searchBooks = catchAsync(async (req: Request, res: Response) => {
  const books = await bookService.searchBooks(req.query.q as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Books retrieved successfully for search query: ${req.query.q}`,
    data: books,
  });
});

export const bookController = {
  createBook,
  findAllBooks,
  findBookById,
  updateBook,
  deleteBook,
  findBooksByFilter,
  searchBooks,
};
