import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  // Get the current location object
  const { pathname } = useLocation();

  // This effect will run every time the 'pathname' changes
  useEffect(() => {
    // Scroll the window to the top (0, 0)
    window.scrollTo(0, 0);
  }, [pathname]); // The dependency array ensures this runs on route change

  // This component doesn't render any visible UI
  return null;
}

export default ScrollToTop;