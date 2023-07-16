import mongoose, { Schema } from "mongoose";
import { IBook } from "./book.interface";
import { EBOOK_GENRE } from "../../../interfaces/enums";

const BookSchema = new mongoose.Schema<IBook>(
  {
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
    genre: {
      type: String,
      enum: Object.values(EBOOK_GENRE),
      required: true,
    },
    publicationDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const BookModel = mongoose.model<IBook>("Book", BookSchema);

export default BookModel;
