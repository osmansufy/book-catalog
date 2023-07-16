import { EBOOK_GENRE } from "./enum";

export interface IBook {
  title: string;
  author: IAuthor;
  genre: EBOOK_GENRE;
  publicationDate: Date;
}

export interface IAuthor {
  name: string;
  email: string;
}
