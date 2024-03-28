import React, { RefObject } from 'react';
import Image from 'next/image';

interface CryptoMenuProps {
  bitcoinRef: RefObject<HTMLDivElement>;
  ethereumRef: RefObject<HTMLDivElement>;
  litecoinRef: RefObject<HTMLDivElement>;
}

const CryptoMenu: React.FC<CryptoMenuProps> = ({ bitcoinRef, ethereumRef, litecoinRef }) => {
  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="crypto-menu">
      <div
        className="svg-drop-shadow cursor-pointer ml-10 mr-10 transition-transform duration-300 hover:scale-110"
        onClick={() => scrollToRef(bitcoinRef)}
      >
        <Image src="/logos/btc-logo.svg" alt="Bitcoin" width={70} height={70} />
      </div>
      <div
        className="svg-drop-shadow cursor-pointer transition-transform duration-300 hover:scale-110"
        onClick={() => scrollToRef(ethereumRef)}
      >
        <Image src="/logos/eth-logo.svg" alt="Ethereum" width={50} height={50} />
      </div>
      <div
        className="svg-drop-shadow cursor-pointer ml-10 mr-10 transition-transform duration-300 hover:scale-110"
        onClick={() => scrollToRef(litecoinRef)}
      >
        <Image src="/logos/ltc-logo.svg" alt="Litecoin" width={70} height={70} />
      </div>
    </div>
  );
};

export default CryptoMenu;
