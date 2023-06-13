import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import LanguageSelector from '../language/LanguageSelector';

const HamburgerMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuItemClick = (route: string) => {
    router.push(route);
    setMenuOpen(false);
  };

  const handleChangeLanguage = () => {
    setMenuOpen(false);
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);


  return (
    <div className={`hamburger-menu ${menuOpen ? 'open' : ''}`} ref={menuRef}>
        <input
            type="checkbox"
            id="menu-toggle"
            checked={menuOpen}
            onChange={handleMenuToggle}
        />
        <label htmlFor="menu-toggle" className="menu-icon">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
        </label>
        <ul className="menu">
            <li><div onClick={() => handleMenuItemClick("/")}>Home</div></li>
            <li><div onClick={() => handleMenuItemClick("/about-aurora")}>About Aurora</div></li>
            <li><div onClick={() => handleMenuItemClick("/colombia-regions")}>Colombia Regions</div></li>
            <li onClick={() => handleChangeLanguage()}><LanguageSelector /></li>
        </ul>
    </div>
  );
};

export default HamburgerMenu;