import mongoose, { Schema } from "mongoose";
import { IBook } from "./book.interface";
import { EBOOK_GENRE } from "../../../interfaces/enums";

const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  author: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  description: {
    type: String,
    required: true,
  },

  genre: {
    type: String,
    enum: EBOOK_GENRE,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  publicationDate: {
    type: Date,
    required: true,
  },
});

const BookModel = mongoose.model<IBook>("Book", BookSchema);

export default BookModel;
