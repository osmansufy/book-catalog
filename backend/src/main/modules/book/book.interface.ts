import { EBOOK_GENRE } from "../../../interfaces/enums";

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
