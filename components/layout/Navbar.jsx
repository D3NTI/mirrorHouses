import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';

export default function NavBar() {
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
      </div>
    </nav>
  );
}
