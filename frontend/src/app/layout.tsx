import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import '@/styles/globals.css';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: 'Quickmart - Online Supermarket',
  description: 'Modern e-commerce platform for supermarket shopping',
  openGraph: {
    title: 'Quickmart',
    description: 'Shop online at Quickmart for fresh groceries and essentials',
    url: 'https://quickmart.com',
    siteName: 'Quickmart',
    images: [{
      url: 'https://quickmart.com/og-image.jpg',
      width: 1200,
      height: 630,
    }],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Quickmart - Modern e-commerce supermarket platform" />
        <meta name="keywords" content="supermarket, grocery, online shopping, delivery" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Provider store={store}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Provider>
      </body>
    </html>
  );
}
