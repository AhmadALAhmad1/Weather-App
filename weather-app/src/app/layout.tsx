import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className='scroll-pt-24 scroll-smooth'
      suppressHydrationWarning
    >
      <body>
          <div className='flex min-h-screen'>
            <main>{children}</main>
          </div>
      </body>
    </html>
  );
}
