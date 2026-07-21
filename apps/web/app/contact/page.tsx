import type { Metadata } from "next";
import { ContactPage } from "@/src/features/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact MYReSolve",
  description:
    "Contact Rob Pierce to discuss your company results, MYReSolve consultancy support or future platform access.",
};

export default function Contact() {
  return <ContactPage />;
}
