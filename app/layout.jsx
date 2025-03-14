import "./globals.css";
import { Alata } from 'next/font/google'

export const metadata = {
  title: "Page",
  description: "Created by Paranthaman",
};

const alata = Alata({
  weight: "400",
  subsets: ['latin']
})


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <script src="node_modules/argon2-browser/dist/argon2-bundled.js"></script>
      <script src="node_modules/argon2-browser/lib/argon2.js"></script>
      </head>
      <body className={`antialiased ${alata.className}`}>
        {children}
      </body>
    </html>
  );
}