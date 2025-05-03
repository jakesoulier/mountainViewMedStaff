'use client'
import { useState, useEffect } from 'react';
import Breadcrumb from "./breadcrumb";

function Header({ title, path, gradientColor, cmePath }) {
  const [logoSrc, setLogoSrc] = useState('/mntviewLogo5.png');
  const [ifchLogoSrc, setIfchLogoSrc] = useState('/ifchLogo5.png');

  const isCMEHome = path === '/cme'; // Check if path is cme homepage
  const isCMEPath = cmePath === 'cme'; // Check if path is '/cme'

  useEffect(() => {
    const updateLogoSrc = () => {
      if (window.matchMedia('(max-width: 1000px)').matches) {
        setLogoSrc('/mntviewLogo-sm.png'); // Change to your small screen logo
        setIfchLogoSrc('/ifchLogo-sm.png'); // Change to your small screen logo
      } else {
        setLogoSrc('/mntviewLogo5.png');
        setIfchLogoSrc('/ifchLogo5.png');
      }
    };

    updateLogoSrc(); // Initial check
    window.addEventListener('resize', updateLogoSrc); // Add event listener

    return () => {
      window.removeEventListener('resize', updateLogoSrc); // Cleanup event listener
    };
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between pb-1" style={{ backgroundImage: `linear-gradient(to right, #376452 30%, ${gradientColor} 70%)` }}>
        <div>
          <img src={logoSrc} alt="Mountain View Logo" onClick={() => window.open('https://www.mountainviewhospital.org/', '_blank', 'noopener,noreferrer')} style={{ cursor: 'pointer' }} />
          
        </div>
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-white text-2xl text-center">{title}</h1>
        {!isCMEHome && (
          <img src={ifchLogoSrc} alt="IFCH Logo" onClick={() => window.open('https://www.idahofallscommunityhospital.com/', '_blank', 'noopener,noreferrer')} style={{ cursor: 'pointer' }} />
        )}
      </div>
      <Breadcrumb path={path} cmePath={isCMEPath} /> {/* Pass path prop */}
    </div>
  );
}

export default Header;