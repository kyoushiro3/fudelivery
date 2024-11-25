import { Inter } from "next/font/google";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const inter = Inter({ subsets: ["latin"], weight: "500" });

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={`${inter.className}min-h-screen`}>
      {children}
    </div>
  );
}
