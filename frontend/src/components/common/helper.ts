import { EBOOK_GENRE } from "@/shared/enum";
import { IBook } from "@/shared/interface";
import { z } from "zod";

export const NewBookSchema: z.Schema<IBook> = z.object({
  title: z.string().min(3).max(50),
  author: z.object({
    name: z.string().min(3).max(50),
    email: z.string().email(),
  }),
  genre: z.nativeEnum(EBOOK_GENRE),
  publicationDate: z.coerce.date(),
});

export const bookGenres: string[] = Object.values(EBOOK_GENRE);
export type fieldNames = keyof IBook | "author.name" | "author.email";
export interface IFormFields {
  name: fieldNames;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  options?: string[];
  readOnly?: boolean;
}
export const formFields: IFormFields[] = [
  {
    name: "title",
    label: "Title",
    type: "text",
    placeholder: "Enter book title",
    required: true,
  },
  {
    name: "author.name",
    label: "Author Name",
    type: "text",
    placeholder: "Enter author name",
    required: true,
  },
  {
    name: "author.email",
    label: "Author Email",
    type: "email",
    placeholder: "Enter author email",
    required: true,
    readOnly: true,
  },
  {
    name: "genre",
    label: "Genre",
    type: "select",
    placeholder: "Select genre",
    required: true,
    options: bookGenres,
  },
  {
    name: "publicationDate",
    label: "Publication Date",
    type: "date",
    placeholder: "Select publication date",
    required: true,
  },
];

export interface IBookFormProps {
  idToken?: string;
  isEdit: boolean;
  onSubmit: (book: IBook, idToken: string) => void;
  defaultBookValues?: IBook;
}
