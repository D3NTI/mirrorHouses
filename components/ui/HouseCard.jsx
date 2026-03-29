import Image from 'next/image';
import Link from 'next/link';
import { FaFire, FaWater, FaLeaf } from 'react-icons/fa';
import { MdOutdoorGrill } from 'react-icons/md';
import { IoPeopleOutline } from 'react-icons/io5';
import styles from './HouseCard.module.css';

export default function HouseCard({ image, type, name, desc, guests, price }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrap}>
        <Image
          src={image}
          alt={name}
          fill
          className={styles.image}
          style={{ objectFit: 'cover' }}
        />
        <span className={styles.type}>{type}</span>
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.desc}>{desc}</p>
        <div className={styles.amenities}>
          <span>
            <FaFire size={14} /> Баня
          </span>
          <span>
            <FaWater size={14} /> Купель
          </span>
          <span>
            <MdOutdoorGrill size={14} /> Барбекю
          </span>
          <span>
            <FaLeaf size={14} /> Лес
          </span>
        </div>
        <div className={styles.footer}>
          <div className={styles.info}>
            <span className={styles.guests}>
              <IoPeopleOutline size={15} /> до {guests} чел.
            </span>
            <span className={styles.price}>от {price} BYN</span>
          </div>
          <Link href="#booking" className={styles.btn}>
            Забронировать
          </Link>
        </div>
      </div>
    </div>
  );
}
