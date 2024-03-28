import React from 'react';
import { useTheme } from '../../providers/ThemeProvider';
import Link from 'next/link';

const Footer: React.FC = () => {
  const { theme } = useTheme();

  const footerClassName = `page-footer p-4 shadow-inner text-center ${
    theme.type === 'dark' ? 'bg-gray-800' : 'bg-white'
  }`;
  // const linkClassName = `text-gray-700 hover:text-gray-900 px-2 ${
  //   theme.type === 'dark' ? 'text-white hover:text-gray-300' : ''
  // }`;
  const copyrightClassName = `text-sm mt-1 mb-2 ${
    theme.type === 'dark' ? 'text-gray-400' : 'text-gray-600'
  }`;

  return (
    <footer className={footerClassName}>
      {/* <nav>
        <Link href="/" className={linkClassName}>
          Home
        </Link>
        <Link href="/about" className={linkClassName}>
          About
        </Link>
        <Link href="/contact" className={linkClassName}>
          Contact
        </Link>
      </nav> */}
      <p className={copyrightClassName}>
        &copy; {new Date().getFullYear()} CoinView. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
