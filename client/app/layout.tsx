import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import CanvasProvider from "./context/CanvasContext";

const inter = Nunito({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aakriti",
  description:
    "Aakriti is a web-based implementation of the classic party game Pictionary, reimagined to deliver a delightful and interactive drawing experience in a digital format. Our game strives to capture the essence of the beloved board game while incorporating modern features and enhanced accessibility for a diverse audience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CanvasProvider>{children}</CanvasProvider>
      </body>
    </html>
  );
}
