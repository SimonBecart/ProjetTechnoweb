import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
import './globals.css';
import { ReactElement, ReactNode } from 'react';
import NavBar from './components/navBar';
import BasicBreadcrumbs from './components/breadcrumb/breadcrumb';

// const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Library',
  description: 'Book management system',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return (
    <html lang="en">
      <body className="bg-slate-100">
        <NavBar />
        <BasicBreadcrumbs
          homeElement="Home"
          separator={<span> &gt; </span>}
          activeClasses="text-amber-500"
          listClasses="hover:underline mx-2 font-bold"
          capitalizeLinks
        />
        {children}
      </body>
    </html>
  );
}
