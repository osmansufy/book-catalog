import { EBOOK_GENRE } from "./enum";

export interface IBook {
  _id?: string;
  title: string;
  author: IAuthor;
  genre: EBOOK_GENRE;
  publicationDate: Date;
}

export interface IAuthor {
  name: string;
  email: string;
}

export interface IBookFilter {
  genre?: string;
  year?: string | number;
}
