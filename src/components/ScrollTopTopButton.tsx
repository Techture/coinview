import { IoIosArrowDropupCircle } from 'react-icons/io';
import React from 'react';
import { useTheme } from '../../providers/ThemeProvider';

type ScrollToTopButtonProps = {
  showScrollToTop: boolean;
  scrollToTop: () => void;
};

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ showScrollToTop, scrollToTop }) => {
  const { theme } = useTheme();

  return (
    showScrollToTop && (
      <div className={`${theme.type} fixed bottom-2 right-2`}>
        <button onClick={scrollToTop} className="scroll-to-top-btn p-2 rounded-full">
          <IoIosArrowDropupCircle size={40} color="#F7931A" />
        </button>
      </div>
    )
  );
};

export default ScrollToTopButton;
