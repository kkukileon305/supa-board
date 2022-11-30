import '../styles/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className='dark'>
      <head />
      <body>{children}</body>
    </html>
  );
}
