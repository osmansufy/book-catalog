import { EBOOK_GENRE } from "../../../interfaces/enums";

export interface IBook {
  title: string;
  author: IAuthor;
  genre: EBOOK_GENRE;
  publicationDate: Date;
  reviews: Review[];
}

export interface Review {
  reviewer: string;
  rating: number;
  comment: string;
}

export interface IAuthor {
  name: string;
  email: string;
}
