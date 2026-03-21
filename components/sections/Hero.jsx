import styles from './Hero.module.css';
import Link from 'next/link';

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <p className={styles.subtitle}>45 км от Минска · лес · тишина</p>
        <h1 className={styles.title}>Зеркальные домики среди леса</h1>
        <p className={styles.types}>Домик для двоих · Барнхауз для компании</p>
        <p className={styles.desc}>Уникальный отдых среди природы</p>
        <Link href="#booking" className={styles.button}>
          Забронировать
        </Link>
      </div>
    </section>
  );
}
