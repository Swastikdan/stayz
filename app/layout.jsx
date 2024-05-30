import './globals.css';
import { GeistSans } from 'geist/font/sans';
import { Toaster } from '@/components/ui/sonner';
import { UserProvider } from '@/providers/UserProvider';
import { LikeProvider } from '@/providers/LikeProvider';
import NavBar from '@/components/navbar/Navbar';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';

export async function metadata() {
  return {
    title: 'Urban Utopia | Holiday rentals, cabins, beach houses &amp; more',
    description:
      'Urban Utopia is a web application that helps users find the best home deals in their desired location. We offer a wide range of homes to choose from, with competitive prices and excellent customer service.',
    openGraph: {
      title: 'Urban Utopia | Holiday rentals, cabins, beach houses &amp; more',
      description:
        'Urban Utopia is a web application that helps users find the best home deals in their desired location. We offer a wide range of homes to choose from, with competitive prices and excellent customer service.',
      url: 'https://urbanutopia.vercel.app/',
      images: [
        {
          url: 'https://res.cloudinary.com/debewnh29/image/upload/w_1200,h_630,c_fill,g_auto/q_auto/f_auto/nestly/public/OGImage.webp',
          width: 1200,
          height: 630,
          alt: 'Urban Utopia | Holiday rentals, cabins, beach houses &amp; more',
        },
      ],
    },
  };
}
import SessionProvider from '../providers/SessionProvider';
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="en" />
        <meta name="author" content="....." />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta
          name="robots"
          content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <meta name="robots" content="noodp " />
        <meta name="apple-mobile-web-app-title" content="Urban Utopia" />
        <meta name="application-name" content="Urban Utopia" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#FFFFFF" />
        <link
          rel="manifest"
          href="/site.webmanifest"
          crossOrigin="use-credentials"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="57x57"
          href="https://res.cloudinary.com/debewnh29/image/upload/nestly/public/apple-touch-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="114x114"
          href="https://res.cloudinary.com/debewnh29/image/upload/nestly/public/apple-touch-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="72x72"
          href="https://res.cloudinary.com/debewnh29/image/upload/nestly/public/apple-touch-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="144x144"
          href="https://res.cloudinary.com/debewnh29/image/upload/nestly/public/apple-touch-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="60x60"
          href="https://res.cloudinary.com/debewnh29/image/upload/nestly/public/apple-touch-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="120x120"
          href="https://res.cloudinary.com/debewnh29/image/upload/nestly/public/apple-touch-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="76x76"
          href="https://res.cloudinary.com/debewnh29/image/upload/nestly/public/apple-touch-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="152x152"
          href="https://res.cloudinary.com/debewnh29/image/upload/nestly/public/apple-touch-icon-152x152.png"
        />
        <link
          rel="icon"
          type="image/png"
          href="https://res.cloudinary.com/debewnh29/image/upload/nestly/public/favicon-196x196.png"
          sizes="196x196"
        />
        <link
          rel="icon"
          type="image/png"
          href="https://res.cloudinary.com/debewnh29/image/upload/nestly/public/favicon-96x96.png"
          sizes="96x96"
        />
        <link
          rel="icon"
          type="image/png"
          href="https://res.cloudinary.com/debewnh29/image/upload/nestly/public/favicon-128.png"
          sizes="128x128"
        />
        <link rel="shortcut icon" href="https://res.cloudinary.com/debewnh29/image/upload/nestly/public/favicon.ico" type="image/x-icon" />
        <meta name="application-name" content="&nbsp;" />
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="msapplication-TileImage" content="https://res.cloudinary.com/debewnh29/image/upload/nestly/public/mstile-144x144.png" />
        <meta name="msapplication-square70x70logo" content="https://res.cloudinary.com/debewnh29/image/upload/nestly/public/mstile-70x70.png" />
        <meta
          name="msapplication-square150x150logo"
          content="https://res.cloudinary.com/debewnh29/image/upload/nestly/public/mstile-150x150.png"
        />
        <meta
          name="msapplication-wide310x150logo"
          content="https://res.cloudinary.com/debewnh29/image/upload/nestly/public/mstile-310x150.png"
        />
        <meta
          name="msapplication-square310x310logo"
          content="https://res.cloudinary.com/debewnh29/image/upload/nestly/public/mstile-310x310.png"
        />
      </>
      <head />
      <body
        className={`${GeistSans.className}  overflow-y-auto 
          scroll-smooth 
     `}
      >
        <SessionProvider>
          <UserProvider>
            <LikeProvider>
              <NavBar />
              <main className="mx-auto w-full ">
                {children}

                <div className="font-heading">
                  <Toaster theme={'light'} richColors position="top-center" />
                </div>
              </main>
              <BottomNav />
              <Footer />
            </LikeProvider>
          </UserProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
