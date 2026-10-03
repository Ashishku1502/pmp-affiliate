import './globals.css';
import AppProvider from '@/components/AppProvider';
import Nav from '@/components/Nav';

export const metadata = { title: 'PMP Affiliate Partner Program' };
export const viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' };

export default function RootLayout({ children }) {
  return (
    <html lang="hi-Latn">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Source+Serif+4:wght@600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AppProvider>
          <Nav />
          <main>{children}</main>
          <footer><b style={{ color: '#fff', fontFamily: "'Source Serif 4',serif", fontSize: '1.2rem' }}>PMP Consultancy</b><br />Political Strategy • Management • Technology</footer>
        </AppProvider>
      </body>
    </html>
  );
}
