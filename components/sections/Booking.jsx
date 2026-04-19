import BookingForm from '../ui/BookingForm';
import styles from './Booking.module.css';

export default function Booking() {
  return (
    <section id="booking" className={styles.section}>
      <div className={styles.container}>
        <p className={styles.label}>Бронирование</p>
        <h2 className={styles.title}>Забронировать домик</h2>
        <p className={styles.desc}>
          Выберите даты и домик — мы свяжемся с вами для подтверждения
        </p>
        <BookingForm />
      </div>
    </section>
  );
}
