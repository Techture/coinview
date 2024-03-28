import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const animateTextOnHover = (element: HTMLElement) => {
  gsap.to(element, { color: '#F7931A', ease: 'power1.out', duration: 0.1 });
};

const revertTextOnHoverOut = (element: HTMLElement) => {
  gsap.to(element, { color: '', ease: 'power1.out', duration: 0.1 });
};

const animateWordsOnLoad = (wordsContainer: HTMLDivElement) => {
  gsap.fromTo(
    wordsContainer.children,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, stagger: 0.1, ease: 'power1.out' }
  );
};

const WelcomeHero: React.FC = () => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth > 768 && textRef.current) {
      const words = textRef.current.textContent?.split(' ') || [];
      textRef.current.textContent = '';
      words.forEach((word) => {
        let span = document.createElement('span');
        span.textContent = word + ' ';
        if (textRef.current) {
          textRef.current.appendChild(span);
        }

        span.style.transition = 'transform 0.1s, opacity 0.1s';
        span.addEventListener('mouseenter', () => animateTextOnHover(span));
        span.addEventListener('mouseleave', () => revertTextOnHoverOut(span));
      });

      animateWordsOnLoad(textRef.current);
    }
  }, []);

  return (
    <div className="welcome-text-container md:w-1/2 text-center">
      <h1 className="welcome-header">Welcome to CoinView</h1>
      <p ref={textRef} className="welcome-subheader pt-0 pb-0 mb-5">
        Explore the pulse of the crypto market and gain valuable insights on the leading
        cryptocurrencies. View our CryptoMenu to uncover key metrics and more, on Bitcoin (BTC),
        Ethereum (ETH), and Litecoin (LTC). Stay informed, stay ahead.
      </p>
    </div>
  );
};

export default WelcomeHero;
