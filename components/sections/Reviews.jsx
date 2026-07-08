import Image from 'next/image';
import styles from './Reviews.module.css';

const reviews = [
  {
    id: 1,
    name: 'Анна и Дмитрий',
    date: 'Март 2025',
    text: 'Провели здесь два дня и забыли про всё. Тишина, лес, утром олень прошёл прямо под окном. Баня топилась два часа — это было незабываемо. Обязательно вернёмся.',
    image: '/images/reviews/1.png',
    house: 'Берёзовый',
  },
  {
    id: 2,
    name: 'Максим',
    date: 'Февраль 2025',
    text: 'Приехали компанией на выходные в Барнхауз. Места хватило всем, купель работала отлично даже в мороз. Хозяева очень внимательные — всё подготовлено заранее.',
    image: '/images/reviews/1.png',
    house: 'Барнхауз',
  },
  {
    id: 3,
    name: 'Катя',
    date: 'Январь 2025',
    text: 'Подарила мужу на день рождения ночь в Еловом домике. Он был в восторге. Зеркальные стены, лес вокруг, звёздное небо — это просто магия. Спасибо за такое место.',
    image: '/images/reviews/1.png',
    house: 'Еловый',
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className={styles.section}>
      <div className={styles.container}>
        <p className={styles.label}>Отзывы</p>
        <h2 className={styles.title}>Что говорят гости</h2>
        <div className={styles.grid}>
          {reviews.map((review) => (
            <div key={review.id} className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.avatar}>
                  <Image
                    src={review.image}
                    alt={review.name}
                    width={48}
                    height={48}
                    className={styles.avatarImg}
                  />
                </div>
                <div>
                  <p className={styles.name}>{review.name}</p>
                  <p className={styles.meta}>
                    {review.house} · {review.date}
                  </p>
                </div>
              </div>
              <p className={styles.text}>{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
