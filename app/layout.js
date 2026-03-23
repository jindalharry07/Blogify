import { Playfair_Display, Montserrat, Geist_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Blogify | Premium Editorial Blog",
  description: "Experience stories in a high-end editorial format.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${montserrat.variable} ${geistMono.variable} antialiased selection:bg-gray-100 selection:text-black`}
      >
        {children}
      </body>
    </html>
  );
}
