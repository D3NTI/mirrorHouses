import Link from 'next/link';
import { FaInstagram, FaTelegram, FaWhatsapp } from 'react-icons/fa';
import { MdPhone, MdEmail, MdLocationOn } from 'react-icons/md';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <span className={styles.brandName}>HVOYA</span>
          <p className={styles.brandDesc}>Зеркальные домики среди леса</p>
        </div>

        <div className={styles.nav}>
          <span className={styles.colTitle}>Навигация</span>
          <Link href="#houses">Домики</Link>
          <Link href="#amenities">Удобства</Link>
          <Link href="#gallery">Галерея</Link>
          <Link href="#booking">Забронировать</Link>
        </div>

        <div className={styles.contacts}>
          <span className={styles.colTitle}>Контакты</span>
          <a href="tel:+79991234567">
            <MdPhone size={16} />
            +7 999 123 45 67
          </a>
          <a href="mailto:info@hvoya.ru">
            <MdEmail size={16} />
            info@hvoya.ru
          </a>
          <a href="#">
            <MdLocationOn size={16} />
            Минская область
          </a>
        </div>

        <div className={styles.socials}>
          <span className={styles.colTitle}>Соцсети</span>
          <div className={styles.socialsRow}>
            <a
              href="https://www.instagram.com/hvoya.mirror.house?igsh=bXVxbDc5c2xhMWhv"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram size={22} />
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              <FaTelegram size={22} />
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              <FaWhatsapp size={22} />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© 2025 HVOYA. Все права защищены.</span>
      </div>
    </footer>
  );
}
