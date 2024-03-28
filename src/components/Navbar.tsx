import React, { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../../providers/ThemeProvider';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

// Define the theme structure expected from the useTheme hook
interface ThemeContext {
  theme: {
    type: string;
  };
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const Navbar: React.FC = () => {
  // Explicitly declare the theme object structure using the ThemeContext interface
  const { theme, toggleTheme, isDarkMode } = useTheme() as ThemeContext;
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);

    // Toggle the overflow style on body element
    if (!isMenuOpen) {
      // When the menu is being opened
      document.body.style.overflow = 'hidden';
    } else {
      // When the menu is being closed
      document.body.style.overflow = 'auto';
    }
  };

  const mobileMenuClass = isMenuOpen ? 'mobile-menu open' : 'mobile-menu';

  const navClassName = `absolute sm:relative sm:flex items-center gap-3 ${
    isMenuOpen ? 'flex' : 'hidden'
  } flex-col sm:flex-row top-full left-0 w-full sm:w-auto bg-gray-800 sm:bg-transparent `;

  const anchorClassName = `text-gray-700 hover:text-gray-900 px-2 py-2 sm:py-0 ${
    theme.type === 'dark' ? 'text-white' : ''
  }`;

  useEffect(() => {
    // Clean up the overflow style when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <header
      className={`flex items-center justify-between p-4  ${
        theme.type === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}
      style={{ borderBottom: '1px solid #34495E' }}
    >
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/logos/coinview_logo.png"
            alt="Logo"
            className="h-12 mr-4"
            width={50}
            height={50}
          />
        </Link>
      </div>
      <nav className={`${navClassName} ${mobileMenuClass}`}>
        {/* <Link href="/" className={anchorClassName}>
          Home
        </Link>
        <Link href="/about" className={anchorClassName}>
          About
        </Link>
        <Link href="/contact" className={anchorClassName}>
          Contact
        </Link> */}
        <ThemeToggle onChange={toggleTheme} isDarkMode={isDarkMode} />
      </nav>
      <button onClick={handleToggleMenu} className="sm:hidden">
        {isMenuOpen ? (
          <FontAwesomeIcon icon={faTimes} size="2xl" width={40} height={40} />
        ) : (
          <FontAwesomeIcon icon={faBars} size="2xl" width={40} height={40} />
        )}
      </button>
    </header>
  );
};

export default Navbar;
