import type { Metadata } from 'next';
import './globals.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'My Weather App',
  description:
    'A user-friendly weather application with hourly forecast display, designed for all screen sizes.',
  keywords: 'weather app, hourly forecast, weather, weather forecast',
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='scroll-smooth' suppressHydrationWarning>
      <body>
        <ToastContainer />
        <div>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
