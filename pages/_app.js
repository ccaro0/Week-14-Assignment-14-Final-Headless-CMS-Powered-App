import { Fraunces, Outfit } from 'next/font/google';
import '../styles/global.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['600', '700'],
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600'],
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${fraunces.variable} ${outfit.variable} appRoot`}>
      <Component {...pageProps} />
    </div>
  );
}
