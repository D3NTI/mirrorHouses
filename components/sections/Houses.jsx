import HouseCard from '../ui/HouseCard';
import styles from './Houses.module.css';

const houses = [
  {
    id: 1,
    image: '/images/birtch.jpg',
    type: 'Зеркальный дом',
    name: 'Берёзовый',
    desc: 'Компактный дом со спальней, кухней и ванной. Вокруг — берёзовый лес, уют и тишина.',
    guests: 2,
    price: 330,
  },
  {
    id: 2,
    image: '/images/elldomik.jpg',
    type: 'Зеркальный дом',
    name: 'Еловый',
    desc: 'Зеркальный дом среди елей. Полное погружение в лес, камерная атмосфера и покой.',
    guests: 2,
    price: 330,
  },
  {
    id: 3,
    image: '/images/barn.jpg',
    type: 'Вместительный дом',
    name: 'Барнхауз',
    desc: 'Просторный дом для большой компании. Открытая терраса, большая гостиная, незабываемые вечера.',
    guests: 8,
    price: 330,
  },
];

export default function Houses() {
  return (
    <section id="houses" className={styles.section}>
      <div className={styles.container}>
        <p className={styles.label}>Наши домики</p>
        <h2 className={styles.title}>Выберите свой формат отдыха</h2>
        <p className={styles.desc}>
          Три варианта — для романтического уединения и для тёплой компании
        </p>
        <div className={styles.grid}>
          {houses.map((house) => (
            <HouseCard key={house.id} {...house} />
          ))}
        </div>
      </div>
    </section>
  );
}
