import Link from 'next/link';
import styles from './Amenities.module.css';

const amenities = [
  {
    id: 1,
    title: 'Приготовить на мангале',
    desc: 'Блюда с неповторимым ароматом дыма',
    bg: '#2d5a3d',
  },
  {
    id: 2,
    title: 'Прогулки',
    desc: 'По лесу, по бескрайним тропинкам',
    bg: '#1a3220',
  },
  {
    id: 3,
    title: 'Купель под открытым небом',
    desc: 'Расслабьтесь в купели под открытым небом',
    bg: '#3b6b4e',
  },
  {
    id: 4,
    title: 'Встретить золотой рассвет и закат',
    desc: 'Здесь время замирает ради красоты',
    bg: '#1a3220',
  },
  {
    id: 5,
    title: 'Насладиться единением',
    desc: 'Почувствовать друг друга и природу',
    bg: '#2d5a3d',
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
              style={{ background: item.bg }}
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
