import type { Metadata } from "next";
import { BookPage } from "@/src/features/book/BookPage";
import { BOOK_PAGE_CONTENT } from "@/src/features/book/bookContent";

export const metadata: Metadata = {
  title: BOOK_PAGE_CONTENT.seo.title,
  description: BOOK_PAGE_CONTENT.seo.description,
};

export default function Book() {
  return <BookPage />;
}
