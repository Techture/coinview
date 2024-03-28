import React, { useMemo } from 'react';
import Layout from '../components/Layout';
import CoinContainer from '../components/CoinContainer';
import CryptoMenu from '../components/CryptoMenu';
import WelcomeHero from '../components/WelcomeHero';
import VideoComponent from '../components/VideoHero';

const Home: React.FC = () => {
  // Using useMemo to ensure refs are constant across re-renders
  const refs = useMemo(
    () => ({
      bitcoinRef: React.createRef<HTMLDivElement>(),
      ethereumRef: React.createRef<HTMLDivElement>(),
      litecoinRef: React.createRef<HTMLDivElement>(),
    }),
    []
  );

  return (
    <Layout>
      <div className="fullpage-section relative flex justify-center items-center">
        <VideoComponent />
        <div className="welcome-hero z-10 flex flex-col justify-center items-center">
          <WelcomeHero />
          <CryptoMenu {...refs} />
        </div>
      </div>
      <CoinContainer {...refs} />
    </Layout>
  );
};

export default Home;
