import { Metadata } from "next";
import LoginForm from "../../_components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Writer Login",
  description: "Access the writer dashboard",
};

export default function WriterLoginPage() {
  return <LoginForm userType="writer" />;
}
