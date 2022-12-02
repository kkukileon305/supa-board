import { Noto_Sans_KR } from '@next/font/google';
import Footer from '../components/Footer';
import Provider from '../components/Provider';
import '../styles/globals.css';

const notosans = Noto_Sans_KR({
  weight: ['300', '700'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={notosans.className}>
      <head />
      <body className='min-h-[100vh] dark:bg-gray-700'>
        <Provider>
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
