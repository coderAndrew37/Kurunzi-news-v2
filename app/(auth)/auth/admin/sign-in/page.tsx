import { Metadata } from "next";
import LoginForm from "../../_components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Access the admin dashboard",
};

export default function AdminLoginPage() {
  return <LoginForm userType="admin" />;
}
