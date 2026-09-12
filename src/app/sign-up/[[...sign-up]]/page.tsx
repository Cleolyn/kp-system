import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { Scale } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8f9fa] p-4 selection:bg-[#0064e0] selection:text-white">
      {/* Brand Header */}
      <Link href="/" className="flex items-center gap-3 mb-8 group transition-opacity hover:opacity-90">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0064e0] text-white shadow-xs">
          <Scale className="h-6 w-6" />
        </div>
        <div>
          <span className="text-xl font-extrabold tracking-tight text-[#0a1317]">
            KP SYSTEM
          </span>
          <span className="text-xs font-bold text-[#657786] block -mt-1 tracking-wider uppercase">
            Katarungang Pambarangay
          </span>
        </div>
      </Link>

      <div className="w-full max-w-md flex justify-center">
        <SignUp />
      </div>

      <p className="mt-8 text-center text-xs text-[#8899a6]">
        Republic Act No. 7160 • Katarungang Pambarangay Management System
      </p>
    </div>
  );
}
