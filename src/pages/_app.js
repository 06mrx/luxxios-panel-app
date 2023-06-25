import '../styles/globals.css'
import "nprogress/nprogress.css";
import dynamic from 'next/dynamic';
import { RouterGuard } from '../components/RouteGuard';
const TopProgressBar = dynamic(
  () => {
    return import("../components/TopProgressBar");
  },
  { ssr: false },
);

function MyApp({ Component, pageProps, session }) {
  return <> 
    <TopProgressBar />
    <RouterGuard>
      <Component {...pageProps} />
    </RouterGuard>
    
    
  </> 
}

export default MyApp
