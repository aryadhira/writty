import {Source_Sans_3} from 'next/font/google';
import "./globals.css";

const sourceSans = Source_Sans_3({
  family: 'Source+Sans+3',
  subsets: ["latin"],
  weight:["200","300","400","700","900"]
})

export const metadata = {
  title: "Writty | Content Writing Assistant",
  description: "Content Writing Assistant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={sourceSans.className}>
        {children}
      </body>
    </html>
  );
}
