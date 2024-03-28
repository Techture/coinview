import React, { ReactNode } from 'react';
import { useTheme } from '../../providers/ThemeProvider';
import Navbar from './Navbar';
import Footer from './Footer';

type Props = {
  children: ReactNode;
  title?: string;
};

const Layout: React.FC<Props> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div className={theme.type}>
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}

        <Navbar />

        {/* Main */}
        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <Footer />
        <style jsx global>{`
          html,
          body {
            background: ${theme.background};
            color: ${theme.fontColor};
            transition: color 0.15s ease-out 0s, background 0.15s ease-out 0s;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Layout;
