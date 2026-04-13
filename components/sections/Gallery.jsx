import { useState } from 'react';
import styles from './Gallery.module.css';

const photos = [
  { id: 1, src: '/images/gallery/1.jpg', alt: 'Photo 1' },
  { id: 2, src: '/images/gallery/2.jpg', alt: 'Photo 2' },
  { id: 3, src: '/images/gallery/3.jpg', alt: 'Photo 3' },
  { id: 4, src: '/images/gallery/4.jpg', alt: 'Photo 4' },
  { id: 5, src: '/images/gallery/5.jpg', alt: 'Photo 5' },
  { id: 6, src: '/images/gallery/6.jpg', alt: 'Photo 6' },
  { id: 7, src: '/images/gallery/7.jpg', alt: 'Photo 7' },
  { id: 8, src: '/images/gallery/8.jpg', alt: 'Photo 8' },
];

const VISIBLE = 3;

export default function Gallery() {
  const [start, setStart] = useState(0);

  const prev = () => setStart((s) => Math.max(0, s - 1));
  const next = () => setStart((s) => Math.min(photos.length - VISIBLE, s + 1));

  return (
    <section id="gallery" className={styles.section}>
      <div className={styles.container}>
        <p className={styles.label}>Галерея</p>
        <h2 className={styles.title}>Как это выглядит</h2>

        <div className={styles.sliderWrap}>
          <button
            className={styles.arrow}
            onClick={prev}
            disabled={start === 0}
          >
            &#8592;
          </button>

          <div className={styles.slider}>
            {photos.slice(start, start + VISIBLE).map((photo) => (
              <div
                key={photo.id}
                className={styles.photo}
                style={{
                  backgroundImage: `url(${photo.src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            ))}
          </div>

          <button
            className={styles.arrow}
            onClick={next}
            disabled={start >= photos.length - VISIBLE}
          >
            &#8594;
          </button>
        </div>

        <div className={styles.dots}>
          {photos.map((_, i) => (
            <span
              key={i}
              className={`${styles.dot} ${i >= start && i < start + VISIBLE ? styles.dotActive : ''}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
