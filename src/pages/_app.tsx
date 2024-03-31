import ThemeProvider from '../../providers/ThemeProvider';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { LastUpdatedProvider } from '../../context/LastUpdatedContext';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <LastUpdatedProvider>
        <Component {...pageProps} />
      </LastUpdatedProvider>
    </ThemeProvider>
  );
};

export default MyApp;
