import Link from 'next/link';
import styles from './Amenities.module.css';

const amenities = [
  {
    id: 1,
    title: 'Приготовить на мангале',
    desc: 'Блюда с неповторимым ароматом дыма',
    image: '/images/amenities/mangal.png',
  },
  {
    id: 2,
    title: 'Прогулки',
    desc: 'По лесу, по бескрайним тропинкам',
    image: '/images/amenities/gul.png',
  },
  {
    id: 3,
    title: 'Купель под открытым небом',
    desc: 'Расслабьтесь в купели под открытым небом',
    image: '/images/amenities/kupel.png',
  },
  {
    id: 4,
    title: 'Встретить золотой рассвет и закат',
    desc: 'Здесь время замирает ради красоты',
    image: '/images/amenities/sunset.png',
  },
  {
    id: 5,
    title: 'Насладиться единением',
    desc: 'Почувствовать друг друга и природу',
    image: '/images/amenities/forest.png',
  },
];

export default function Amenities() {
  return (
    <section id="amenities" className={styles.section}>
      <div className={styles.container}>
        <p className={styles.label}>Чем заняться</p>
        <h2 className={styles.title}>Чем заняться?</h2>
        <p className={styles.desc}>
          Всего 45 минут от Минска — и вы в мире, где время замедляется
        </p>
        <div className={styles.grid}>
          {amenities.map((item) => (
            <div
              key={item.id}
              className={styles.card}
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className={styles.overlay} />
              <div className={styles.content}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.desc}</p>
                <Link href="#booking" className={styles.btn}>
                  Забронировать
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
