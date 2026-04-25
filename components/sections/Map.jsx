import styles from './Map.module.css';

export default function Map() {
  return (
    <section id="map" className={styles.section}>
      <div className={styles.container}>
        <p className={styles.label}>Как добраться</p>
        <h2 className={styles.title}>Мы находимся здесь</h2>
        <p className={styles.desc}>
          Беларусь, Минская область, д. Хочин, ул. Лесная 15 · 45 минут от
          Минска
        </p>
      </div>
      <div className={styles.mapWrap}>
        <iframe
          src="https://yandex.ru/map-widget/v1/?ll=28.141900,53.644422&z=15&pt=28.141900,53.644422,pm2rdm"
          width="100%"
          height="500"
          frameBorder="0"
          allowFullScreen
          className={styles.map}
        />
      </div>
      <div className={styles.container}>
        <div className={styles.info}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Адрес</span>
            <span className={styles.infoValue}>д. Хочин, ул. Лесная 15</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Расстояние от Минска</span>
            <span className={styles.infoValue}>45 км · ~45 минут</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Заезд / Выезд</span>
            <span className={styles.infoValue}>14:00 / 12:00</span>
          </div>
        </div>
      </div>
    </section>
  );
}
