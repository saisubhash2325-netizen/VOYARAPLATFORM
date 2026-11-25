"use client";
import { useFormStatus } from "react-dom";
export default function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return <button disabled={pending} style={{ padding: "10px 18px" }}>{pending ? "Please wait…" : children}</button>;
}
