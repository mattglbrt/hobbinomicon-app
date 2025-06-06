import '../styles/globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'Hobbinomicon',
  description: 'Track your hobby progress',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full bg-gray-100">
      <body className="h-full">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}