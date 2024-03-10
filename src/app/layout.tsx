import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Leftbar } from "./components/Leftbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IdeaSpark",
  description: "IdeaSpark: Ignite your next big idea.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative min-h-screen md:flex">
          <Leftbar />
          <div className="flex-1 p-1 h-[100vh] overflow-scroll">{children}</div>
        </div>
      </body>
    </html>
  );
}
