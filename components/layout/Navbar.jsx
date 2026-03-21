import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav id="nav" className={styles.navbar}>
      <div className={styles.navcont}>
        <div className={styles.brand}>
          <Image src="/logo.png" alt="Mirror Houses" width={60} height={70} />
          <span className={styles.brandName}>HVOYA</span>
        </div>

        <div className={styles.navlinks}>
          <Link href="#houses">Домики</Link>
          <Link href="#amenities">Удобства</Link>
          <Link href="#gallery">Галерея</Link>
          <Link href="#booking">Забронировать</Link>
        </div>

        <button
          className={styles.burger}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Меню"
        >
          <span
            className={`${styles.line} ${isOpen ? styles.line1open : ''}`}
          />
          <span
            className={`${styles.line} ${isOpen ? styles.line2open : ''}`}
          />
          <span
            className={`${styles.line} ${isOpen ? styles.line3open : ''}`}
          />
        </button>
      </div>

      {isOpen && (
        <div className={styles.mobileMenu}>
          <Link href="#houses" onClick={closeMenu}>
            Домики
          </Link>
          <Link href="#amenities" onClick={closeMenu}>
            Удобства
          </Link>
          <Link href="#gallery" onClick={closeMenu}>
            Галерея
          </Link>
          <Link href="#booking" onClick={closeMenu}>
            Забронировать
          </Link>
        </div>
      )}
    </nav>
  );
}
