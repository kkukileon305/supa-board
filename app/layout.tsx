import Header from '../components/Header';
import Provider from '../components/Provider';
import '../styles/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head />
      <body className='min-h-[100vh] dark:bg-gray-700'>
        <Provider>
          <Header />
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
